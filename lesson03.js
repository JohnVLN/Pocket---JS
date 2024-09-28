const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises

let goals = []
let feedback = "Wellcome!"

const loadItems = async () => {
    try {
        const data = await fs.readFile("goals.json", "utf-8")
        goals = JSON.parse(data)
    }  catch(ERROR){ goals = [] }
}

const writeItems = async () => {
    await fs.writeFile("goals.json", JSON.stringify(goals, null, 2))
}

// Function for adding items to list
const addGoal = async () => {
    const goal = await input({ message: "Write down a new goal... \n> " })

    if(goal.length == 0) {
        feedback = "The slot cannot be empty"
        return
    }

    // Push user input into the goals list
    goals.push({
        value: goal, checked: false
    })
    feedback = "A new goal was added to the tracker!"
}

// Function for listing items to user
const listGoals = async () => {
    // If else logic applied only to list if the list has items inside 
    if(goals.length != 0) {
        const responses = await checkbox({
            message: "> Use the arrows to select\n> Use space to check an item off\n> Hit enter when you are done.\n",
            choices: [...goals],
            instructions: false,
        })

        if(responses.lenght == 0) {
            feedback = "No items have been selected!"
            return
        }

        // Sets all items as unchecked inside selection menu, allowing to mark goals as 'not done'
        goals.forEach((g) => {
            g.checked = false
        })

        responses.forEach((response) => {
            // using .find to get the item that matches the same value of the selected one
            const goal = goals.find((g) => {
                return g.value == response
            })
            goal.checked = true
        })
        feedback = "Goal(s) have been ticked off as Achieved!"
    } else {
        feedback = "Your list is empty!\nAdd more goals to your tracker"
    }
}

// Function for listing all items marked as 'done'
const doneGoals = async () => {
    // Filter function inserts all items marked as checked for displaying to the user
    const done = goals.filter((item) => {
        return item.checked
    })

    // For no items marked as checked
    if(done.length == 0) {
        feedback = "No goals have been achieved!"
        return
    }

    await select({
        message: "Goals Achieved:" + done.length,
        choices: [...done]
    })
}

// Function to list all items still unchecked
const ongoingGoals = async () => {
    const ongoing = goals.filter((item) => {
        return !item.checked
    })

    if(ongoing.length == 0) {
        feedback = "You need to add more goals to your tracker :)"
        return
    }

    await select({
        message: "Ongoing Goals: " + ongoing.length,
        choices: [...ongoing]
    })
}

// Function for deleting items from the list
const deleteGoals = async () => {
    // Using .map function to return all items unchecked
    const unchecked = goals.map((item) => {
        return { value: item.value, checked: false }
    })

    const responses = await checkbox({
        message: "> Use the arrows to select\n> Use space to check an item off\n> Hit enter when you are done.\n",
        choices: [...unchecked],
        instructions: false,
    })

    if(responses.length == 0) {
        feedback = "No items have been selected!"
        return
    }

    responses.forEach((meta) => {
        goals = goals.filter((item) => {
            return item.value != meta
        })
    })
    feedback = "Items were successfully deleted!"
}

const consoleWork = () => {
    console.clear();
    if(feedback != "") {
        console.log(feedback + '\n')
        feedback = ""
    }
}

const start = async () => {
    await loadItems()

    while(true) {
        consoleWork()
        await writeItems()

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
                    name: "Show achieved goals",
                    value: "done"
                },
                {
                    name: "Show ongoing goals",
                    value: "ongoing"
                },
                {
                    name: "Delete",
                    value: "delete"
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
                await doneGoals()
                break
            case 'ongoing':
                await ongoingGoals()
                break
            case 'delete':
                await deleteGoals()
                break
            case 'quit':
                console.log("Till next time!")
                return
        }
    }
}
start()