#!/usr/bin/perl
use strict;

my $path = shift or die "need path";

use File::Find;


find(sub {
    
    my $name = $File::Find::name;
    
    if($name !~ /\.js$/) {
        return
    }
    open my $in, $name or die "Cant open file $name due to $!";
    my $content = "";
    my $has_error = 0;
    while(<$in>) {
        s(\t)()g;
        s(\s)()g;
        $content .= $_;
    }
    close $in;

	if ($content =~ /,[}\]],/) {
		$has_error = 1;
		print "Trailing komma in literal in file: ".$name."\n";
	}
    
    if(!$has_error) {
        return
    }

}, $path);




