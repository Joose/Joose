#!/usr/bin/perl
use strict;

# Dont look at this :)
# This tries to tranform Perl tests written for Moose into JavaScript tests
# It reads from STDIN and writes to STDOUT

while(<>) {
    s/->(\w+),/.$1(),/g;
    s/\$//g;
    s/->/./g;
    s/{(\w+)}/$1/g;
    s/my\s+/var /g;
    s/([^_]+)_(\w)(\w*)/$1@{[ucfirst($2)]}$3/g;
    s/undef/null/g;
    s{#}{//}g;
    s{::}{.}g;
    print
}