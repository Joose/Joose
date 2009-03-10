use strict;

use FindBin;
use File::Find;
use File::Copy;

sub exe ($);

my $path = "$FindBin::Bin/..";

my @classes = (
	        "Joose",
	# copy this from Joose
            "Joose.Proto.Object",
            "Joose.Proto.Class",
            "Joose.Managed.Property",
            "Joose.Managed.Property.ConflictMarker",
            "Joose.Managed.Property.Requirement",
            "Joose.Managed.Property.Attribute",
            "Joose.Managed.Property.MethodModifier",
            "Joose.Managed.Property.MethodModifier.Override",
            "Joose.Managed.Property.MethodModifier.Put",
            "Joose.Managed.Property.MethodModifier.After",
            "Joose.Managed.Property.MethodModifier.Before",
            "Joose.Managed.Property.MethodModifier.Around",
            "Joose.Managed.Property.MethodModifier.Augment",
            "Joose.Managed.PropertySet",
            "Joose.Managed.PropertySet.Mutable",
            "Joose.Managed.PropertySet.Composition",
            "Joose.Managed.RoleStem.Attributes",
            "Joose.Managed.RoleStem.Methods",
            "Joose.Managed.RoleStem.Requirements",
            "Joose.Managed.RoleStem.MethodModifiers",
            "Joose.Managed.Stem.RoleStem",
            "Joose.Managed.Builder",
            "Joose.Managed.Role",
            "Joose.Managed.PropertySet.Containable",
            "Joose.Managed.ClassStem.Attributes",
            "Joose.Managed.ClassStem.Methods",
            "Joose.Managed.ClassStem.Requirements",
            "Joose.Managed.ClassStem.MethodModifiers",
            "Joose.Managed.Stem",
            "Joose.Managed.Object",          
            "Joose.Managed.Class"
	
	
#            "Joose.Kernel.ProtoMeta",
#            "Joose.Kernel.Inheritable",
#            "Joose.Kernel.ProtoMethod",
#            "Joose.Kernel.ProtoAttribute",
#            "Joose.Kernel.Inheritance",
#            "Joose.Kernel.ProtoClassMethod",
#            "Joose.Kernel.ClassMethods",
#            "Joose.Kernel.Handlers",
#            "Joose.Kernel.Roles",
#            "Joose.Kernel.ProtoModule",
#            "Joose.Kernel.NamespaceKeeper",
#            
#            "Joose.Kernel.MetaClass",
#            "Joose.Kernel.ProtoRole",
#            "Joose.Kernel.MetaClass.Depended",
#            "Joose.Kernel.MetaClass.Depended.Grouped",
##//            "Joose.Kernel.MetaClass.Depended.NonCycled",
#            "Joose.Kernel.MetaClass.Depended.Transport.ScriptTag",
#            "Joose.Kernel.MetaClass.Depended.Transport.AjaxAsync",
#            
#            "Joose.Attribute",
#            "Joose.Method",
#            "Joose.ClassMethod",
#            "Joose.Class",
#            "Joose.TypeConstraint",
#            "Joose.Builder",
#            "Joose.TypeCoercion",
#            "Joose.Types",
#            "Joose.Role",
#            "Joose.Singleton",
#            "Joose.SimpleRequest",
#            "Joose.Gears",
#            "Joose.Storage",
#            "Joose.Storage.Unpacker",
#            "Joose.Decorator",
#            "Joose.TypeChecker",
#            "Joose.Prototype",
#            "Joose.TypedMethod",
#            "Joose.MultiMethod",
#            "Digest.MD5"
 );

  my $files = [map { s{\.}{/}g; "$_.js" } @classes];

sub compile {
	my ( $path, $compile_dir, $release_dir, $joose_dir ) = @_;
	foreach my $file (qw/LICENCE README INSTALL/) {
		copy( "$path/$file", "$compile_dir/$file" )
		  or die "Cant copy file $path/$file to $compile_dir/$file: $!";
	}

	export_dir( "$path/examples", "$compile_dir/examples" );
	export_dir( "$path/tests",    "$compile_dir/tests" );
	export_dir( "$path/ext",      "$compile_dir/ext" );
	export_dir( "$path/lib",      "$compile_dir/lib" );

	chdir $release_dir or die "Cant change working dir: $!";
	gzip_dir($joose_dir);

	print "Made Release file\n";
}

sub single_js {
	my ( $path, $version ) = @_;

	# JS-Lib
	print "Building JS-Lib\n";

	@$files = map { "$path/lib/$_" } @$files;

	my $now = localtime;

	my $output = "// This is Joose $version
// For documentation see http://code.google.com/p/joose-js/
// Generated: $now\n\n";
	foreach my $filename (@$files) {
		open my $in, "$filename" or die "Cant open $filename due to $!";
		my @content = <$in>;

		my $short       = $filename;
		my $quoted_path = quotemeta( $path . "/lib/" );
		$short =~ s(^$quoted_path)();

		$output .= "
// ##########################
// File: $short
// ##########################
";

		$output .= join "", @content;
	}

	return $output;
}

sub make_single_js {
	my ( $path, $compile_dir, $release_dir, $joose_dir, $version ) = @_;

	# JS-Lib
	print "Building JS-Lib\n";

	my $output = single_js( $path, $version );

	# Write all JS-Code to a single file
	write_file( "$compile_dir/joose.js", $output );

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
	exe
"java -jar $path/ext/yuicompressor-2.4.1.jar $compile_dir/joose.js > $compile_dir/joose.mini.js";

	gzip("$compile_dir/joose.mini.js");

	# quick hack to get bleeding edge copy into blok
	copy_file( "$compile_dir/joose.mini.js", "/ws/Joose/examples/blok/static" );

	print "Built Mini JS-Lib\n";
}

sub write_file {
	my ( $filename, $content ) = @_;
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
	my ( $file, $target ) = @_;
	print exe qq(cp $file $target);
}

sub gzip_dir {
	my ($dir) = @_;
	print exe qq(tar -czvf $dir.tgz $dir);
}

sub export_dir {
	my ( $from, $to ) = @_;
	print exe qq(svn export $from $to);
}

sub wipe_dir {
	my ($dir) = @_;
	print exe qq(rm -Rf $dir/*);
}

sub exe($) {
	my ($command) = @_;

	print "$command\n";
	print qx($command);
}
