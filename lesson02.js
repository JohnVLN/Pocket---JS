// Importing 'select' and 'input' from 'inquirer' using the function 'require()'
const { select, input } = require('@inquirer/prompts')

// Example of item
let item = {
    value: 'Run once a week',
    checked: false,
}
// List of goals (items)
let goals = [ item ]

const addGoal = async () => {
    const goal = await input({ message: "Write down a new goal... \n> " })

    // In case the user does not input anything
    if(goal.length == 0) {
        console.log('The slot cannot be empty')
        return
    }

    // Push user input into the goals list
    goals.push({
        value: goal, checked: false
    })
}

const start = async () => {
    while(true) {
        // Options given to the user in the menu
        const option = await select({
            message: 'Menu > ',
            choices: [
                {
                    name: "Add an item.",
                    value: "add"
                },
                {
                    name: "Quit",
                    value: "quit"
                }
            ]
        })

        switch(option){ 
            case 'add':
                await addGoal()
                console.log(goals)
                break
            case 'quit':
                console.log("Till next time!")
                return
        }
    }
}
start()