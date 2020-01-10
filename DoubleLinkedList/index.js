const Node = require('./Node');

// todo: return new lists with map, etc, don't mutate, document that
// todo: fix all doc params

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * 
     * @param {function} predicate 
     * @returns {DoubleLinkedList}
     */
    // todo: this is wrong
    async mapAsync(predicate) {
        let node = this.head;
        while (node !== null) {
            node.data = await predicate(node);
            node = node.next;
        }
        return this;
    }

    /**
     * 
     * @param {function} predicate 
     * @returns {DoubleLinkedList}
     */
    map(predicate) {
        let node = this.head;
        while (node !== null) {
            node.data = predicate(node);
            node = node.next;
        }
        return this;
    }

    forEach(predicate) {
        let node = this.head;
        while (node !== null) {
            predicate(node);
            node = node.next;
        }
    }

    get(index) {
        if (index >= this.length || index < 0) {
            return undefined;
        }
        if (index === 0) {
            return this.head;
        }
        if (index === this.length - 1) {
            return this.tail;
        }
        if (index > (this.length - 1) / 2) {
            let node = this.tail
            for (let i = this.length - 1; i > index; i--) {
                node = node.prev;
            }
            return node;
        } else {
            let node = this.head;
            for (let i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        }
    }

    /*
        @param index: int
        @param data: *
    */
    set(index, data) {
        const node = this.get(index);
        if (!node) {
            return false;
        } else {
            node.data = data;
            return true;
        }
    }

    /*
    @param predicate: function
    @return array
    */
    findAll(predicate) {
        let node = this.head;
        let results = [];
        while (node) {
            if (predicate(node)) {
                results.push(node);
            }
            node = node.next;
        }
        return results;
    }

    /**
     * returns the first element that the predicate function
     *  returns true for else null
     * 
     * @param {function} predicate 
     * @returns {Node}
     */
    find(predicate) {
        let node = this.head;
        let found = null;
        while (node) {
            if (predicate(node)) {
                found = node;
                break;
            } else {
                node = node.next;
            }
        }
        return found;
    }

    /**
     * 
     * @param {function} predicate 
     * @returns {DoubleLinkedList}
     */
    filter(predicate) {
        const list = new DoubleLinkedList();
        const node = this.head;
        while (node) {
            if (predicate(node)) {
                list.push(node.data);
            }
            node = node.next;
        }
        return list;
    }

    reduce() {

    }

    reverse() {

    }

    insert() {

    }

    remove() {

    }

    first() {

    }

    last() {

    }

    contains() {

    }

    indexOf() {

    }

    isEmpty() {

    }

    clear() {

    }

    /**
     * returns an array of {Nodes}
     * @returns {Array}
     */
    toArray() {

    }

    /**
     * adds a item to the beginning of the list
     * mutates the current list
     * @param {*} data 
     */
    unshift(data) {
        const newNode = new Node(data);
        if (!this.length) {
            this.length++;
            this.head = newNode;
            this.tail = newNode;
            return this;
        } else {
            this.length++;
            const head = this.head;
            head.prev = newNode;
            newNode.next = head;
            this.head = newNode;
        }
    }

    /**
     * removes an item from the beginning of the list
     * mutates the list
     * 
     * @returns {Node}
     */
    shift() {
        if (!this.length) {
            return undefined;
        }
        const head = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
            this.length--;
            return head;
        }
        this.length--;
        this.head = head.next;
        this.head.prev = null;
        return head;
    }

    /**
     * adds an item to the end of the list
     * mutates the current list
     * 
     * @param {*} data 
     */
    push(data) {
        const newNode = new Node(data);
        this.length++;
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            const previousTail = this.tail;
            previousTail.next = newNode;
            newNode.prev = previousTail;
            this.tail = newNode;
        }
    }

    /**
     * remove an element from the end of the list
     * mutates the current list
     * @returns {Node}
     */
    pop() {
        if (!this.tail) {
            return undefined;
        }
        if (this.length === 1) {
            this.length--;
            const tail = this.tail;
            this.head = null;
            this.tail = null;
            return tail;
        }
        this.length--;
        const prev = this.tail.prev
        const tail = this.tail;
        prev.next = null;
        this.tail = prev;
        return tail;
    }
}

module.exports = DoubleLinkedList;