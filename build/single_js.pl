#!/usr/bin/perl

use strict;

use FindBin;

my $path     = "$FindBin::Bin/..";

require "release_helpers.pl";

my $js       = single_js($path);

my $filename = "$path/lib/joose_all.js";

print "Generating $filename\n";

open my $file, ">$filename" or die "Cant open file $filename due to $!";

print $file $js;