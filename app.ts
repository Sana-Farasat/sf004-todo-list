#! /usr/bin/env node
//Shebang

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.blueBright('\t\t<<<<<<<<============>>>>>>>>\t\t'));
console.log(chalk.blueBright('\t\t<===Welcome to Todo-List===>\t\t'));
console.log(chalk.blueBright('\t\t<<<<<<<<============>>>>>>>>\t\t'));

let todolist : string[] = [];
let condition = true;

//Arrow Functions

//Main function 
let main = async()=>{
    while(condition){
        let option=await inquirer.prompt(
            {
                name: 'choice',
                type: 'list',
                message: chalk.blueBright('\n What do you want to do?'),
                choices:['Add Task','Delete Task','Update Task','View Todo List','Exit']
            }
        )
        if(option.choice === 'Add Task'){
                 await addTask();
        }else if(option.choice === 'Delete Task'){
                 await deleteTask();
        }else if(option.choice === 'Update Task'){
                 await updateTask();
        }else if(option.choice === 'View Todo List'){
                  await viewTask();
        }else if(option.choice === 'Exit'){
            condition =false;
            console.log(chalk.blueBright('\n\n\t\t<<<<<<<<============>>>>>>>>\t\t'));
        }
        
    }
}

//Function to add new task to the list
let addTask = async () => {
    let newTask = await inquirer.prompt(
        {
            name: 'task',
            type: 'input',
            message: chalk.blueBright('\n Enter your new task:')
        }
    )
    todolist.push(newTask.task)
    console.log(chalk.yellowBright(`\n ${newTask.task} task added successfully in Todo-List \n`));
}
//Function to view all todo list task
let viewTask = async() => {
    console.log(chalk.yellowBright('\n Your Todo-List \n'));
    todolist.forEach((task,index)=>{
    console.log(`${index +1}: ${task}`)
    });
}
//Function to delete task from the list
let deleteTask = async () =>{
    await viewTask()
    let removingTask = await inquirer.prompt(
        {
            name: 'removed',
            type: 'input',
            message: chalk.blueBright('\n Enter your index number which you want to delete:')
        }
    )
    let deleted =todolist.splice(removingTask.removed -1, 1);
    console.log(chalk.yellowBright(`\n ${deleted} this task has been successfully deleted from your Todo-List`)); 
}
//Function to update a task
let updateTask = async()=>{
     await viewTask()
  let update_task_index = await inquirer.prompt([
    {
        name:'index',
        type: 'number',
        message: chalk.blueBright("\n Enter the 'index number' of the task you want to update:")
    },
    {
        name: 'new_task',
        type: 'input',
        message: chalk.blueBright('\n Now enter new task name:')
    }
])
todolist[update_task_index.index-1] = update_task_index.new_task;
console.log(chalk.yellowBright(`\n Task at index no. ${update_task_index.index} updated successfully [To check updated Todo-List check option "View Todo List"]`));
}

//Calling function
main();

