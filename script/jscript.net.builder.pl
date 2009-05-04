#!/usr/bin/perl

use strict;

use FindBin;

my $path     = "$FindBin::Bin/..";

require "release_helpers.pl";

my $js = qq(
print("Start")

var window = this;

window.isDotNet = true;

var document = {};
var navigator = {};
var Joose;
var __global__;
var google = {};
var GearsFactory;
var TYPE;
//with (window) {
);

$js .= single_js($path);

$js .="//}";

my $filename = "$path/playground/jscript.net/joose.js";

print "Generating $filename\n";

open my $file, ">$filename" or die "Cant open file $filename due to $!";

print $file $js;

close($file);

my $tester_filename = "$path/playground/jscript.net/test.bat";

open my $test_bat, ">$tester_filename" or die "Cant open file $tester_filename due to $!";

# Evil: this makes tests/tests.js executable Perl :)
sub runTestFile {
	local($_) = @_; 
	if(!/gears/) {
		print $test_bat qq{
jsc /fast- joose.js ../../ext/test_simple.js ../../tests/json2.js ../../tests/$_
joose.exe
pause
		};
	}
}

require "$path/tests/tests.js";