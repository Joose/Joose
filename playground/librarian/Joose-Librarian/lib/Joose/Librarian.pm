package Joose::Librarian;

#use warnings;
#use strict;

our $VERSION = '0.01';


use Moose;
use Path::Class;

use Joose::Librarian::Book;

__PACKAGE__->meta()->make_immutable();

no Moose;


my $BOOKS = {};


sub get_book {
	my ($self, $name) = @_;
	
	return $BOOKS->{$name} if $BOOKS->{$name};
	
	$BOOKS->{$name} = Joose::Librarian::Book->new(name => $name);
	
	return $BOOKS->{$name};
}


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
