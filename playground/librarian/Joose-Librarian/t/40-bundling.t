#!perl

use Test::More tests => 2;
use lib "lib";

$ENV{JOOSE_INC} = "localLib/root1;localLib/root2;localLib/root3";
$ENV{JOOSE_LIB} = "localLib/library";
$ENV{JOOSE_BUNDLE} = "localLib/bundles";

use Joose::Librarian;
use Path::Class;
use Digest::MD5 qw/md5_hex/;


my $lib_dir = dir($ENV{JOOSE_LIB});
$lib_dir->rmtree();
$lib_dir->mkpath();


my $bundle_dir = dir($ENV{JOOSE_BUNDLE});
$bundle_dir->rmtree();
$bundle_dir->mkpath();


my $bundle_desc = "A-0.1,H-0.2";
my $bundle_md5 = md5_hex($bundle_desc);

Joose::Librarian->create_bundle(
	[
        { Module => 'H', version => 0.2},
	    { Module => 'A', version => 0.1}
	],
	$bundle_md5
);

pass("Dependencies were sorted");

ok(-e file("$bundle_md5.js")->absolute($bundle_dir), "Grouped file appears");