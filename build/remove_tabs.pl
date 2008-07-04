#!/usr/bin/perl
use strict;

# dont look at this

my $path = shift or die "need path";

use File::Find;

my @files;

find(sub {
    
    my $name = $File::Find::name;
    
    if($name !~ /\.js$/) {
        return
    }
    open my $in, $name or die "Cant open file $name due to $!";
    my $content = "";
    my $has_tabs = 0;
    while(<$in>) {
        if(/\t/) {
            $has_tabs = 1;
        }
        s(\t)(    )g;
        $content .= $_;
        
    }
    close $in;
    
    if(!$has_tabs) {
        return
    }
    
    push @files, $name;
    
    open my $out, ">", $name or die "Cant open file $name for writing due to $!";

    print $out $content;
}, $path);


print "Corrected: ",join(", ", @files),"\n";

