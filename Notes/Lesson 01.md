### Data Handling
Examples of data:
- strings - “Crab” ‘Whale’
- number - 5  8.0  -90.5:
    - Infinity
    - NaN (Not a Number)
- boolean - true or false
- null
- undefined
- object:
    - Array
- function
To find out what is the type of a variable you can use `typeof 'var_name'`

Line of code could be global or local, local code is nested inside isolated `{}`
```js
const message = "Hi, send help"

// local variable and function call are isolated
{ const message = "Hello world"
console.log(message) }

console.log(message)
```

Making lists and concatenation with arrays:
```js
let exemple = ["owl", "rat"]
console.log("The " + exemple[0] + " eats the " + exemple[1])
```

Below, creating a "goal" object:
```js
let goal = {
    value: 'read a book a month',
    checked: false,
    //method inside object
    log: (info) => {
        console.log(info)
    }
}
//calling the `log` method from `goal` object
goal.log(goal.value)
```

