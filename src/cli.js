#!/usr/bin/env node

import { Command } from 'commander'
import ProjectBuild from './commands/ProjectBuild'
import ProjectInit from './commands/ProjectInit'
import ProjectStart from './commands/ProjectStart'

const cli = new Command()

cli.version('0.0.3', '-v --version')

cli.addCommand(new ProjectInit('init'))

const project = new Command('project')

project.addCommand(new ProjectStart('start'))
project.addCommand(new ProjectBuild('build'))

cli.addCommand(project)


try {
    cli.parse(process.argv)
} catch (error) {
    console.error(`❌ CLI Error: ${error.stack}`)
}