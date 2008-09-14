#!/usr/bin/perl
use strict;

# prepares a joose release archive
# containing
# - lib
# - joose.js // all of lib in one file
# - joose.js.gz // gzipped
# - joose.mini.js // 
# - joose.mini.js.gz // gzipped
# - examples
# - ext
# - tests
# - README, INSTAL, LICENCE

my $release_dir = shift || die "need release dir";
my $version     = shift || die "need version";

my $joose_dir   = "joose-$version";
my $compile_dir = "$release_dir/$joose_dir";

mkdir $compile_dir || die "Cant make compile dir: $!";

my $path = "$FindBin::Bin/..";

require "release_helpers.pl";

wipe_dir($compile_dir);
make_single_js($path, $compile_dir, $release_dir, $joose_dir);
compile($path, $compile_dir, $release_dir, $joose_dir);