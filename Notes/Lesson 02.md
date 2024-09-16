## Repetition Structures

### - [x] While
Exemple:
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

