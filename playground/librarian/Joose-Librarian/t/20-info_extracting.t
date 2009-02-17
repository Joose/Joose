#!perl

use Test::More tests => 7;

$ENV{JOOSE_INC} = "/home/catalyst/Workspace/EclipseWorkspace/Joose-Dependencies/playground/librarian/Joose-Librarian/webroot;/home/catalyst/Workspace/EclipseWorkspace/Joose-Dependencies/playground/librarian/Joose-Librarian/webroot2";

use Joose::Librarian;
use JavaScript::Beautifier qw/js_beautify/;

my $book = Joose::Librarian->get_book('StressTest.Test001');

$book->extract_direct_dependencies();

is($book->version, 0.1, "Extracted correct version");

is(keys(%{$book->direct_dependencies}), 7, "Extracted correct dependencies number");

ok($book->direct_dependencies->{'StressTest.Test002'}, "There is something in the StressTest.Test002 spot");
is($book->direct_dependencies->{'StressTest.Test002'}->{Module}, 'StressTest.Test002', ".. and it is a correct descriptor");


ok($book->direct_dependencies->{'StressTest.Test007'}, "There is something in the StressTest.Test007 spot");
is($book->direct_dependencies->{'StressTest.Test007'}->{Module}, 'StressTest.Test007', ".. and it is a correct descriptor");

$book->extract_all_dependencies();

ok($book->has_all_dependencies, "All depedencies were setup'ed");

$book->update_direct_dependencies();

#diag("source = " . js_beautify($book->source));