import fs from 'fs'
import path from 'path'
import { copyDir } from './files'

const get = (name) => {
    const filePath = path.join(__dirname, '../templates', name)
    let exists = fs.existsSync(filePath)
    if (!exists) {
        throw new Error(`template=(${name}) does not exist`)
    }
    return fs.readFileSync(filePath).toString('utf-8')
}

const clone = (dirName, destDir) => {
    const srcDir = path.join(__dirname, '../templates', dirName)
    let exists = fs.existsSync(srcDir)
    if (!exists) {
        throw new Error(`template directory=(${dirName}) does not exist`)
    }
    return copyDir(srcDir, destDir)
}

export { get, clone }