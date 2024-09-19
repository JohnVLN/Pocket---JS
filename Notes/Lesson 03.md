From array methods: `.find`, `.forEach` and `filter` are HOF (Higher Order Functions)

Passing a filter through the list for checked items only:
```js
const doneGoals = async () => {
    const done = goals.filter((item) => {
        return item.checked
    })
}
```

- [x] HOF Wrap up

> The `...` operator can also be the "Rest" operator

The spread operator passing the entirety of the 'done' array over to the new 'choices' array:
```js
await select({
        message: "Goals Achieved:",
        choices: [...done]
    })
```