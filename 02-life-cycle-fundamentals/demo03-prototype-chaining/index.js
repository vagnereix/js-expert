const assert = require('assert');

const obj = {};
const arr = [];
const fn = () => {};

/**
 * Internamente, objetos literais viram funções explícitas
 * __proto__ é a referência do objeto pai que possui as propriedades nele
 * O __proto__ de Object.prototype é null, no fim tudo herda de null
 * Quando chamamos o 'new' o __proto__ do objeto criado aponta para o prototype da função construtora
 */

console.log('new Object() is {}?', new Object().__proto__ === obj.__proto__);
assert.deepStrictEqual(new Object().__proto__, obj.__proto__);

console.log(
  'obj.__proto__ === Object.prototype',
  obj.__proto__ === Object.prototype
);
assert.deepStrictEqual(obj.__proto__, Object.prototype);

console.log(
  'arr.__proto__ === Array.prototype',
  arr.__proto__ === Array.prototype
);
assert.deepStrictEqual(arr.__proto__, Array.prototype);

console.log(
  'fn.__proto__ === Function.prototype',
  fn.__proto__ === Function.prototype
);
assert.deepStrictEqual(fn.__proto__, Function.prototype);

console.log(
  'obj.__proto__.__proto__ === null',
  obj.__proto__.__proto__ === null
);

console.log('------------------------------------------');

function Employee() {}
Employee.prototype.salary = () => 'salary**';

function Supervisor() {} // Herda de Employee
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => 'profitShare**';

function Manager() {} // Herda de Supervisor
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**';

console.log(Manager.prototype.salary()); // salary**
// console.log(Manager.salary()); // undefined

/**
 * Se não chamar o 'new', o primeiro __proto__ vai ser sempre a instância de Function
 * Ou seja, vai apontar para Function.prototype e não para Employee.prototype como queremos
 * Para acessar as classes sem o 'new', podemos acessar diretamente via prototype
 */

assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

console.log(
  'manager.__proto__: %s, manager.salary(): %s',
  new Manager().__proto__,
  new Manager().salary()
);

const manager = new Manager();
console.log('manager.salary()', manager.salary()); // salary**
console.log('manager.profitShare()', manager.profitShare()); // profitShare**
console.log('manager.monthlyBonuses()', manager.monthlyBonuses()); // monthlyBonuses**

console.log('------------------------------------------');

console.log(
  'Manager.prototype === new Manager().__proto__',
  Manager.prototype === new Manager().__proto__
);

console.log(
  'Manager.prototype.__proto__ === Supervisor.prototype',
  Manager.prototype.__proto__ === Supervisor.prototype
); // true
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

console.log(
  'Manager.prototype.__proto__.__proto__ === Employee.prototype',
  Manager.prototype.__proto__.__proto__ === Employee.prototype
); // true
assert.deepStrictEqual(
  Manager.prototype.__proto__.__proto__,
  Employee.prototype
);

console.log(
  'Manager.prototype.__proto__.__proto__.__proto__ === Object.prototype',
  Manager.prototype.__proto__.__proto__.__proto__ === Object.prototype
); // true
assert.deepStrictEqual(
  Manager.prototype.__proto__.__proto__.__proto__,
  Object.prototype
);

console.log(
  'Manager.prototype.__proto__.__proto__.__proto__.__proto__ === null)',
  Manager.prototype.__proto__.__proto__.__proto__.__proto__ === null
); // true
assert.deepStrictEqual(
  Manager.prototype.__proto__.__proto__.__proto__.__proto__,
  null
);

console.log('------------------------------------------');

class T1 {
  ping() {
    return 'ping';
  }
}

class T2 extends T1 {
  pong() {
    return 'pong';
  }
}

class T3 extends T2 {
  shoot() {
    return 'shoot';
  }
}

const t3 = new T3();

console.log(
  't3 inherits null?',
  t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null
); // true
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);

console.log('t3.ping()', t3.ping()); // ping
console.log('t3.pong()', t3.pong()); // pong
console.log('t3.shoot()', t3.shoot()); // shoot

console.log('------------------------------------------');

console.log('t3.__proto__ === T3.prototype', t3.__proto__ === T3.prototype); // true
assert.deepStrictEqual(t3.__proto__, T3.prototype);

console.log(
  't3.__proto__.__proto__ === T2.prototype',
  t3.__proto__.__proto__ === T2.prototype
); // true
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);

console.log(
  't3.__proto__.__proto__.__proto__ === T1.prototype',
  t3.__proto__.__proto__.__proto__ === T1.prototype
); // true
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);

console.log(
  't3.__proto__.__proto__.__proto__.__proto__ === Object.prototype',
  t3.__proto__.__proto__.__proto__.__proto__ === Object.prototype
); // true
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);

console.log(
  't3.__proto__.__proto__.__proto__.__proto__.__proto__ === null',
  t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null
); // true
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);
