import path from 'path'
import { Command } from 'commander'
import concurrently from 'concurrently'
import ora from 'ora'
import * as templates from '../utils/templates'
import { createDir, getPath, isDirEmpty, createFile } from '../utils/files'
import { createPackageJSON } from '../utils/npm'
import Color from '../utils/Color'

const TEMPLATES = [
    'phaser'
]

class ProjectStart extends Command {

    constructor(name = 'start') {
        super(name)
        this.action(this.onExec)
    }

    onExec() {
        const rootPath = getPath()
        const commands = [
            {
                command: 'parcel watch -p 3001 --dist-dir public src/screen.html',
                name: 'screen',
                prefixColor: Color.BLUE,
                cwd: rootPath
            },
            {
                command: 'parcel watch -p 3002 --dist-dir public src/controller.html',
                name: 'controller',
                prefixColor: Color.AMBER,
                cwd: rootPath
            }
        ]

        let processes = concurrently(commands, {
            outputStream: process.stdout
        })

        processes.result.then(() => {
            process.exit()
        }).catch(error => {
            console.log('❌ error: ', error.message)
            process.exit()
        })

    }

}

export default ProjectStart