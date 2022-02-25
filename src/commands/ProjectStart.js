import { Command } from 'commander'
import concurrently from 'concurrently'
import express from 'express'
import { getPath } from '../utils/files'
import Color from '../utils/Color'
import os from 'os'
import open from 'open'

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

        const devServer = express()


        const IP_ADDRESS = Object.values(os.networkInterfaces()).flat().filter(item => {
            return !item.internal && item.family === 'IPv4'
        }).find(Boolean).address
        const PIBLIC_DIR = getPath('./public')
        const PORT = process.env['PORT'] || 3000
        
        const url = `http://www.airconsole.com/simulator/#http://${IP_ADDRESS}:${PORT}`

        devServer.use(express.static(PIBLIC_DIR))
        devServer.get('*', (_, response) => response.redirect(url))
        
        devServer.listen(PORT, '0.0.0.0', () => {
            console.log('dev server: http://localhost:3000')
            open(url)
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