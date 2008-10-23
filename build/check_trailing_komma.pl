#!/usr/bin/perl
use strict;

use Cwd 'abs_path';
use FindBin;

my $path = (shift || "$FindBin::Bin/../lib");

die("The directory '$path' doesn't exist") unless -d $path;

use File::Find;

my $found_trailing_commas = 0;

find({ wanted => \&wanted, no_chdir => 1 }, $path);

if(!$found_trailing_commas) {
    print "No trailing commas found$/";
}

sub wanted {
    my $name = abs_path($File::Find::name);
    
    if($name !~ /\.js$/) {
        return
    }
    open my $in, $name or die "Cant open file $name due to $!";
    my $content = "";
    my $has_error = 0;
    while(<$in>) {
        s/\s+/ /gms;
        $content .= $_;
    }
    close $in;

    if (my @matches = ($content =~ /(.{0,30},\s*[}\]\)].{0,10})/gms) ) {
        $found_trailing_commas = 1;
        foreach my $near (@matches) {
            print "Trailing komma detected\n";
            print "File:    $name\n";
            print "Context: $near\n\n";
        }
    }
}
