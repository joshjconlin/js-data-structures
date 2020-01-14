const assert = require('assert');
const { DoubleLinkedList } = require('../index');
const Node = require('../DoubleLinkedList/Node');

describe('It correctly performs all double linked list actions', () => {

    it('pushs an element onto the list', () => {
        const list = new DoubleLinkedList();

        list.push('new item');

        assert.strictEqual(list.length, 1);
        assert.strictEqual(list.head.data, 'new item');
    });

    // todo: how to test this better?
    it('async traverses', async () => {
        const list = new DoubleLinkedList();

        list.push(1);
        list.push(2);
        list.push(3);
        list.push(4);
        list.push(5);

        let count = 1;
        let results = [];

        await list.asyncTraverse(async (data) => {
            await new Promise((resolve) => {
                setTimeout(() => {
                    results.push(1);
                    assert.strictEqual(results.length, count);
                    count++;
                    resolve();
                }, 1000);
            });
        });
    }).timeout(6000);

    it('maps correctly over a list and returns a new list', () => {
        const list = new DoubleLinkedList();
        list.push(0);
        list.push(1);
        list.push(2);
        const newList = list.map((data) => data += 1);
        assert.deepEqual(newList.toArray(), [1, 2, 3]);
        assert.notStrictEqual(newList, list);
    });

    it('loops through the list with forEach', () => {
        const list = new DoubleLinkedList();
        list.push(1);
        list.push(2);
        list.push(3);
        list.forEach((data) => {
            assert.ok(data);
            assert.strictEqual(typeof data, 'number');
        })
    });

    it('gets an item at an index', () => {
        const list = new DoubleLinkedList();
        assert.strictEqual(list.get(1), undefined);
        list.push(1);
        list.push(2);
        list.push(3);
        assert.strictEqual(list.get(0), 1);
        assert.strictEqual(list.get(1), 2);
        assert.strictEqual(list.get(2), 3);
    });

    it('gets a node at an index', () => {
        const list = new DoubleLinkedList();
        list.push(1);
        assert.ok(list.getNode(0) instanceof Node)
        assert.strictEqual(list.getNode(0).data, 1);
    });

    it('sets an item at an index', () => {
        const list = new DoubleLinkedList();
        list.push(1);
        list.push(2);
        list.push(3);
        assert.strictEqual(true, list.set(2, 4));
        assert.strictEqual(4, list.get(2))
    });

    it('finds all instances of a number in the list', () => {
        const list = new DoubleLinkedList();
        list.push(1);
        list.push(2);
        list.push(1);
        list.push(3);
        list.push(1);
        const results = list.findAll((data) => {
            return data === 1;
        });
        assert.strictEqual(results.length, 3);
        assert.deepEqual(results, [1, 1, 1]);
    });

    it('finds the first instance of a number in a list', () => {
        const list = new DoubleLinkedList();
        list.push(2);
        list.push(1);
        list.push(3);
        assert.strictEqual(list.find((data) => data === 1), 1);
    });

    it('correctly filters a list', () => {
        const list = new DoubleLinkedList();
        list.push(1);
        list.push('1');
        list.push(2);
        list.push('2');
        assert.deepEqual(list.filter((data) => typeof data === 'string').toArray(), ['1', '2']);
    });

    it('reverses a list', () => {
        const list = new DoubleLinkedList();
        list.push(1);
        list.push(2);
        list.push(3);

        list.reverse();

        const first = list.first();

        assert.strictEqual(first.prev, null);
        assert.notStrictEqual(first.next, null);

        const last = list.last();

        assert.strictEqual(last.next, null);
        assert.notStrictEqual(last.prev, null);
        assert.deepEqual(list.toArray(), [3, 2, 1]);
    });

    // reduce
    // insert
    // remove
    // first
    // last
    // contains
    // indexOf
    // isEmpty
    // clear
    // toArray
    // unshift
    // shift
    // pop
})