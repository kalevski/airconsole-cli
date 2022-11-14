import { Command } from 'commander'
import concurrently from 'concurrently'
import { getPath } from '../utils/files'
import Color from '../utils/Color'

class ProjectBuild extends Command {

    constructor(name = 'start') {
        super(name)
        this.action(this.onExec)
    }

    onExec() {
        const rootPath = getPath()
        const commands = [
            {
                command: 'parcel build --no-scope-hoist --no-cache --no-source-maps --log-level verbose --dist-dir public screen/screen.html',
                name: 'screen',
                prefixColor: Color.BLUE,
                cwd: rootPath
            },
            {
                command: 'parcel build --no-scope-hoist --no-cache --no-source-maps --log-level verbose --dist-dir public controller/controller.html',
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

export default ProjectBuild