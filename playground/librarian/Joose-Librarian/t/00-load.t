#!perl -T

use Test::More tests => 2;
use lib "lib";

BEGIN {
	use_ok( 'Joose::Librarian' );
	use_ok( 'Joose::Librarian::Book' );
}

