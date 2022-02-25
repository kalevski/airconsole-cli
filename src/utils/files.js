import fs from 'fs'
import { copySync } from 'fs-extra'
import path from 'path'
import process from 'process'

const getPath = (relativePath = './') => {
    return path.join(process.cwd(), relativePath)
}

/**
 * 
 * @param {string} path 
 * @returns {boolean}
 */
const createDir = (dirPath) => {
    try {
        fs.mkdirSync(dirPath)
        return dirPath
    } catch (error) {
        return null
    }
}

const createFile = (filename, dirPath, data = '') => {
    try {
        fs.writeFileSync(path.join(dirPath, filename), data, { encoding: 'utf-8' })
        return true
    } catch (error) {
        return false
    }
}

const copyDir = (srcDir, destDir) => {
    try {
        copySync(srcDir, destDir)
        return true
    } catch (error) {
        return false
    }
}

const isDirEmpty = (dirPath) => {
    try {
        let files = fs.readdirSync(dirPath)
        return files.length === 0
    } catch (error) {
        return null
    }
}

/**
 * 
 * @param {string} filePath 
 * @param {('text'|'json')} contentType 
 * @returns 
 */
const getFile = (filePath, contentType = 'text') => {
    let data = null
    try {
        data = fs.readFileSync(filePath).toString()
    } catch (error) {
        return null
    }
    if (contentType === 'text') {
        return data
    }
    if (contentType === 'json') {
        try {
            return JSON.parse(data)
        } catch (error) {
            return null
        }
    }
    return null

}

const removeFile = (filePath) => {
    try {
        fs.rmSync(filePath)
        return true
    } catch (error) {
        return false
    }
}

export { getPath, createDir, createFile, copyDir, getFile, removeFile, isDirEmpty }