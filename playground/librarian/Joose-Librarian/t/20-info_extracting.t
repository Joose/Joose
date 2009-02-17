#!perl

use Test::More tests => 4;

$ENV{JOOSE_INC} = "/home/catalyst/Workspace/EclipseWorkspace/Joose-Dependencies/playground/librarian/Joose-Librarian/webroot;/home/catalyst/Workspace/EclipseWorkspace/Joose-Dependencies/playground/librarian/Joose-Librarian/webroot2";

use Joose::Librarian;
use Joose::Librarian::Book;

my $book = Joose::Librarian::Book->new(name => 'StressTest.Test001');

$book->extract_dependencies();

is($book->version, 0.1, "Extracted correct version");
is(@{$book->dependencies}, 7, "Extracted correct dependencies number");
is($book->dependencies->[0]->{Module}, 'StressTest.Test002', "Extracted correct dependency #1");
is($book->dependencies->[1]->{Module}, 'StressTest.Test007', "Extracted correct dependency #2");

