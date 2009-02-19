#!perl

use Test::More tests => 1;
use lib "lib";

$ENV{JOOSE_INC} = "localLib/root1;localLib/root2;localLib/root3";
$ENV{JOOSE_LIB} = "localLib/library";
$ENV{JOOSE_BUNDLE} = "localLib/bundles";

use Joose::Librarian;

Joose::Librarian->create_bundle(['StressTest.Test001', 'StressTest.Test002']);

pass("Dummy");