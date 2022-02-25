import { execSync as exec } from 'child_process'

const getPackageVersions = (packageName) => {
    try {
        let versions = exec(`npm dist-tag ls ${packageName}`, { encoding: 'utf-8', windowsHide: true, stdio: [ 'pipe', 'pipe', 'ignore' ] }) || ''
        let lines = versions.split('\n')
        let map = {}
        for (let line of lines) {
            if (line.length === 0) {
                continue
            }
            const [tag, version] = line.split(': ')
            map[tag] = version
        }
        return map
    } catch (error) {
        return {}
    }
}

const getPackageVersion = (packageName, desiredTag) => {
    let versions = getPackageVersions(packageName)
    return versions[desiredTag] || null
}

const packageJSON = {
    name: "",
    version: "1.0.0",
    private: true,
    description: "",
    browserslist: "> 0.5%, last 2 versions, not dead",
    scripts: {},
    dependencies: {},
    devDependencies: {}
}

/**
 * @typedef PackageOptions
 * @property {string} name
 * @property {Object<string,string>} scripts
 * @property {Array<string>} dependencies
 * @property {Array<string>} devDependencies
 */

/**
 * @callback EachStepFn
 * @param {string} message
 * @returns {void}
 */

/**
 * 
 * @param {PackageOptions} options 
 * @param {EachStepFn} callback
 */
const createPackageJSON = (options = {}, callback) => {
    let packageJson = { ...packageJSON }
    callback('❇️ creating package.json...')
    packageJson.name = options.name
    packageJson.description = `generated project using AirConsole CLI`
    packageJson.scripts = options.scripts
    
    for (let dependency of options.dependencies) {
        const version = getPackageVersion(dependency, 'latest')
        packageJson.dependencies[dependency] = `^${version}`
        callback(`📦 fetching ${dependency} version`)
    }

    for (let dependency of options.devDependencies) {
        const version = getPackageVersion(dependency, 'latest')
        packageJson.devDependencies[dependency] = `^${version}`
    }

    return JSON.stringify(packageJson, null, '\t')
    
}

export { getPackageVersions, getPackageVersion, createPackageJSON }