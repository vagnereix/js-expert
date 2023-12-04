const { deepStrictEqual } = require('assert');

let counter = 0;
let counter2 = counter;
counter2++;

// tipo primitivo (valor) gera uma cópia em memória
console.log(counter); // 0
deepStrictEqual(counter, 0);
console.log(counter2); // 1
deepStrictEqual(counter2, 1);

const item = { counter: 0 };
const item2 = item;

/**
 * tipo não primitivo ou de referência, gera uma referência em memória
 * copiando o endereço de memória e apontando para o mesmo lugar
 * */
item2.counter++;
console.log(item.counter); // 1
deepStrictEqual(item, { counter: 1 });

item.counter++;
deepStrictEqual(item2, { counter: 2 });
console.log(item.counter); // 2
