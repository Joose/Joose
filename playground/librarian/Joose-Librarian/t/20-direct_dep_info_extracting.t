#!perl

use Test::More tests => 22;
use lib "lib";

$ENV{JOOSE_INC} = "localLib/root1;localLib/root2;localLib/root3";

use Joose::Librarian;
use Data::Dump qw(dd ddx);

#================================================================================================================================================================================================================================================
#book A
#================================================================================================================================================================================================================================================
my $a = Joose::Librarian->get_book('A');

$a->extract_direct_dependencies();

is($a->version, 0.1, "A: Extracted correct version");

is(keys(%{$a->direct_dependencies}), 2, "A: Extracted correct dependencies number");

ok($a->direct_dependencies->{'D'}, "A: There is something in the D spot");
is($a->direct_dependencies->{'D'}->{Module}, 'D', "A: .. and it is a correct descriptor");

ok($a->direct_dependencies->{'E'}, "There is something in the E spot");
is($a->direct_dependencies->{'E'}->{Module}, 'E', "A: .. and it is a correct descriptor");


#================================================================================================================================================================================================================================================
#book E
#================================================================================================================================================================================================================================================
my $e = Joose::Librarian->get_book('E');

$e->extract_direct_dependencies();

is($e->version, 0.1, "E: Extracted correct version");

is(keys(%{$e->direct_dependencies}), 1, "E: Extracted correct dependencies number");


ok($e->direct_dependencies->{'H'}, "E: There is something in the H spot");
is($e->direct_dependencies->{'H'}->{Module}, 'H', "E: .. and it is a correct descriptor");
is($e->direct_dependencies->{'H'}->{version}, 0.2, "E: .. and it is a correct descriptor#2");


#================================================================================================================================================================================================================================================
#book F
#================================================================================================================================================================================================================================================
my $f = Joose::Librarian->get_book('F');

$f->extract_direct_dependencies();

is($f->version, 0.1, "F: Extracted correct version");

is(keys(%{$f->direct_dependencies}), 2, "F: Extracted correct dependencies number");

ok($f->direct_dependencies->{'I'}, "There is something in the I spot");
is($f->direct_dependencies->{'I'}->{Module}, 'I', "F: .. and it is a correct descriptor");
ok($f->direct_dependencies->{'I'}->{external}, "F: .. and it is a correct descriptor #2");


ok($f->direct_dependencies->{'J'}, "There is something in the J spot");
is($f->direct_dependencies->{'J'}->{Module}, 'J', "F: .. and it is a correct descriptor");

#================================================================================================================================================================================================================================================
#book C
#================================================================================================================================================================================================================================================
my $c = Joose::Librarian->get_book('C');

$c->extract_direct_dependencies();

is($c->version, 0.1, "C: Extracted correct version");

is(keys(%{$c->direct_dependencies}), 0, "C: Extracted correct dependencies number");


#================================================================================================================================================================================================================================================
#book H
#================================================================================================================================================================================================================================================
my $h = Joose::Librarian->get_book('H');

$h->extract_direct_dependencies();

is($h->version, 0.2, "H: Extracted correct version");

is(keys(%{$h->direct_dependencies}), 0, "H: Extracted correct dependencies number");
