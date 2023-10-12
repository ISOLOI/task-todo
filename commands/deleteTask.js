import inquirer from "inquirer";
import Todos from '../schema/TodoSchema.js'
import {connectDB, disconnectDB} from '../db/connectDB.js'
import ora from "ora";
import chalk from "chalk";
import { disconnect } from "mongoose";

export async function getTaskCode() {
    try {
        const answers = await inquirer.prompt([
            {name: 'code', 'message': 'enter the code of the todo: ', type: 'input'},
        ])

        //trimming any starting or trailing whitespace in user response
        answers.code = answers.code.trim()

        return answers
    } catch (err) {
        console.log('Something went wrong', err)
    }
}

export default async function deleteTask() {
    try {
        //obtain code provided by user
        const userCode = await getTaskCode()
        
        // connect to db
        await connectDB()

        // start the spinner
        const spinner = ora('Finding and deleting the todo...').start()

        // delete task
        const response = await Todos.deleteOne({code: userCode.code})

        // stop spinner
        spinner.stop()

        //check delete op
        if(response.deletedCount == 0) {
            console.log(chalk.redBright('Could not find any todo matching the provided name. Deletion failed.'))
        } else {
            console.log(chalk.greenBright('Deleted Task Successfully'))
        }

        //disconnect db
        await disconnectDB()
    } catch(err) {
        console.log('SOmething went wrong, Error: ', err)
        process.exit(1)
    }
}