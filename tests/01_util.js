plan(10);

diag("Joose.A")
ok(Joose.A.exists(["test","test2"], "test"), "Joose.A.exists finds strings")
ok(Joose.A.exists(["test","test2"], "test2"), "Joose.A.exists finds strings")
ok(!Joose.A.exists(["test","test2"], "test3"), "Joose.A.exists does not find non existing")
ok(Joose.A.exists([1], 1), "Joose.A.exists finds nums")
var a = {};
ok(Joose.A.exists([a], a), "Joose.A.exists works ob objects too")


diag("Joose.S")
ok(Joose.S.uppercaseFirst("test") == "Test", "Joose.S.uppercaseFirst works")
ok(Joose.S.isString("test"), "Joose.S.isString identifies strings")
ok(!Joose.S.isString(1), "Joose.S.isString identifies non strings")
ok(!Joose.S.isString({}), "Joose.S.isString identifies non strings")
ok(!Joose.S.isString(new String("")), "Joose.S.isString identifies non strings")

endTests()