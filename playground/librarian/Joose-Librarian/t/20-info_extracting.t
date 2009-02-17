#!perl

use Test::More tests => 4;

$ENV{JOOSE_INC} = "/home/catalyst/Workspace/EclipseWorkspace/Joose-Dependencies/playground/librarian/Joose-Librarian/webroot;/home/catalyst/Workspace/EclipseWorkspace/Joose-Dependencies/playground/librarian/Joose-Librarian/webroot2";

use Joose::Librarian;
use Joose::Librarian::Book;

my $book = Joose::Librarian::Book->new(name => 'StressTest.Test001');

$book->extract_dependencies();