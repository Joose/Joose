#!/usr/bin/perl
use strict;

# dont look at this

use FindBin;

my $path = "$FindBin::Bin";

my $template = "$path/index.t.html";

open my $in, $template or die "Cant open file $template due to $!";

my @files;

open my $out, ">$template.mini" or die "Cant open file $template.mini due to $!";


my $first = 1;
while(<$in>) {
	if(m{^\<script type="text/javascript" src="([\w-_/.]+)"\>\</script\>}i && !m{jquery}) {
		my $filename = $1;
		if($filename !~ /^http/) {
			print "$filename\n";
			push @files, "$path/$filename";
			
			if($first) {
				print $out qq{<script type="text/javascript" src="static/blok.mini.js"></script>\n};
				$first = 0
			}
		} else {
			print $out $_
		}
	} else {
		print $out $_
	}
}

make_single_js(\@files);

sub make_single_js {
	my($files) = @_;

    # JS-Lib
    print "Building JS-Lib\n";

    my $now = localtime;

    my $output = "// Generated: $now\n\n";

    foreach my $filename (@$files)
    {
        open my $in, "$filename" or die "Cant open $filename due to $!";
        my @content = <$in>;

        my $short = $filename;
        my $quoted_path = quotemeta($path."/lib/");
        $short =~ s(^$quoted_path)();

        $output .= "
// ##########################
// File: $short
// ##########################
";

        $output .= join "", @content;
    }

    # Write all JS-Code to a single file
     write_file("$path/static/blok.js", $output);
    
    # minify file

    $output =~ s(^\s*//.*$)()gm;    # c++ style comments on line without code
    $output =~ s(^\s+)()gm;         # leading white space
    my $end = "\s*[\r\n]+";
    $output =~ s(;$end)(;)g;         # no newline after ;
    $output =~ s({$end)({)g;         # no newline after {
    $output =~ s(\s+$)()mg;          # trailing space
    $output =~ s(\n+)(\n)g;          # multiple new lines
    $output =~ s(//[^"'\n]*$)()gm;   # c++ style comments that cant be in quotes

    # Write all JS-Code to a single file
    write_file("$path/static/blok.mini.js", $output);

    print "Built Mini JS-Lib\n";
}

sub write_file {
    my($filename, $content) = @_;
    open my $out, ">$filename"
      or die "Cant open $filename for writing due to $!";
    print $out $content;
    close $out;
    
    gzip($filename);
}

sub gzip {
    my ($file) = @_;
    print exe(qq(gzip -cf $file > $file.gz));
    print "GZipped $file\n";
}

sub exe($) {
    my($command) = @_;
    
    print "$command\n";
    print qx($command);
}