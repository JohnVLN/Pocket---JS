/* 2 ways of creating a function:
function start() {
    console.log('the function works!')
} 
and */
const start = () => {
    let count = 0
    // creating a simple loop
    while(count <= 10){
        console.log(count)
        count += 1
    }
}
start()