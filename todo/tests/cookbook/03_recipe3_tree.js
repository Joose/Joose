plan(27)

Class("BinaryTree");

Class("BinaryTree", {
    has: {
        node: {
            is: rw
        },
        parent: {
            is:        rw,
            isa:       BinaryTree,
            predicate: "hasParent"
        },
        left: {
            is:        rw,
            isa:       BinaryTree,
            predicate: "hasLeft",
            lazy:      true,
            init:      function () { return new BinaryTree({ parent: this })}
        },
        right: {
            is:        rw,
            isa:       BinaryTree,
            predicate: "hasRight",
            lazy:      true,
            init:      function () { return new BinaryTree({ parent: this })}
        }
    },
    before: {
        setLeft:  function (left)  { left.setParent(this) },
        setRight: function (right) { right.setParent(this) }
    }
})

var root = new BinaryTree({ node: "root" });

ok(root.getNode() == "root", "... got the right node value");

ok(root.hasLeft(), "... no left node yet");
ok(root.hasRight(), "... no right node yet");

ok(!root.hasParent(), "... root has no parent");

var left = root.getLeft();
ok(left.meta.isa(BinaryTree));

isEq(root.getLeft(), left, '... got the same node (and it is left)');
ok(root.hasLeft(), '... we have a left node now');

ok(left.hasParent(), '... lefts has a parent');
isEq(left.getParent(), root, '... lefts parent is the root');

ok(left.hasLeft(), '... left no left node yet');
ok(left.hasRight(), '... left no right node yet');

isEq(left.getNode(), null, '... left has got no node value');

left.setNode("left")

isEq(left.getNode(), 'left', '... left now has a node value');

// make a right node

ok(root.hasRight(), '... still no right node yet');

isEq(root.right.getNode(), null, '... right has got no node value');

ok(root.hasRight(), '... now we have a right node');

var right = root.right;
ok(right.meta.isa(BinaryTree));

right.setNode('right')

isEq(right.getNode(), 'right', '... left now has a node value');

isEq(root.getRight(), right, '... got the same node (and it is right)');
ok(root.hasRight(), '... we have a right node now');

ok(right.hasParent(), '... rights has a parent');
isEq(right.getParent(), root, '... rights parent is the root');

var leftLeft = left.left;
ok(leftLeft.meta.isa(BinaryTree));

ok(leftLeft.hasParent(), '... left does have a parent');

isEq(leftLeft.getParent(), left, '... got a parent node (and it is left)');
ok(left.hasLeft(), '... we have a left node now');
isEq(left.getLeft(), leftLeft, '... got a left node (and it is leftLeft)');

// make a left node
endTests()