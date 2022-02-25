import path from 'path'
import { Command } from 'commander'
import ora from 'ora'
import * as templates from '../utils/templates'
import { createDir, getPath, isDirEmpty, createFile } from '../utils/files'
import { createPackageJSON } from '../utils/npm'

const TEMPLATES = [
    'phaser'
]

class ProjectInit extends Command {

    constructor(name = 'init') {
        super(name)
        this.option('-t --template [template]', 'project template, default: phaser')
        this.argument('[path]', 'project location on file system')
            .action(this.onExec)
    }

    onExec(relativePath = './') {
        const projectPath = getPath(relativePath)
        const { template = 'phaser' } = this.opts()

        if (!TEMPLATES.includes(template)) {
            console.error(`❌ invalid template (${template}), available options are [${TEMPLATES.join(', ')}]`)
            return
        }

        let dirEmpty = isDirEmpty(projectPath)
        if (dirEmpty === false) {
            console.log(`❌ the directory [${projectPath}] is not empty`)
            return
        }

        if (dirEmpty === null) {
            createDir(projectPath)
        }

        const spinner = ora('project init')
        spinner.start()

        const packageJSON = createPackageJSON({
            name: 'airconsole-game',
            scripts: {
                start: 'airconsole project start'
            },
            dependencies: ['phaser'],
            devDependencies: []
        }, message => spinner.text = message)
        
        createFile('.gitignore', projectPath, templates.get('template.gitignore'))
        templates.clone('phaser', path.join(projectPath, 'src'))
        templates.clone('public', path.join(projectPath, 'public'))
        createFile('package.json', projectPath, packageJSON)
        spinner.succeed('project created!')
        console.log(`
    execute:
        - cd ${relativePath}
        - npm install
        - npm start
`
        )

    }

}

export default ProjectInit