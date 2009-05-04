use lib "$ENV{HOME}/Workspace/EclipseWorkspace/JSAN/module-build-jsan/lib";

use Module::Build::JSAN;

my $build = Module::Build::JSAN->new(
	module_name    => 'Joose',
	create_makefile_pl => 'passthrough',
	dist_version   => 3.001,
	dist_author   => 'SamuraiJack',
	dist_abstract  => "Post modern self-hosting meta object system for JavaScript with support for classes, inheritance, mixins, traits, method modifiers and more.",
	license        => 'perl',
);

$build->create_build_script;

