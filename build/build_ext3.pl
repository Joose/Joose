use strict;

use FindBin;

use Path::Class;

my $path = "$FindBin::Bin/..";


my $veryall = file($path, 'ext/ExtJS/ext-all-bridge.js');

my $veryall_fh = $veryall->openw();

print $veryall_fh scalar(file($path, 'build/dev/joose-3/joose.js')->slurp);
print $veryall_fh scalar(file($path, 'lib/JooseX/Bridge/Ext.js')->slurp);

print $veryall_fh scalar(file($path, 'ext/ExtJS/adapter/ext/ext-base.js')->slurp);
print $veryall_fh <<BRIDGE

Ext.extend = JooseX.Bridge.Ext.my.extend;

BRIDGE
;
print $veryall_fh scalar(file($path, 'ext/ExtJS/ext-all-debug.js')->slurp);

$veryall_fh->close();