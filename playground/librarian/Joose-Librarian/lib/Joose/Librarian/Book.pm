package Joose::Librarian::Book;

use warnings;
use strict;

our $VERSION = '0.01';

use Moose;
use Path::Class;
use JavaScript;
use Moose::Util::TypeConstraints;
use JavaScript::Minifier::XS;
use JSON::XS;


#================================================================================================================================================================================================================================================
has 'name' => ( 
    is => 'ro',
    required => 1 
);

has 'version' => ( is => 'rw' );

has 'file_name' => ( 
    is => 'rw',
    trigger => sub { shift->source(JavaScript::Minifier::XS::minify("" . file(shift)->slurp)) }
);

has 'source' => ( is => 'rw' );



#================================================================================================================================================================================================================================================
subtype 'Joose.Librarian.Book.Dependencies' 
    => as 'HashRef[HashRef]';
    
coerce 'Joose.Librarian.Book.Dependencies' 
    => from 'Any'
    => via {
	    my ($deps_array) = @_;
	    $deps_array = [ $deps_array ] unless ref $deps_array eq 'ARRAY';
	    
	    my $deps_hash = {};
	    
	    foreach my $dep (@{$deps_array}) {
	    	next if !defined $dep;
	    	
	        $dep = { Module => $dep } unless ref $dep eq 'HASH';
	        
	        next if $dep->{url};
	        
	        my $module_name = $dep->{Module};
	        $deps_hash->{$module_name} = $dep;
	    }
	    
	    return $deps_hash;
	};
    
has 'direct_dependencies' => (
    is => 'rw',
    isa => 'Joose.Librarian.Book.Dependencies',
    coerce => 1
);

has 'direct_dep_source' => (
    is => 'rw'
);


has 'all_dependencies' => (
    is => 'rw',
    isa => 'Joose.Librarian.Book.Dependencies',
    predicate => 'has_all_dependencies',
    trigger => sub {
    	my ($self, $hash_deps) = @_;
    	
    	my $array_deps = [];
    	foreach my $module_name (keys(%$hash_deps)) {
    		push @$array_deps, $hash_deps->{$module_name};
    	};
    	 
        $self->all_dep_source(
            JavaScript::Minifier::XS::minify(encode_json($array_deps))
        ) 
    }
);

has 'all_dep_source' => (
    is => 'rw'
);

#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub BUILD {
    my $self = shift;
    
    my $file_name = Joose::Librarian->resolve_name($self->name);
    die "Cant find file for " . $self->name unless $file_name;
    
    $self->file_name($file_name); 
}


my $enviroment_start = <<EOF
    var __name__, __props__;
    Class = Module = function (name, props) {
    	__name__ = name;
    	__props__ = props || {};
    };
    
EOF
;
my $enviroment_end = <<EOF
    
    __JOOSE_LIBRARIAN__EXTRACT__(__name__, __props__.use, __props__.use && __props__.use.toSource(), __props__.version);
EOF
;


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub extract_direct_dependencies {
	my $self = shift;
	
	my $rt = JavaScript::Runtime->new();
	my $cx = $rt->create_context();
	

	my ($name, $deps, $deps_source, $version);
	
	$cx->bind_function('__JOOSE_LIBRARIAN__EXTRACT__' => sub { ($name, $deps, $deps_source, $version) = @_ });
	
	$cx->eval($enviroment_start . $self->source . $enviroment_end);
	die "Class definition contain errors: $@" if $@;
	die "Extracted name [$name] doesnt match the name of this instance: " . $self->name unless $name eq $self->name;
	
	$self->version($version);
	$self->direct_dependencies($deps);
	$self->direct_dep_source(JavaScript::Minifier::XS::minify($deps_source || ""));
}


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub extract_all_dependencies {
    my $self = shift;
    
    return if $self->has_all_dependencies;
    
    if (!$self->direct_dependencies) {
    	$self->extract_direct_dependencies();
    }
    
    my $all = { %{$self->direct_dependencies} };
    
    foreach my $module_name (keys(%$all)) {
    	my $book = Joose::Librarian->get_book($module_name);
    	
    	$book->extract_all_dependencies();
    	
    	$self->accumulate_to($all, $book->all_dependencies)
    }
    $self->all_dependencies($all);
}


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub accumulate_to {
    my ($self, $destination, $deps) = @_;
    
    foreach my $module_name (keys(%$deps)) {
    	my $from_deps = $deps->{$module_name};
    	
    	if (!defined $destination->{$module_name}) {
            $destination->{$module_name} = $from_deps;
            next;
        } 
    	
    	my $from_dest = $destination->{$module_name};
    	
    	if ($from_dest->{version} && $from_deps->{version} && $from_dest->{version} < $from_deps->{version}) {
    		$destination->{$module_name} = $from_deps;
    	} elsif (!$from_dest->{version} && $from_deps->{version}) {
            $destination->{$module_name} = $from_deps;
        }
    }
    
}


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub update_direct_dependencies {
    my ($self) = @_;
    
    $self->extract_all_dependencies();
    
    my $source = $self->source || "";
    
    return if !$self->direct_dep_source;
    
    my $direct_source = $self->direct_dep_source;
    $direct_source =~ s/"/'/g;
    $direct_source = quotemeta $direct_source;
    
    my $all_source = $self->all_dep_source;
    $all_source =~ s/"/'/g;

    $source =~ s/$direct_source/$all_source/s;
    
    $self->source($source);
}


1;
