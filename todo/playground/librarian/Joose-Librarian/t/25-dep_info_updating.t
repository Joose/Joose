#!perl

use Test::More tests => 18;
use lib "lib";

$ENV{JOOSE_INC} = "localLib/root1;localLib/root2;localLib/root3";

use Joose::Librarian;
use JavaScript::Beautifier qw/js_beautify/;
use Data::Dump qw(dd ddx);


#================================================================================================================================================================================================================================================
#book A
#================================================================================================================================================================================================================================================
my $a = Joose::Librarian->get_book('A');

$a->update_direct_dependencies();
$a->extract_direct_dependencies();

is(keys(%{$a->direct_dependencies}), 4, "A: The number of direct dependencies equal to number of all dependencies");

is($a->direct_dependencies->{'D'}->{Module}, 'D', "A: .. got D among them");
is($a->direct_dependencies->{'E'}->{Module}, 'E', "A: .. got E among them");
is($a->direct_dependencies->{'G'}->{Module}, 'G', "A: .. got G among them");
is($a->direct_dependencies->{'H'}->{Module}, 'H', "A: .. got H among them");
is($a->direct_dependencies->{'H'}->{version}, 0.2, "A: .. and H is at correct version");


#================================================================================================================================================================================================================================================
#book D
#================================================================================================================================================================================================================================================
my $d = Joose::Librarian->get_book('D');

$d->update_direct_dependencies();
$d->extract_direct_dependencies();

is(keys(%{$d->direct_dependencies}), 2, "D: The number of direct dependencies equal to number of all dependencies");

is($d->direct_dependencies->{'G'}->{Module}, 'G', "D: .. got G among them");
is($d->direct_dependencies->{'H'}->{Module}, 'H', "D: .. got H among them");
is($d->direct_dependencies->{'H'}->{version}, 0.1, "D: .. and H is at correct version");


#================================================================================================================================================================================================================================================
#book E
#================================================================================================================================================================================================================================================
my $e = Joose::Librarian->get_book('E');

$e->update_direct_dependencies();
$e->extract_direct_dependencies();

is(keys(%{$e->direct_dependencies}), 1, "E: The number of direct dependencies equal to number of all dependencies");

is($e->direct_dependencies->{'H'}->{Module}, 'H', "E: .. got H among them");
is($e->direct_dependencies->{'H'}->{version}, 0.2, "E: .. and H is at correct version");



#================================================================================================================================================================================================================================================
#book B
#================================================================================================================================================================================================================================================
my $b = Joose::Librarian->get_book('B');

$b->update_direct_dependencies();
$b->extract_direct_dependencies();

is(keys(%{$b->direct_dependencies}), 3, "B: The number of direct dependencies equal to number of all dependencies");

is($b->direct_dependencies->{'F'}->{Module}, 'F', "B: .. got F among them");
is($b->direct_dependencies->{'I'}->{Module}, 'I', "B: .. got I among them");
is($b->direct_dependencies->{'J'}->{Module}, 'J', "B: .. got J among them");


#================================================================================================================================================================================================================================================
#book C
#================================================================================================================================================================================================================================================
my $c = Joose::Librarian->get_book('C');

$c->update_direct_dependencies();
$c->extract_direct_dependencies();

is(keys(%{$c->direct_dependencies}), 0, "C: The number of direct dependencies equal to number of all dependencies");
