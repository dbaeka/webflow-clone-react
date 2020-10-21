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
                    dateModified: mtime
                }
                result[structureJson.id] = structureJson;
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
                    id: String(parentDev) + String(parentIno)
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
                            parent: String(parentDev) + String(parentIno)
                        }
                        temp.children[structureJson.id] = structureJson;
                    }
                })
                result[String(parentDev) + String(parentIno)] = temp;
            }
        }
    })

    res.status(200).json({name: result})
}
