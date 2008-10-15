if (typeof Test == 'undefined') {
    Test = {};
}
if (typeof Test.TAP == 'undefined') {
    if (typeof JSAN != 'undefined') {
        JSAN.use('Test.TAP');
    } else {
        throw new Error('Test.TAP.Runner is dependent on Test.TAP');
    }
}
/*

=head1 NAME

    Test.TAP.Runner - A Simple Test Harness for Test.TAP

=head1 Synopsis

    var r = new Test.TAP.Runner().
    
    var testobj = {};
    testobj.runtests = function() {
        var t = new Test.TAP();
        t.plan(2);
        t.ok(true, 'true is true');
        t.is(1, 1, 'one is one');
        return t;
    }
    r.run_tests(obj);
=cut

*/

Test.TAP.Runner = function() {};

Test.TAP.Runner.prototype = new Test();

/*

=head1 Methods

=head2 out()

internal method inherited from L<Test.TAP> see L<Test.TAP> for useage

=cut

=head2 diag()

internal method inherited from L<Test.TAP> see L<Test.TAP> for useage

=cut

=head2 run_it()

runs the tests in a test object and reports on the results

=cut

*/

Test.TAP.Runner.prototype.run_it = function(obj) {
    this.diag('running ' + obj.name + ' tests');
    var tester; 
    try {
        tester = obj.runtests();
        if (tester.planned > tester.counter) {
            tester.diag('looks like you planned ' + tester.planned + ' tests but only ran '
            + tester.counter + ' tests');
        } else if (tester.planned < tester.counter) {
            tester.diag('looks like you planned ' + tester.planned + ' tests but ran '
            + (tester.counter - tester.planned) + ' tests extra');
        }
        this.diag('ran ' + tester.counter + ' tests out of ' + tester.planned);
        this.diag('passed ' + tester.passed + ' tests out of ' + tester.planned)
        this.diag('failed ' + tester.failed + ' tests out of ' + tester.planned)
    }
    catch(err) {
        this.diag("Test Suite Crashed!!! (" + err + ")");
    }
    
    return tester;
};

/*

=head2 run_tests()

    r.run_tests(obj1, obj2);

runs the tests in a list of test objects and reports on the results

=cut

*/

Test.TAP.Runner.prototype.run_tests = function() {
    var all = [];
    for (i=0; i<arguments.length; i++) {
        all.push(this.run_it(arguments[i]));
        this.out('\n');
    }
    return all;
};
