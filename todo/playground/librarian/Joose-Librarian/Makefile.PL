use inc::Module::Install;

name     'Joose-Librarian';
all_from 'lib/Joose/Librarian.pm';
author   'Nickolay Platonov aka SamuraiJack <me@samuraijack.org>';
license  'perl';

build_requires 'Test::More';

auto_install;

WriteAll;

