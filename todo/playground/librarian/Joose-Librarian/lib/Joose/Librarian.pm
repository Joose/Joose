package Joose::Librarian;

#use warnings;
#use strict;

our $VERSION = '0.01';


use Moose;
use Path::Class;
use JavaScript::Beautifier qw/js_beautify/;
use Digest::MD5 qw(md5_hex);
use Algorithm::Dependency::Ordered;
use Algorithm::Dependency::Source::HoA;
use Data::Dump qw(dump dd ddx);


use Joose::Librarian::Book;

__PACKAGE__->meta()->make_immutable();

no Moose;


my $BOOKS = {};


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub get_book {
	my ($self, $name) = @_;
	
	my $external = 0;
	if (ref $name eq 'HASH') {
		$external = 1 if $name->{external};
		$name = $name->{Module};
	}
	
    if ($name =~ m!^ext://(.*)!) {
       $external = 1;
       $name = $1;
    }
	
	return $BOOKS->{$name} if $BOOKS->{$name};
	
	$BOOKS->{$name} = Joose::Librarian::Book->new(name => $name, external => $external);
	
	return $BOOKS->{$name};
}


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub install_book {
    my ($self, $book) = @_;
    
    my $install_dir = dir($ENV{JOOSE_LIB});
    
    my @file_name = split(m!\.!, $book->name);
    $file_name[-1] .= '.js';
    
    my $install_file = file(@file_name)->absolute($install_dir);
    
    $install_file->dir->mkpath();
    
    my $fh = $install_file->openw();
    print $fh js_beautify($book->source);
    $fh->close();
}


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub create_bundle {
    my ($self, $deps_array, $md5hash, $persistent) = @_;
    
    return if !defined $deps_array;
    
    my @bundle = ();
    
    $deps_array = [ $deps_array ] unless ref $deps_array eq 'ARRAY';
        
    foreach my $dep (@{$deps_array}) {
        next if ref $dep eq 'HASH' && $dep->{url};
        
        $dep = { Module => $dep } unless ref $dep eq 'HASH';
            
        my $module_name = ($dep->{external} ? 'ext://' : '') . $dep->{Module} . ($dep->{version} ? '-' . $dep->{version} : '');
        push @bundle, $module_name;
    }
    
    @bundle = sort(@bundle);
    
    my $new_hash = md5_hex(join(",", @bundle));
    die "Passed md5 hash [$md5hash] doesnt match with computed [$new_hash]" if $md5hash && ($new_hash ne $md5hash);
    
    my $lib_dir = dir($ENV{JOOSE_LIB});
    my $bundle_dir = dir($ENV{JOOSE_BUNDLE});
    
    my $bundle_file = file($new_hash . ".js")->absolute($bundle_dir);
    
    
    my $schedule = $self->get_schedule($deps_array);
    
    my $fh = $bundle_file->openw();
    
    foreach my $dep (@$schedule) {
       my @file_name = split(m!\.!, $dep);
       $file_name[-1] .= '.js';
       
       my $lib_file = file(@file_name)->absolute($lib_dir);
       my $lib_source;
       
       if (!-e $lib_file) {
           my $book = Joose::Librarian->get_book( $dep );
           $book->update_direct_dependencies();
           
           if ($persistent) {
               Joose::Librarian->install_book($book);
               $lib_source = $lib_file->slurp;
           } else {
               $lib_source = $book->source;
           }
       } else {
           $lib_source = $lib_file->slurp;
       }
        
        print $fh js_beautify($lib_source) . "\n";
    }
    
    $fh->close();
    
    return $bundle_file->slurp();
}


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub get_schedule {
	my ($self, $deps_array) = @_;
	
	my @bundle = ();
	my $DEPS = {};
	
    foreach my $dep (@{$deps_array}) {
        next if ref $dep eq 'HASH' && $dep->{url};
            
	    my $book = Joose::Librarian->get_book( $dep );
	    $book->extract_all_dependencies();
	    
	    my $book_deps = [];
	    foreach my $module_name (keys(%{$book->all_dependencies})) {
	        push @$book_deps, $module_name;
	    }
	    
	    $DEPS->{$book->name} = $book_deps;
	    push @bundle, $book->name;
    }
    
    my $source = Algorithm::Dependency::Source::HoA->new( $DEPS );
    
    my $alg = Algorithm::Dependency::Ordered->new(
        source   => $source,
        ignore_orphans => 1
    );
    
    return $alg->schedule(@bundle);
}


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub resolve_name {
	my ($self, $name) = @_;
	
	my @file_name = split(m!\.!, $name);
	$file_name[-1] = $file_name[-1] . '.js';
	$name = file(@file_name);
	
	my @INC = split(/;/, $ENV{JOOSE_INC});
	
	foreach my $inc (@INC) {
		my $book_file = $name->absolute( dir($inc) );
		if (-e $book_file) { return $book_file }
	}
	
	return undef;
}

1;
