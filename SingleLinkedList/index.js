const Node = require('./Node');

// todo: match DoubleLinkedList interface
class SingleLinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    async mapAsync(fn) {
        let node = this.head;
        while(node !== null) {
            node.data = await fn(node);
            node = node.next;
        } 
    }

    map(fn) {
        let node = this.head;
        while(node !== null) {
            node.data = fn(node);
            node = node.next;
        }
    }

    forEach(fn) {
        let node = this.head;
        while(node !== null) {
            fn(node);
            node = node.next;
        }
    }

    find() {

    }

    filter() {

    }

    reduce() {
        
    }

    reverse() {
        let node = this.head;
        this.head = this.tail;
        this.tail = node;
        let prev = null;
        let next = null;
        for(let i = 0; i < this.length; i++) {
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return this;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }
        let counter = 0;
        let node = this.head;
        while(counter < index) {
            node = node.next;
            counter++;
        }
        return node;
    }

    set(index, data) {
        const foundNode = this.get(index);
        if (foundNode) {
            foundNode.data = data;
            return true;
        }
        return false;
    }

    insert(index, data) {
        if (index < 0 || index > this.length) {
            return false;
        }
        if (index === this.length) {
            this.push(new Node(data));
            return true;
        }
        if (index === 0) {
            this.unshift(new Node(data));
            return true;
        }

        const node = this.get(index - 1);
        const prevNext = node.next;
        node.next = new Node(data);
        node.next.next = prevNext;
        this.length++;
        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            return undefined;
        }
        if (index === 0) {
            return this.shift();
        }
        if (index === this.length - 1) {
            return this.pop();
        }
        let previousNode = this.get(index - 1);
        const node = previousNode.next;
        let nextNode = node.next;
        previousNode.next = nextNode;
        this.length--;
        return node;
    }

    shift() {
        if (!this.head) {
            return undefined;
        }
        const currentHead = this.head;
        this.head = currentHead.next;
        this.length--;
        if (this.length === 0) {
            this.tail = null;
        }
        return currentHead;
    }

    unshift(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.length++;
            return this;
        }
        this.length++;
        const currentHead = this.head;
        this.head = newNode;
        this.head.next = currentHead;
        return this;
    }
    
    push(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            this.length++;
            return this;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
        return this;
    }

    pop() {
        if (!this.length) {
            return undefined;
        }
        let node = this.head;
        let newTail = node;
        while(node.next) {
            newTail = node;
            node = node.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return node;
    }

}

module.exports = SingleLinkedList;
