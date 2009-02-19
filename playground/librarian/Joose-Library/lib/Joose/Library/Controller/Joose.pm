package Joose::Library::Controller::Joose;

use strict;
use warnings;
use parent 'Catalyst::Controller';

=head1 NAME

Joose::Library::Controller::Joose - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index 

=cut


#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub index :Path {
    my ( $self, $c, @filename ) = @_;

    $c->serve_static_file($c->path_to('../../../',@filename));
}


=head1 AUTHOR

SamuraiJack

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
