#!perl

use Test::More tests => 1;
use lib "lib";

$ENV{JOOSE_INC} = "web/root1;web/root2";
$ENV{JOOSE_LIB} = "web/library";
$ENV{JOOSE_BUNDLE} = "web/bundles";

use Joose::Librarian;

Joose::Librarian->create_bundle(['StressTest.Test001', 'StressTest.Test002']);

pass("Dummy");