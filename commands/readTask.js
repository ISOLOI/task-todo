import { connectDB, disconnectDB } from '../db/connectDB.js'
import Todos from '../schema/TodoSchema.js'
import chalk from 'chalk'
import ora from 'ora'

export default async function readTask() {
  try {
    //connecting to db
    await connectDB()

    //starting spinner
    const spinner = ora('fetching all todos...').start()

    //fetching all todos from db
    const todos = await Todos.find({})

    //stopping spinner
    spinner.stop()

    // check if todo exists
    if(todos.length == 0) {
      console.log(chalk.blueBright('You do not have any tasks yet!'))
    } else {
      todos.forEach(todo => {
        console.log(
          chalk.cyanBright('Todo Code: ') + todo.code + '\n' +
          chalk.blueBright('Name: ') + todo.name + '\n' +
          chalk.yellowBright('Description: ') + todo.detail + '\n'
        )
      })
    }
    //disconnect from db
    await disconnectDB()
  } catch(err) {
    console.log('Something went wrong:', err)
    process.exit(1)
  }
}
