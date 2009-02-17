package Joose::Librarian;

#use warnings;
#use strict;

our $VERSION = '0.01';


use Moose;

use Path::Class;

__PACKAGE__->meta()->make_immutable();

no Moose;



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


=head1 NAME

Joose::Librarian - The great new Joose::Librarian!

=head1 VERSION

Version 0.01

=cut

=head1 SYNOPSIS

Quick summary of what the module does.

Perhaps a little code snippet.

    use Joose::Librarian;

    my $foo = Joose::Librarian->new();
    ...

=head1 AUTHOR

Nickolay Platonov aka SamuraiJack, C<< <me at samuraijack.org> >>

=head1 BUGS

Please report any bugs or feature requests to C<bug-joose-librarian at rt.cpan.org>, or through
the web interface at L<http://rt.cpan.org/NoAuth/ReportBug.html?Queue=Joose-Librarian>.  I will be notified, and then you'll
automatically be notified of progress on your bug as I make changes.




=head1 SUPPORT

You can find documentation for this module with the perldoc command.

    perldoc Joose::Librarian


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

1; # End of Joose::Librarian
