package Geometry::Point;
use Moose;
use MooseX::Storage;

our $VERSION = '0.01';

with Storage( 'format' => 'JSON', 'io' => 'File' );

has 'x' => ( is => 'rw', isa => 'Int' );
has 'y' => ( is => 'rw', isa => 'Int' );

1;
package main;

my $p = Geometry::Point->new( x => 10, y => 10 );

if(@ARGV) {
	my $json = shift;
	
	$p = Geometry::Point->thaw($json)
}

print $p->freeze(),"\n"
