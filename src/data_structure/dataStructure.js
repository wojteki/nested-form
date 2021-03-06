export class Tree {
    constructor() {
        this.root = {
            id: 'rootNode',
            children: []
        };
    }

    returnNodeClass() {
        return class {
            constructor(data) {
                this.id = data.id;
                this.data = {
                    question: data.question,
                    type: data.type,
                    parentType: data.parentType,
                    condition: data.condition,
                    conditionValue: data.conditionValue,
                    anchorLevel: data.anchorLevel
                };
                this.parent = null;
                this.children = [];
            }
        };
    }

    traverseBF(callback) {
        const arr = [this.root];

        while (arr.length) {
            const node = arr.shift();

            arr.push(...node.children);
            callback(node);
        }
    }

    traverseDF(callback) {
        const arr = [this.root];

        while (arr.length) {
            const node = arr.shift();

            arr.unshift(...node.children);
            callback(node);
        }
    }

    contains(callback, traversal) {
        traversal.call(this, callback);
    }

    add(data, toParentId, traversal) {
        const Node = this.returnNodeClass();
        const child = new Node(data);
        let parent = null;

        this.contains(function(node) {
            if (node.id === toParentId) {
                parent = node;
            }
        }, traversal);

        if (parent) {
            parent.children.push(child);
            child.parent = parent;
        } else {
            throw new Error('Cannot add node to a non-existent parent.');
        }
    }

    remove(childId, parentId, traversal) {
        let parent = null,
            childToRemove = null,
            index;

        const findIndex = function(arr, childId) {
            var index;

            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id === childId) {
                    index = i;
                }
            }

            return index;
        };

        this.contains(function(node) {
            if (node.id === parentId) {
                parent = node;
            }
        }, traversal);

        if (parent) {
            index = findIndex(parent.children, childId);

            if (index === undefined) {
                throw new Error('Node to remove does not exist.');
            } else {
                childToRemove = parent.children.splice(index, 1);
            }
        } else {
            throw new Error('Parent does not exist.');
        }

        return childToRemove;
    }
}
