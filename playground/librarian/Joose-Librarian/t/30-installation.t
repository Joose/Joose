#!perl

use Test::More tests => 1;
use lib "lib";

#$ENV{JOOSE_INC} = "localLib/root1;localLib/root2;localLib/root3";
#$ENV{JOOSE_LIB} = "localLib/library";
#
#use Joose::Librarian;
#use JavaScript::Beautifier qw/js_beautify/;
#use Path::Class;
#
#
#file("web/library/StressTest/Test001.js")->remove();
#
#my $book = Joose::Librarian->get_book('StressTest.Test001');
#
#$book->update_direct_dependencies();
#
#Joose::Librarian->install_book($book);
#
#ok(-e "web/library/StressTest/Test001.js", "File appears");
#
#
#for (my $i = 2; $i <= 100; $i++) {
#	my $book_name = sprintf("StressTest.Test%03d", $i);
#	
#	$book = Joose::Librarian->get_book($book_name);
#	$book->update_direct_dependencies();
#	Joose::Librarian->install_book($book);
#}
#
##diag("source = " . js_beautify($book->source));