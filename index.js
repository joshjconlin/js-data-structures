// todo: create library interface, point to a dist folder that
// has compiled code, figure out correct way to do this

const doubleLinkedList = require('./DoubleLinkedList');

const list = new doubleLinkedList();

list.push('test');
console.log(list);
list.push('test 2');
list.push('test 3');
list.push('test 4');
list.push('test 5');
list.push('test 6');
list.push('test 7');
console.log(list);
console.log(list.shift());
console.log(list);
list.unshift('unshift');
console.log(list);
list.map((item) => console.log(item, 'item') || item.data);
list.forEach(item => console.log('item2', item))
console.log(list.get(list.length -1));
console.log(list.get(list.length -2));
console.log(list.get(list.length -3));
console.log(list.get(list.length -4));
console.log(list.get(list.length -5));
console.log(list.get(list.length -6));
console.log(list.find((node) => node.data === 'test 6'));
console.log(list.)