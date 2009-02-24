package Joose::Librarian::Book;

use warnings;
use strict;

our $VERSION = '0.01';

use Moose;
use Joose::Librarian;
use JavaScript;

has 'name' => ( 
    is => 'ro',
    required => 1 
);

has 'version' => ( is => 'rw' );

has 'file_name' => ( 
    is => 'rw',
    trigger => sub { shift->source(file(shift)->slurp) }
);


has 'source' => ( is => 'rw' );

has 'dependencies' => (
    is => 'rw',
    isa => 'HashRef[HashRef]'
);


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub BUILD {
    my $self = shift;
    
    my $file_name = Joose::Librarian->resolve_name($self->name);
    die "Cant find file for " . $self->name unless $file_name;
    
    $self->file_name($file_name); 
}


my $enviroment = <<EOF
    
    var __name__, __props__;
    Class = Module = function (name, props) {
    	__name__ = name;
    	__props__ = props || {};
    }
    
    __JOOSE_LIBRARIAN__EXTRACT__(__name__, __props__.use, __props__.use && __props__.use.toSource(), __props__.version);
EOF
;


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub extract_dependencies {
	my $self = shift;
	
	my $rt = JavaScript::Runtime->new();
	my $cx = $rt->create_context();
	
	my ($name, $deps, $deps_source, $version);
	
	$cx->bind_function('__JOOSE_LIBRARIAN__EXTRACT__' => sub { ($name, $deps, $deps_source, $version) = @_ });
	
	$cx->eval($enviroment);
	$cx->eval_file($self->file_name);
	die "Class definition contain errors" if $@;
}




=head1 NAME

Joose::Librarian::Book - The great new Joose::Librarian::Book!

=head1 VERSION

Version 0.01

=cut

=head1 SYNOPSIS

Quick summary of what the module does.

Perhaps a little code snippet.

    use Joose::Librarian::Book;

    my $foo = Joose::Librarian::Book->new();
    ...

=head1 EXPORT

A list of functions that can be exported.  You can delete this section
if you don't export anything, such as for a purely object-oriented module.

=head1 FUNCTIONS

=head2 function1

=cut
  
=head2 function2

=cut

=head1 AUTHOR

Nickolay Platonov aka SamuraiJack, C<< <me at samuraijack.org> >>

=head1 BUGS

Please report any bugs or feature requests to C<bug-joose-librarian at rt.cpan.org>, or through
the web interface at L<http://rt.cpan.org/NoAuth/ReportBug.html?Queue=Joose-Librarian>.  I will be notified, and then you'll
automatically be notified of progress on your bug as I make changes.




=head1 SUPPORT

You can find documentation for this module with the perldoc command.

    perldoc Joose::Librarian::Book


You can also look for information at:

=over 4

=item * RT: CPAN's request tracker

L<http://rt.cpan.org/NoAuth/Bugs.html?Dist=Joose-Librarian>

=item * AnnoCPAN: Annotated CPAN documentation

L<http://annocpan.org/dist/Joose-Librarian>

=item * CPAN Ratings

L<http://cpanratings.perl.org/d/Joose-Librarian>

=item * Search CPAN

L<http://search.cpan.org/dist/Joose-Librarian/>

=back


=head1 ACKNOWLEDGEMENTS


=head1 COPYRIGHT & LICENSE

Copyright 2009 Nickolay Platonov aka SamuraiJack, all rights reserved.

This program is free software; you can redistribute it and/or modify it
under the same terms as Perl itself.


=cut

1; # End of Joose::Librarian::Book
