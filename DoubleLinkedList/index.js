const Node = require('./Node');

class DoubleLinkedList {
    head = null;
    tail = null;
    length = 0;

    /**
     * this function traverses the entire list, awaiting the fn function 
     * to resolve for each node's data before moving onto the next node 
     * @public  
     * @param {Function} fn
     */
    async asyncTraverse(fn) {
        let node = this.head;
        let count = 0;
        while (count < this.length) {
            await fn(node.data);
            node = node.next;
            count++;
        }
    }

    /**
     * returns a new list of items transformed
     * by the fn function
     * 
     * passes the data of each node to the fn function
     * instead of the whole node itself, and creates a new node with
     * that transformed data;
     * 
     * @public
     * @param {Function} fn
     * @returns DoubleLinkedList
     */
    map(fn) {
        let node = this.head;
        let newList = new DoubleLinkedList();
        while (node !== null) {
            newList.push(fn(node.data));
            node = node.next;
        }
        return newList;
    }

    /**
     * loops through all Nodes in the list and calls the
     * fn function with their data value
     * @public
     * @param {Function} fn 
     */
    forEach(fn) {
        let node = this.head;
        while (node !== null) {
            fn(node.data);
            node = node.next;
        }
    }

    /**
     * returns data from node at index specified
     * @public
     * @param {Number} index 
     * @returns *
     */
    get(index) {
        if (index >= this.length || index < 0) {
            return undefined;
        }
        if (index === 0) {
            return this.head.data;
        }
        if (index === this.length - 1) {
            return this.tail.data;
        }
        if (index > (this.length - 1) / 2) {
            let node = this.tail
            for (let i = this.length - 1; i > index; i--) {
                node = node.prev;
            }
            return node.data;
        } else {
            let node = this.head;
            for (let i = 0; i < index; i++) {
                node = node.next;
            }
            return node.data;
        }
    }

    /**
     * get node at index
     * 
     * @public
     * @param {Number} index 
     * @returns Node
     */
    getNode(index) {
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

    /**
     * sets the data property for the Node at index specified to be the data passed
     * 
     * @public
     * @param {Number} index 
     * @param {*} data 
     * @returns Boolean
     */
    set(index, data) {
        if (index < 0 || index > this.length - 1 || !this.length) {
            return false;
        }
        const node = this.getNode(index);
        if (!node) {
            return false;
        } else {
            node.data = data;
            return true;
        }
    }

    /**
     * returns an array of all Nodes which the fn
     * function returned true for
     * 
     * @public
     * @param {Function} fn 
     * @returns Array
     */
    findAll(fn) {
        let node = this.head;
        let results = [];
        while (node) {
            if (fn(node.data)) {
                results.push(node.data);
            }
            node = node.next;
        }
        return results;
    }

    /**
     * returns the first element that the fn function
     *  returns true for else null
     * 
     * @public
     * @param {Function} fn 
     * @returns Node
     */
    find(fn) {
        let node = this.head;
        let found = null;
        while (node && !found) {
            if (fn(node.data)) {
                found = node.data;
            } else {
                node = node.next;
            }
        }
        return found;
    }

    /**
     * returns a new list containing all the Nodes for which the fn function returns true
     * 
     * @public
     * @param {Function} fn 
     * @returns DoubleLinkedList
     */
    filter(fn) {
        const list = new DoubleLinkedList();
        let node = this.head;
        while (node) {
            if (fn(node.data)) {
                list.push(node.data);
            }
            node = node.next;
        }
        return list;
    }

    /**
     * 
     * returns one value reduced with the fn function
     *  from the all the Nodes in the list
     * @public
     * @param {Function} fn 
     * @param {*} defaultValue 
     * @returns *
     */
    reduce(fn, defaultValue = 0) {
        let returnValue = defaultValue;
        if (!this.length) {
            return defaultValue;
        }
        let node = this.head;
        while (node) {
            returnValue = fn(returnValue, node.data);
            node = node.next;
        }
        return returnValue;
    }

    /**
     * reverses the order of items in the list
     * @public
     * @returns ThisType
     */
    reverse() {
        if (!this.length) {
            return this;
        }
        let newTail = this.head;
        let newHead = this.tail;
        this.head = newHead;
        this.tail = newTail;
        let node = newHead;
        let next = null;
        let prev = null;
        while (node) {
            next = node.prev;
            prev = node.next;
            node.prev = prev;
            node.next = next;
            node = next;
        }

        return this;
    }

    /**
     * 
     * inserts a new Node with the data passed at the index given
     * 
     * @public
     * @param {Number} index 
     * @param {*} data 
     * @returns Boolean
     */
    insert(index, data) {
        if (index < 0 || index > this.length) {
            return false;
        }
        if (index === 0) {
            this.unshift(data);
            return true;
        }
        if (index === this.length) {
            this.push(data);
            return true;
        }
        this.length++;
        const startFromRear = index > (this.length - 1) / 2;
        let node;
        if (startFromRear) {
            node = this.tail;
            let count = this.length - 1;
            while (count !== index - 1) { // get item before in list
                node = node.prev;
                count--;
            }
        } else {
            node = this.head;
            let count = 0;
            while (count !== index - 1) {
                node = node.next;
                count++;
            }
        }
        const next = node.next;
        node.next = new Node(data);
        node.next.next = next;
        return true;
    }

    /**
     * removes item at index, mutates current list
     * 
     * @public
     * @param {Number} index 
     * @returns Node
     */
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
        this.length--;
        const startFromRear = index > (this.length - 1) / 2;
        let node;
        if (startFromRear) {
            node = this.tail;
            let count = this.length - 1;
            while (count !== index - 1) { // get item before in list
                node = node.prev;
                count--;
            }
        } else {
            node = this.head;
            let count = 0;
            while (count !== index - 1) {
                node = node.next;
                count++;
            }
        }
        const remove = node.next;
        const next = remove.next;
        node.next = next;
        return remove;
    }

    /**
     * returns first node in the list
     * @public
     * @returns Node
     */
    first() {
        return this.head;
    }

    /**
     * returns last node in the list
     * @public
     * @returns Node
     */
    last() {
        return this.tail;
    }

    /**
     * returns true or false if the list contains an item.
     * checks for strict equality between a Node's data and the item 
     * it's passed
     * @public
     * @param {*} item 
     * @returns Boolean
     */
    contains(item) {
        return this.indexOf((node) => node.data === item) !== -1;
    }

    /**
     * 
     * returns the index of the first Node the fn function
     * returns true for
     * @public
     * @param {Function} fn
     * @returns Number
     */
    indexOf(fn) {
        let index = -1;
        if (!this.length) {
            return index;
        }

        let node = this.head;
        while (node) {
            if (fn(node)) {
                index = i;
                break;
            }
            node = node.next;
        }
        return index;
    }

    /**
     * returns weather or not list is empty
     * 
     * @public
     * @returns Boolean
     */
    isEmpty() {
        return !!this.length;
    }
    /**
     * removes all items from the list,
     * mutates the current list
     * @public
     */
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    /**
     * returns an array of node's data
     * @public
     * @returns Array
     */
    toArray() {
        const output = [];
        if (!this.length) {
            return output;
        }
        let node = this.head;
        while (node) {
            output.push(node.data);
            node = node.next;
        }
        return output;
    }

    /**
     * adds a item to the beginning of the list
     * mutates the current list
     * @public
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
     * @public
     * @returns Node
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
     * @public
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
     * @public
     * @returns Node
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