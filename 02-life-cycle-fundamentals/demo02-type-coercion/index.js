true + 2; // 3
true - 2; // -1
'21' + true; // '21true'
'21' - true; // 20
9999999999999999; // 10000000000000000
0.1 + 0.2 === 0.3; // false
3 > 2; // true
2 > 1; // true
3 > 2 > 1; // false
'21' - -1; // 22
'1' == 1; // true
'1' === 1; // false
3 > 2 >= 1; // true
'B' + 'a' + +'a' + 'a'; // 'BaNaNa'

console.assert(String(123) === '123', 'explicit conversion to string');
console.assert(123 + '' === '123', 'implicit conversion to string');

// if (null || 1) console.log('true'); // true
// if ('hello' || 1) console.log('true'); // true

const test = 'hello' || 1;
// console.log(test); // 'hello'

// if (test) console.log('true'); // true

console.assert(
  ('hello' || 123) === 'hello',
  '|| returns the first element if both are true'
);
console.assert(
  ('hello' && 123) === 123,
  '&& returns the last element if both are true'
);
/**
 * Todas essas operações acima sempre retornam um valor e o if faz
 * a conversão para boolean implicitamente
 */

const item = {
  name: 'Vagner',
  age: 25,
  // Se for string ou primitivo, chama primeiro o toString, se não chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  // Se for number, chama primeiro o valueOf, se não chama o toString
  valueOf() {
    return { hey: 'dude' };
  },
  // Tem prioridade sobre o toString e valueOf
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to', coercionType);

    const types = {
      string: JSON.stringify(this),
      number: '0007',
    };

    return types[coercionType] || types.string;
  },
};

/**
 * Without toString method: 'item [object Object]0'
 * With toString method: 'item Name: Vagner, Age: 250'
 */
// console.log('item', item + 0);

// console.log('item', ''.concat(item)); // 'item Name: Vagner, Age: 25'
// console.log(String(item)); // 'Name: Vagner, Age: 25'

/**
 * Retorna NaN porque o valueOf retorna um objeto, em seguida o
 * toString é chamado e não consegue converter o objeto para number
 */
// console.log(Number(item)); // NaN

// Após adicionar o Symbol.toPrimitive
// console.log(String(item)); // '{"name":"Vagner","age":25}'
// console.log(Number(item)); // 7
// Chama a conversão default
// console.log(new Date(item)); // Invalid Date

console.assert(!!item);
console.assert(item + 0 === '{"name":"Vagner","age":25}0');
console.assert('item '.concat(item) === 'item {"name":"Vagner","age":25}');
console.assert(item == String(item));

const item2 = { ...item, name: 'Reis' };
console.assert(item2.name === 'Reis' && item.name === 'Vagner');
