From array methods: `.find`, `.forEach` and `filter` are HOF (Higher Order Functions)

Passing a filter through the list for checked items only:
```js
const doneGoals = async () => {
    const done = goals.filter((item) => {
        return item.checked
    })
}
```

- [x] HOF Introduction

> The `...` operator can also be the "Rest" operator

The spread operator passing the entirety of the 'done' array over to the new 'choices' array:
```js
await select({
        message: "Goals Achieved:",
        choices: [...done]
    })
```

- [x] HOF `.map`

Example of a use for `.map` method, reformulating each item on the array 'goals':
```js
const unchecked = goals.map(() => {
    return { value: item.value, checked: false }
})
```
The `goals.map` calls for "reformulating" each item inside the 'goals' list, returning the original value of each item but with their `checked` status set to *false*.

- [x] `JSON.parse()` and `JSON.stringify()` 

Format of .json file:
```json
[ {
"value": "example",
"checked": false
} ]
```

Use of JSON within the project:
```js
const loadItems = async () => {
    try {
        const data = await fs.readFile("goals.json", "utf-8")
        goals = JSON.parse(data)
    }  catch(ERROR){ goals = [] }
}

const writeItems = async () => {
    await fs.writeFile("goals.json", JSON.stringify(goals, null, 2))
}
```
`JSON.parse()` will construct the object described by the string gathered from the .json file. `JSON.stringify()` is the static method that converts the JS value to JSON string, value that is being written to the 'goals.json' file in the code.