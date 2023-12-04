# 02 — Conceitos fundamentais de Ciclo de Vida

## Use Strict

- Objetivo de evitar erros semânticos no `JavaScript`;
- O use strict é utilizado por padrão por transpiladores como `TypeScript` e `Babel` e é essencial para evitar erros em produção de forma inesperada;
- Adiciona uma string (`'use strict'`) no início de cada arquivo e o compilador valida essas regras evitando erros diversos;
- Escrever código `JS` sempre em `strict mode`.

## Call Stack

O `JS` utiliza mecanismos para saber a sequência de eventos de um programa e principalmente mecanismos eficientes para guardar dados em memória.

- O `Call Stack` nada mais é do que uma pilha de operações onde é armazenada a sequência de ações que o programa vai executar linha por linha.
- Usado para guardar as execuções futuras de execução dos nosso programas seguindo a estrutura de dados `Pilha`, com o padrão `FILO`;
  - Adiciona a chamada da função no topo da pilha;
  - A executa;
  - Então a remove logo depois que todo o código foi executado.
- Já que as chamadas do JS acontecem de forma assíncrona, ela utiliza o `Call Stack` para entender como executar essa quantidade de instruções de forma ordenada;
- O Call Stack` é basicamente uma tabela co dois valores (chave e valor), onde a chave é o endereço de memória e o valor pode ser um tipo primitivo de dado ou um apontamento para outro endereço em memória;
- Onde todos os valores de tipos primitivos como string, big int, boolean, undefined e symbol são armazenados;
- Resumindo, o `Call Stack` é a pilha de execução de funções.

## Memory Heap

A pilha de memória é o lugar onde são armazenados os endereços de memória que podem ser apontados pelo `Call Stack` para trabalhar os valores de variáveis, funções, objetos, arrays e etc.

- A grande diferença entre um e outro do ponto de vista de armazenamento é que o `Call Stack` guarda dados de tipo de valor primitivo, enquanto o `Memory Heap` guarda dados de tipos de referência que podem crescer dinamicamente, como funções, arrays e outros;
- Resumindo, o `Memory Heap` é a pilha de memória para guardar os dados de tipo de referência.

```js
// Exemplos de Call Stack e Memory Heap

let counter = 0;
let counter2 = counter;
counter2++;

// tipo primitivo (valor) gera uma cópia em memória
console.log(counter); // 0

const item = { counter: 0 };
const item2 = item;

/**
 * tipo não primitivo ou de referência, gera uma referência em memória
 * copiando o endereço de memória e apontando para o mesmo lugar
 * */
item2.counter++;
console.log(item.counter); // 1
item.counter++;
console.log(item.counter); // 2
```

## Coerção de tipos ou conversão de tipos

Conceito bastante utilizado pelo `JS` para explicar os comportamentos bizarros da linguagem.

- Processo de conversão de um valor para qualquer outro tipo;
  - Como converter uma string para um number, uma expressão para um boolean;
  - Qualquer tipo de dado está sujeito a coerção;
  - Só existem 3 tipo de conversão no fim, no final o valor será string, number ou boolean;
  - A lógica de coerção entre Objects e tipos primitivos é diferente, mas de qualquer forma só podem ser convertidas a essas 3 formas.
- Existem apenas dois tipos de coerção, a `Explícita` para quando você força a coerção explicitamente via código, e a `Implícita`, geralmente usada com operadores, quando somamos uma `string` com um `number`, quando fazemos um `if` em uma variável não `booleana` e etc;
  - A coerção `Implícita` também acontece quando usamos um loose equality operator (`==`) ao invés do strict equality operator (`===`).

```js
// Exemplos de coerções bizarras no JS

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
```

## Prototype Chain

Em `JavaScript`, a herança é realizada através do `Prototype`, ou herança de protótipos.
Quando tentamos procurar pela existência em alguma propriedade em um objeto, o motor do `JS` vai primeiro verificar o objeto para ver se aquela propriedade existe, caso não exista ele vai então olhar o prototype do objeto, caso também não exista ele vai olhar no prototype do prototype, dessa forma ele vai procurar em todas as instâncias que foram herdadas até o último prototype for igual a `null`, chegando nesse caso e não encontrando a propriedade, ele retorna `undefined`.

```js
// Exemplos de Prototype Chaining no JS

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

console.log(t3.__proto__ === T3.prototype); // true
console.log(t3.__proto__.__proto__ === T2.prototype); // true
console.log(t3.__proto__.__proto__.__proto__ === T1.prototype); // true
console.log(t3.__proto__.__proto__.__proto__.__proto__ === Object.prototype); // true
console.log(t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null); // true
```
