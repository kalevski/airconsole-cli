#!/usr/bin/env node

import { Command } from 'commander'
import ProjectInit from './commands/ProjectInit'
import ProjectStart from './commands/ProjectStart'

const cli = new Command()

cli.version('0.0.1', '-v --version')

cli.addCommand(new ProjectInit('init'))

const project = new Command('project')

project.addCommand(new ProjectStart('start'))

cli.addCommand(project)


try {
    cli.parse(process.argv)
} catch (error) {
    console.error(`❌ CLI Error: ${error.stack}`)
}