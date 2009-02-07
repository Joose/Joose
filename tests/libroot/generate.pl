use strict;
use File::Find::Rule;
use Path::Class;
use Template;

#use Getopt::LL::Simple qw(
#    --original(/mnt/windows/catalyst/.shared/ext-2.1)=s
#    --kanban(Ext)=s
#    --jscout(/home/catalyst/Workspace/EclipseWorkspace/catalyst/Travel/root/lib/jScout.js)=s
#    --libroot(lib)=s
#    --weblibroot(lib)=s
#    --rescan
#    --minify
#    --makedist
#    --stublesscore
#    --patchdir=s    
#);
#
#my ($ORIGINAL, $ORIGINAL_SRC, $KANBAN, $KANBAN_SRC, $LIB_ROOT);


my $class_template = <<TEMPLATE
if (typeof [% class_name %] == 'function' && [% class_name %].meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of [% class_name %]";
}

Class('[% class_name %]', {
	use : [ 
	   [% FOREACH dep IN class_dependencies %]
	       '[% dep %]'[% UNLESS loop.last; %],[% END %]
	   [% END %]
	],
	
	methods : {
		result : function () { return [% class_number %] }
	}
})
TEMPLATE
;

my $tt = Template->new();


my $class_number = 100;
my $class_name_prefix = 'StressTest.Test';

for (my $i = 1; $i <= $class_number; $i++) {
	my @deps = ();
	
	for (my $j = $i + 1; $j <= $class_number; $j++) {
		#averagely 10 dependencies 
		if (rand() < 10/($class_number - $i)) {
			push @deps, get_class_name($class_name_prefix, $j)
		}
	}
	
	my $res = '';
	my $class_name = get_class_name($class_name_prefix, $i);
	$tt->process(
	    \$class_template,
	    {
	        class_name => $class_name,
	        class_number => $i,
	        class_dependencies => \@deps
	    },
	    \$res
	) || die $tt->error(), "\n";
	
	my $filename = join('/',split(m!\.!, $class_name)) . '.js';
	
	file($filename)->dir->mkpath();
	
	my $fh = file($filename)->openw();
	print $fh $res;
	$fh->close();
}




sub get_class_name {
	my ($prefix, $num) = @_;
	
	return $prefix . sprintf("%03d", $num);
}