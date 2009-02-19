package Joose::Library::Controller::Librarian;

use strict;
use warnings;
use parent 'Catalyst::Controller';

=head1 NAME

Joose::Library::Controller::Librarian - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index 

=cut



#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub index :Path :Args(1) {
    my ( $self, $c, $filename ) = @_;

    my $bundle_filename = $c->path_to(__PACKAGE__->config->{'bundles'}, $filename);
    if (-e $bundle_filename) {
    	$c->serve_static_file($bundle_filename);
    	return;
    }
    
    
}


=head1 AUTHOR

SamuraiJack

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
