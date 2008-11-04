#!/usr/bin/perl
use strict;

use FindBin qw{$Bin};
use File::Find;
use File::Copy;
use Getopt::Long;
use Pod::Usage;

=head1 NAME
    
    release.pl - release script for the joose javascript library

=head1 SYNOPSIS

    release.pl -d <directory> -v <version> [-h]

=head1 OPTIONS

=over 2

=item C<-d> direcgtory where script will build the joose release

=item C<-v> the version of the joose release the script is building

=item C<-h> display this help

=back

all options except C<-h> are required:


=head1 DESCRIPTION

prepares a joose release archive containing:

=over 2

=item - lib

=item - joose.js // all of lib in one file

=item - joose.js.gz // gzipped

=item - joose.mini.js // 

=item - joose.mini.js.gz // gzipped

=item - examples

=item - ext

=item - tests

=item - README, INSTAL, LICENCE

=back

=cut

my ($release_dir, $version, $help);

my $result = GetOptions(
    "d=s" => \$release_dir,
    "v=s" => \$version,
    "h"   => \$help
    );

if ($help) {
    pod2usage( -verbose => 2, -exitval => 0);
} elsif (!$release_dir || !$version) {
    pod2usage( -verbose => 2, -exitval => 99);
}

my $joose_dir   = "joose-$version";
my $compile_dir = "$release_dir/$joose_dir";

mkdir $compile_dir || die "Cant make compile dir: $!";

my $path = "$Bin/..";

require "$Bin/release_helpers.pl";

wipe_dir($compile_dir);
make_single_js($path, $compile_dir, $release_dir, $joose_dir);
compile($path, $compile_dir, $release_dir, $joose_dir);
