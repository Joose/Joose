use strict;
use warnings;
use Test::More tests => 3;

BEGIN { use_ok 'Catalyst::Test', 'Joose::Library' }
BEGIN { use_ok 'Joose::Library::Controller::Librarian' }

ok( request('/librarian')->is_success, 'Request should succeed' );


