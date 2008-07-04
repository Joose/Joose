#!/usr/bin/perl
use strict;

# deletes the contents of the docs dir and
# regenerates it using ext/JSDoc

use FindBin;
use File::Path;

my $PATH   = "$FindBin::Bin/..";
my $JSDOC  = "$PATH/ext/JSDoc";
my $DOCDIR = "$PATH/docs/*";

chdir($JSDOC) || die "Cannot change working dir";

my $command = qq(java -jar app/js.jar app/run.js -a -t=templates/sweet ../../lib/* -d=../../docs);

rmtree($DOCDIR, {keep_root => 1});

print "Making docs $command\n";
system($command) and die "Unable to make docs due to $!$?";