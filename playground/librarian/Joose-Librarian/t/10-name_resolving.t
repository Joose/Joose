#!perl

use Test::More tests => 4;
use lib "lib";

$ENV{JOOSE_INC} = "web/root1;web/root2";

use Joose::Librarian;

my $book = Joose::Librarian->get_book('StressTest.Test001');

ok($book, "Book from web1 created");
like($book->source, qr/Dependency StressTest\.Test002 is not satisfied/, "Book have a correct name");

$book = Joose::Librarian->get_book('StressTest.Test072');

ok($book, "Book from web1 created");
like($book->source, qr/StressTest\.Test072/, "Book have a correct name");

