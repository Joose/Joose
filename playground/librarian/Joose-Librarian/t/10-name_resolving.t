#!perl

use Test::More tests => 20;
use lib "lib";

$ENV{JOOSE_INC} = "localLib/root1;localLib/root2;localLib/root3";

use Joose::Librarian;


for (my $i = 'A'; $i le 'J'; $i = chr(ord($i)+1) ) {
	my $book = Joose::Librarian->get_book($i);
	
	ok($book, "Book from created");
	like($book->source, qr/result:function/, "Book have a correct sources");
}