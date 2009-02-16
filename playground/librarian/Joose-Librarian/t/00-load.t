#!perl -T

use Test::More tests => 1;

BEGIN {
	use_ok( 'Joose::Librarian::Scheme' );
}

diag( "Testing Joose::Librarian::Scheme $Joose::Librarian::Scheme::VERSION, Perl $], $^X" );
