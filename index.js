#!/usr/bin/env node

import addTask from './commands/addTask.js'
import deleteTask from './commands/deleteTask.js'
import readTask from './commands/readTask.js'
import updateTask from './commands/updateTask.js'

import { Command } from 'commander'

const program = new Command()

//set name and desc of cli
program
.name('todo')
.description('Terminal Task Manager')
.version('1.0.0')

// define 'add' cmd
program
.command('add')
.description('Create new todo')
.action(addTask)

// define 'read' cmd
program
.command('read')
.description('Reads all the todos.')
.action(readTask)

// define 'update' cmd
program
.command('update')
.description('Updates a todo.')
.action(updateTask)

// define 'delete' cmd
program
.command('delete')
.description('Deletes a todo.')
.action(deleteTask)

// Parsing the command-line arguments and executing the corresponding actions
program.parse()