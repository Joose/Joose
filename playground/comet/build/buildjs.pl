#!/usr/bin/perl
use strict;

# dont look at this

use FindBin;

my $base     = "$FindBin::Bin/..";
my $path     = "$base/python";

my @files = (
	"ext/joose.js",
	"js/Addressable/Cookie.js",
	"js/Addressable/Constants.js",
	"js/Addressable/Connection.js",
	"js/Addressable/CometClient.js",
	"js/Addressable/XDomainRequest.js",
	"js/Addressable/Server.js",
	"js/Addressable/SimpleServer.js",
	"js/Addressable/GearsServerStub.js",
);

my @js_files = (
	@files,
	"js/Addressable/ScriptRequest.js",
);

make_single_js(\@js_files, "static/client-server.js");

my @gears_files = (
	"ext/json2.js",
	@files,
	"js/Addressable/GearsServer.js",
	"js/Addressable/GearsRequest.js",
	"js/gearsWorker.js",
);

make_single_js(\@gears_files, "gears/gears-client-server.js");

sub make_single_js {
	my($files, $js_filename) = @_;

    # JS-Lib
    print "Building JS-Lib\n";

    my $now = localtime;

    my $output = "// Generated: $now\n\n";

    foreach my $filename (@$files)
    {
    	$filename = "$base/$filename";
        open my $in, "$filename" or die "Cant open $filename due to $!";
        my @content = <$in>;

        my $short = $filename;
        my $quoted_path = quotemeta($base);
        $short =~ s(^$quoted_path)();

        $output .= "
;
// ##########################
// File: $short
// ##########################
";

        $output .= join "", @content;
    }

    # Write all JS-Code to a single file
    write_file("$path/$js_filename", $output);
    
    # minify file

    #$output =~ s(^\s*//.*$)()gm;    # c++ style comments on line without code
    #$output =~ s(^\s+)()gm;         # leading white space
    #my $end = "\s*[\r\n]+";
    #$output =~ s(;$end)(;)g;         # no newline after ;
    #$output =~ s({$end)({)g;         # no newline after {
    #$output =~ s(\s+$)()mg;          # trailing space
    #$output =~ s(\n+)(\n)g;          # multiple new lines
    #$output =~ s(//[^"'\n]*$)()gm;   # c++ style comments that cant be in quotes
	
	chdir($base) || die "Cant chdir to $base";
	
	#exe("cat skyres/js/basic.merged.js | java -jar build/yuicompressor-2.4.1.jar --type js --charset utf8 > skyres/js/basic.mini.js");
	#gzip("$path/basic.mini.js");

    print "Built Mini JS-Lib\n";
}

sub write_file {
    my($filename, $content) = @_;
    open my $out, ">$filename"
      or die "Cant open $filename for writing due to $!";
    print $out $content;
    close $out;
    
    #gzip($filename);
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