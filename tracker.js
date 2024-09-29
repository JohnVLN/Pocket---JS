// Project already finished, a cleanup of 'lesson03.js'
// 

const { select, input, checkbox } = require('@inquirer/prompts')
const fs = require("fs").promises // for handling JSON

let goals = []
let feedback = "Wellcome!"

// Function to load items stored by the user in the 'goals.json' file
const loadItems = async () => {
    try {
        const data = await fs.readFile("goals.json", "utf-8")
        goals = JSON.parse(data) // parsees nd inserts the data in the list
    } 
    catch(ERROR) { goals = [] } // in case of error, passes an empty list again
}

// Function to write the user input into the 'goals.json' file
const writeItems = async () => {
    // Converting the JS values into JSON string
    await fs.writeFile("goals.json", JSON.stringify(goals, null, 2))
}

// Function for adding items to list
const addGoal = async () => {
    const goal = await input({ message: "Write down a new goal... \n> " })

    if(goal.length == 0) {
        feedback = "The field cannot be empty!"
        return
    }

    // Pushes user input into the goals list
    goals.push({
        value: goal, checked: false
    })
    feedback = "Your new goal was added to the tracker!"
}

// Function for listing items to user
const listGoals = async () => {
    // If else logic applied only to show list if it is not empty 
    if(goals.length != 0) {
        const responses = await checkbox({
            message: "> Use the arrows to select\n> Use space to check an item off\n> Hit enter when you are done.\n",
            choices: [...goals],
            instructions: false, // custom set of instructions was already passed on 'message'
        })

        if(responses.lenght == 0) {
            feedback = "No items have been selected!"
            return
        }

        goals.forEach((g) => {
            g.checked = false
        })

        responses.forEach((response) => {
            // Searching for the item in 'goals' that matches the value of the selected one
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

// Function for listing all items that have been checked
const doneGoals = async () => {
    // Filters for items marked as checked
    const done = goals.filter((item) => {
        return item.checked
    })

    if(done.length == 0) {
        feedback = "No goals have been achieved!"
        return
    }

    await select({
        message: "Goals Achieved: " + done.length,
        choices: [...done]
    })
}

// Function to list all items still unchecked
const ongoingGoals = async () => {
    const ongoing = goals.filter((item) => {
        return !item.checked // logic for returning only when 'checked' is different from true
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
    // Using .map method for passing the 'checked' boolean on all items as false
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
    feedback = "Goals were successfully deleted from the tracker!"
}

const consoleWork = () => {
    console.clear(); // clearing the console (ctrl + l) each time the user finishes an action
    if(feedback != "") {
        console.log(feedback + '\n') // displaying the messages for each action
        feedback = ""
    }
}

const start = async () => {
    await loadItems() // json file being read every time the program starts

    while(true) {
        consoleWork()
        await writeItems() // json file is being written each beggining of the loop

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