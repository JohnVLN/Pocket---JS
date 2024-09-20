// Continuation of lesson 02

const { select, input, checkbox } = require('@inquirer/prompts')

let item = {
    value: 'Run once a week',
    checked: false,
}
let goals = [ item ]

// Function for adding items to list
const addGoal = async () => {
    const goal = await input({ message: "Write down a new goal... \n> " })

    if(goal.length == 0) {
        console.log('The slot cannot be empty')
        return
    }

    // Push user input into the goals list
    goals.push({
        value: goal, checked: false
    })
}

// Function for listing items to user
const listGoals = async () => {
    const responses = await checkbox({
        message: "> Use the arrows to select\n> Use space to check an item off\n> Hit enter when you are done.\n",
        choices: [...goals],
        instructions: false,
    })

    // Sets all items as unchecked inside selection menu, allowing to mark goals as 'not done'
    goals.forEach((g) => {
        g.checked = false
    })

    if(responses.lenght == 0) {
        console.log('No items have been selected!')
        return
    }

    responses.forEach((response) => {
        // using .find to get the item that matches the same value of the selected one
        const goal = goals.find((g) => {
            return g.value == response
        })
        goal.checked = true
    })
    console.log('Goal(s) have been ticked off as Achieved!')
}

// Function for listing all items marked as 'done'
const doneGoals = async () => {
    // Filter function inserts all items marked as checked for displaying to the user
    const done = goals.filter((item) => {
        return item.checked
    })

    // For no items marked as checked
    if(done.length == 0) {
        console.log("No goals have been chieved!")
        return
    }

    await select({
        message: "Goals Achieved:" + done.length,
        choices: [...done]
    })
}

const ongoingGoals = async () => {
    const ongoing = goals.filter((item) => {
        return !item.checked
    })

    if(ongoing.length == 0) {
        console.log("You need to add more goals :)")
    }

    await select({
        message: "Ongoing Goals: " + ongoing.length,
        choices: [...ongoing]
    })
}

const start = async () => {
    while(true) {
        // Options given to the user in the menu
        const option = await select({
            message: '\nMenu > ',
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
                    name: "Show achieved goals",
                    value: "done"
                },
                {
                    name: "Show ongoing goals",
                    value: "ongoing"
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
            case 'done':
                doneGoals()
                break
            case 'ongoing':
                ongoingGoals()
                break
            case 'quit':
                console.log("Till next time!")
                return
        }
    }
}
start()