use strict;
use warnings;
use Test::More tests => 3;

BEGIN { use_ok 'Catalyst::Test', 'Joose::Library' }
BEGIN { use_ok 'Joose::Library::Controller::Joose' }

ok( request('/joose')->is_success, 'Request should succeed' );


