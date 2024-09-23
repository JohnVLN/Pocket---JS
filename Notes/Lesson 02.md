## Repetition Structures

### - [x] While 
Example:
```js
const start = () => {
    let count = 0
    // creating a simple loop
    while(count <= 10){
        console.log(count)
        count += 1
    }
}
start()
```
While loop inside `start` function that prints from 0 to 10 in the console.

While structure with a **Switch Case** inside:
```js
const start = () => {
    while(true) {
        let option = 'add'
        switch(option){
            case 'add':
                //infinite loop
                console.log("Let's add a goal to your list.")
                break
            case 'quit':
                break
        }
    }
}
start()
```

> To terminate a process from within the terminal, press `Ctrl + C`.

### - [x] Modules
Importing the method `select` from module `inquirer` using the function `require()`:
```js
const { select } = require('@inquirer/prompts')
const start = async () => {

    while(true) {
        const option = await select({
            message: 'Menu > ',
            choices: [
                {
                    name: "Add an item.",
                    value: "add" },
                {
                    name: "Quit",
                    value: "quit" }
            ]
        })

        switch(option){
            case 'add':
                console.log("Let's add a goal to your list.")
                break
            case 'quit':
                console.log("Till next time!")
                return
        }
    }
}
start()
```

- [x] Use of asynchronous functions (async/await)
- [x] Comparison Operator
- [x] Lists and Push method

Use the `.push` method to create a basic function that adds the user input from 'goal' into the 'goals' list:
```js
let item = {
    value: 'Run once a week',
    checked: false,
}

let goals = [ item ]

const addGoal = async () => {
    const goal = await input({ message: "Write down a new goal... \n> " })
    if(goal.length == 0) {
        console.log('The slot cannot be empty')
        return
    }

    goals.push({
        value: goal, checked: false
    })
}
```

- [x] Spread Operator

Basic diagram explaining the loop ran in the lesson.
![[Pasted image 20240916171506.png]]
- [x] `.push`, `.find` and `.forEach` methods for Arrays

> JavaScript can transform anything into an object.

