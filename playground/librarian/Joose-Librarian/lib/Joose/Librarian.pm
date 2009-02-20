package Joose::Librarian;

#use warnings;
#use strict;

our $VERSION = '0.01';


use Moose;
use Path::Class;
use JavaScript::Beautifier qw/js_beautify/;
use Digest::MD5 qw(md5_hex);

use Joose::Librarian::Book;

__PACKAGE__->meta()->make_immutable();

no Moose;


my $BOOKS = {};


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub get_book {
	my ($self, $name) = @_;
	
	return $BOOKS->{$name} if $BOOKS->{$name};
	
	$BOOKS->{$name} = Joose::Librarian::Book->new(name => $name);
	
	return $BOOKS->{$name};
}


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub install_book {
    my ($self, $book) = @_;
    
    my $install_dir = dir($ENV{JOOSE_LIB});
    
    my @file_name = split(m!\.!, $book->name);
    $file_name[-1] = $file_name[-1] . '.js';
    
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
        next if $dep->{url};
        
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
    
    my $fh = $bundle_file->openw();
    
    foreach my $dep (@{$deps_array}) {
        next if $dep->{url};
            
	    my @file_name = split(m!\.!, $dep->{Module});
	    $file_name[-1] = $file_name[-1] . '.js';
	    
	    my $lib_file = file(@file_name)->absolute($lib_dir);
	    if ($persistent && !-e $lib_file) {
	    	my $book = Joose::Librarian->get_book( ($dep->{external} ? 'ext://' : '') . $dep->{Module} );
	    	$book->update_direct_dependencies();
	    	Joose::Librarian->install_book($book);
	    }        
        
        print $fh js_beautify("" . file($lib_file)->slurp) . "\n";
    }
    
    $fh->close();
    
    return $bundle_file->slurp();
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
