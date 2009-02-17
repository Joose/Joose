#!perl

use Test::More tests => 4;

$ENV{JOOSE_INC} = "/home/catalyst/Workspace/EclipseWorkspace/Joose-Dependencies/playground/librarian/Joose-Librarian/webroot;/home/catalyst/Workspace/EclipseWorkspace/Joose-Dependencies/playground/librarian/Joose-Librarian/webroot2";

use Joose::Librarian;
use Joose::Librarian::Book;

my $book = Joose::Librarian::Book->new(name => 'StressTest.Test001');

ok($book, "Book from web1 created");
like($book->source, qr/Dependency StressTest\.Test002 is not satisfied/, "Book have a correct name");

$book = Joose::Librarian::Book->new(name => 'StressTest.Test072');

ok($book, "Book from web1 created");
like($book->source, qr/StressTest\.Test072/, "Book have a correct name");

