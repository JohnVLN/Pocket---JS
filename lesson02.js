// Importing 'select' from 'inquirer' using the function 'require()'
const { select } = require('@inquirer/prompts')

const start = async () => {
    while(true) {

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
                console.log("Let's add a goal to your list.")
                break
            case 'quit':
                console.log("Till next time!")
                return
        }
    }
}
start()