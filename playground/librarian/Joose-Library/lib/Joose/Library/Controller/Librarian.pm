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

use Path::Class;

#================================================================================================================================================================================================================================================
#================================================================================================================================================================================================================================================
sub index :Path :Args(1) {
    my ( $self, $c, $filename ) = @_;

    my $bundle_filename = file($filename)->absolute($ENV{JOOSE_BUNDLE});
    
#    if (-e $bundle_filename) {
#    	$c->serve_static_file($bundle_filename);
#    	return;
#    }
    
    my $dep_text = $c->req->params->{text};
    my @deps = split(/,/, $dep_text);
    for (my $i = 0; $i < @deps; $i++) {
    	my $version = '';
    	my $external = 0;
    	
    	if ($deps[$i] =~ /(.*)-(.*)$/) {
    		$deps[$i] = $1;
    		$version = $2;
    	}
    	
        if ($deps[$i] =~ m!ext://(.*)!) {
            $deps[$i] = $1;
            $external = 1;
        }
    	
    	$deps[$i] = { Module => $deps[$i] };
    	$deps[$i]->{version} = $version if $version;
    	$deps[$i]->{external} = 1 if $external;
    }
    
    $filename =~ /(.*)\.js$/;
    
    my $response = $c->model('Librarian')->create_bundle(\@deps, $1);
    
#    $c->log->debug($response);
    
    $c->response->body($response);
}


=head1 AUTHOR

SamuraiJack

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
