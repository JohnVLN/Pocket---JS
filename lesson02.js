// Importing 'select' and 'input' from 'inquirer' using the function 'require()'
const { select, input, checkbox } = require('@inquirer/prompts')

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

const listGoals = async () => {
    // Selection menu that copies items from the goals list to display to user
    const responses = await checkbox({
        message: "> Use the arrows to select\n> Use space to check an item off\n> Hit enter when you are done.\n",
        choices: [...goals],
        instructions: false,
    })

    if(responses.lenght == 0) {
        console.log('No items have been selected!')
        return
    }

    // Sets all items as unchecked inside selection menu, allowing to mark goals as 'not done'
    responses.forEach((g) => {
        g.checked = false
    })

    // using .forEach on the array of selected items of the list
    responses.forEach((response) => {
        // using .find to get the item that matches the same value of the selected item
        const goal = goals.find((g) => {
            return g.value == response
        })
        goal.checked = true
    })
    console.log('Goal(s) have been ticked off as Achieved!')
}

const start = async () => {
    while(true) {
        // Options given to the user in the menu
        const option = await select({
            message: 'Menu > ',
            choices: [
                {
                    name: "Add an item",
                    value: "add"
                },
                {
                    name: "List all goals",
                    value: "list"
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
            case 'list':
                await listGoals()
                break
            case 'quit':
                console.log("Till next time!")
                return
        }
    }
}
start()