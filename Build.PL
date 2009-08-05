use lib "/home/catalyst/Workspace/EclipseWorkspace/JSAN/Module-Build-JSAN-Installable/lib";

use Module::Build::JSAN::Installable;

my $build = Module::Build::JSAN::Installable->new(

	module_name            => 'Joose',
    dist_version           => 3.001,
	
	dist_author            => 'SamuraiJack',
	dist_abstract          => "Post modern self-hosting meta object system for JavaScript with support for classes, inheritance, mixins, traits, method modifiers and more.",
	
	license                => 'perl',
	
	create_makefile_pl     => 'passthrough',
	
	docs_markup            => 'mmd'
);

$build->create_build_script;

