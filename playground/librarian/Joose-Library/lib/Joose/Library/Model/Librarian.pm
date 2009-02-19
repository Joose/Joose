package Joose::Library::Model::Librarian;

use strict;
use warnings;
use parent 'Catalyst::Model::Adaptor';

use lib "../Joose-Librarian/lib";

__PACKAGE__->config(
    class => 'Joose::Librarian' 
);


sub prepare_arguments {
	my ($self, $app) = @_; # $app sometimes written as $c
	
	my $app_conf =  $app->config->{'Model::Librarian'};
	
    $ENV{JOOSE_LIB} = $app->path_to($app_conf->{library});
    $ENV{JOOSE_BUNDLE} = $app->path_to($app_conf->{bundles});
    
    my @inc = ();
    foreach my $root (@{$app_conf->{roots}}) {
    	push @inc, $app->path_to($root);
    }
    $ENV{JOOSE_INC} = join(";", @inc);
    
	return {};
}


=head1 NAME

Joose::Library::Model::Librarian - Catalyst Model

=head1 DESCRIPTION

Catalyst Model.

=head1 AUTHOR

SamuraiJack

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
