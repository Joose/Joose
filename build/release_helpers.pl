use strict;



use FindBin;
use File::Find;
use File::Copy;

sub exe ($);

my $path = "$FindBin::Bin/..";

my $files = [
            "Joose.js",
            "Joose/Kernel/ProtoMeta.js",
            "Joose/Kernel/ProtoMeta.js",
            "Joose/Kernel/ClassSeparation.js",
            "Joose/Kernel/ProtoMethod.js",
            "Joose/Kernel/ProtoAttribute.js",
            "Joose/Kernel/Inheritance.js",
            "Joose/Kernel/ProtoClassMethod.js",
            "Joose/Kernel/ClassMethods.js",
            "Joose/Kernel/Handlers.js",
            "Joose/Kernel/AdvancedProtoAttribute.js",            
            "Joose/Kernel/Namespace.js",
            "Joose/Kernel/DependenciesGroup.js",
            "Joose/Kernel/NamespaceKeeper.js",
            "Joose/Kernel/ProtoModule.js",
            "Joose/Kernel/Roles.js",
            "Joose/Kernel/ProtoRole.js",
            "Joose/Kernel/MetaClass.js",
            "Joose/TypeConstraint.js",
            "Joose/Attribute.js",
            "Joose/Method.js",
            "Joose/ClassMethod.js",
            "Joose/Class.js",
            "Joose/Builder.js",
            "Joose/TypeCoercion.js",
            "Joose/Types.js",
            "Joose/Role.js",
            "Joose/SimpleRequest.js",
            "Joose/Gears.js",
            "Joose/Storage.js",
            "Joose/Storage/Unpacker.js",
            "Joose/Decorator.js",
            "Joose/Prototype.js",
            "Digest/MD5.js"
];

sub compile {
	my($path, $compile_dir, $release_dir, $joose_dir) = @_; 
    foreach my $file (qw/LICENCE README INSTALL/) {
        copy("$path/$file", "$compile_dir/$file") 
            or die "Cant copy file $path/$file to $compile_dir/$file: $!";
    }
    
    export_dir("$path/examples", "$compile_dir/examples");
    export_dir("$path/tests", "$compile_dir/tests");
    export_dir("$path/ext", "$compile_dir/ext");
    export_dir("$path/lib", "$compile_dir/lib");
    
    chdir $release_dir or die "Cant change working dir: $!";
    gzip_dir($joose_dir);
    
    print "Made Release file\n";
}

sub single_js {
	my($path) = @_;
	# JS-Lib
    print "Building JS-Lib\n";

    @$files     = map { "$path/lib/$_" } @$files;

    my $now     = localtime;

    my $output  = "// Generated: $now\n\n";
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
    
    return $output
}

sub make_single_js {
	my($path, $compile_dir, $release_dir, $joose_dir) = @_; 
	
    # JS-Lib
    print "Building JS-Lib\n";

    my $output = single_js($path);

    # Write all JS-Code to a single file
     write_file("$compile_dir/joose.js", $output);
    
    # minify file, old style
    #my $end = "\s*[\r\n]+";
    #$output =~ s(^\s*//.*$)()gm;    # c++ style comments on line without code
    #$output =~ s(^\s+)()gm;         # leading white space
    #$output =~ s(;$end)(;)g;         # no newline after ;
    #$output =~ s({$end)({)g;         # no newline after {
    #$output =~ s(\s+$)()mg;          # trailing space
    #$output =~ s(\n+)(\n)g;          # multiple new lines
    #$output =~ s(//[^"'\n]*$)()gm;   # c++ style comments that cant be in quotes

    # Write all JS-Code to a single file
    # write_file("$compile_dir/joose.mini.js", $output);
    
    # use the YUI compressor to compress the js file
    exe "java -jar $path/ext/yuicompressor-2.4.1.jar $compile_dir/joose.js > $compile_dir/joose.mini.js";
    
    gzip("$compile_dir/joose.mini.js");
    
    # quick hack to get bleeding edge copy into blok
    copy_file("$compile_dir/joose.mini.js", "/ws/Joose2/examples/blok/static");

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
    print exe qq(gzip -9 -cf $file > $file.gz);
}

sub copy_file {
    my ($file, $target) = @_;
    print exe qq(cp $file $target);
}

sub gzip_dir {
    my ($dir) = @_;
    print exe qq(tar -czvf $dir.tgz $dir);
}

sub export_dir {
    my ($from, $to) = @_;
    print exe qq(svn export $from $to);
}

sub wipe_dir {
    my ($dir) = @_;
    print exe qq(rm -Rf $dir/*);
}

sub exe($) {
    my($command) = @_;
    
    print "$command\n";
    print qx($command);
}
