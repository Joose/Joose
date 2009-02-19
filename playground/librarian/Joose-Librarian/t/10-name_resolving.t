#!perl

use Test::More tests => 200;
use lib "lib";

$ENV{JOOSE_INC} = "localLib/root1;localLib/root2;localLib/root3";

use Joose::Librarian;


for (my $i = 1; $i <= 100; $i++) {
	my $book = Joose::Librarian->get_book(sprintf('StressTest.Test%3d', $i));
	
	ok($book, "Book from created");
	like($book->source, qr/Dependency StressTest\.Test\d\d\d is not satisfied/, "Book have a correct sources");
}