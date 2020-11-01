import fs from "fs";
import path from "path";
import os from "os";
import Cors from 'cors'
import initMiddleware from '../../utilities/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)

export default async (req, res) => {
    await cors(req, res);

    const documents = path.join(os.homedir(), "Documents");
    const budConfigPath = path.resolve("./.editor");
    if (!fs.existsSync(budConfigPath)) {
        fs.mkdirSync(budConfigPath, {recursive: true});
        //TODO: set up config file
    }
    const config = path.join(budConfigPath, "app.config")

    if (!fs.existsSync(config)) {
        //TODO: set up config file
    }
    let file = fs.readFileSync(config);
    let fileJson = JSON.parse(file);

    if (!fileJson.mainDirectory) {
        fileJson.mainDirectory = path.join(documents, "bud_editor");
        let data = JSON.stringify(fileJson);
        fs.writeFileSync(config, data);
    }

    if (!fs.existsSync(fileJson.mainDirectory)) {
        fs.mkdirSync(fileJson.mainDirectory, {recursive: true});
    }

    const projDirFiles = fs.readdirSync(fileJson.mainDirectory);

    var result = new Map();
    var filePaths = {};

    projDirFiles.forEach(item => {
        const name = path.join(fileJson.mainDirectory, item);
        if (path.extname(item) === ".budfile") { //file
            if (fs.existsSync(path.join(name, "structure.json"))) {
                let structure = fs.readFileSync(path.join(name, "structure.json"));
                let structureJson = JSON.parse(structure);
                const {mtime, birthtime, dev, ino} = fs.statSync(path.join(name, "structure.json"));
                structureJson = {
                    ...structureJson,
                    id: String(dev) + String(ino),
                    dateCreated: birthtime,
                    dateModified: mtime,
                    path: name
                }
                result[structureJson.id] = structureJson;
                filePaths[structureJson.id] = name;
            }
        } else if (!path.extname(item) && fs.lstatSync(name).isDirectory()) { // folder
            const folderFiles = fs.readdirSync(name);
            const matchedFiles = folderFiles.filter(s => s.indexOf('.budfile') !== -1);
            if (matchedFiles.length > 0) {
                const {mtime, birthtime, dev: parentDev, ino: parentIno} = fs.statSync(name);
                var temp = {
                    name: item,
                    type: "FOLDER",
                    children: {},
                    dateCreated: birthtime,
                    dateModified: mtime,
                    id: String(parentDev) + String(parentIno),
                    path: name
                }
                matchedFiles.forEach(subfile => {
                    if (fs.existsSync(path.join(name, subfile, "structure.json"))) {
                        let structure = fs.readFileSync(path.join(name, subfile, "structure.json"));
                        let structureJson = JSON.parse(structure);
                        const {mtime, birthtime, dev, ino} = fs.statSync(path.join(name, subfile, "structure.json"));
                        structureJson = {
                            ...structureJson,
                            id: String(dev) + String(ino),
                            dateCreated: birthtime,
                            dateModified: mtime,
                            parent: String(parentDev) + String(parentIno),
                            path: path.join(name, subfile)
                        }
                        temp.children[structureJson.id] = structureJson;
                        filePaths[structureJson.id] = path.join(name, subfile);
                    }
                })
                result[String(parentDev) + String(parentIno)] = temp;
                filePaths[String(parentDev) + String(parentIno)] = name;
            }
        }
    })
    if (Object.keys(filePaths).length !== 0 && filePaths.constructor === Object)
        fs.writeFileSync(path.join(budConfigPath, ".tmp"), JSON.stringify(filePaths));

//TODO: refactor above code and create a .tmp file hidden that keeps a list of the inode and dev id along with the actual path
// Update each time load_directory is called
    res.status(200).json({name: result})
}
