import Constants from "./constants";
import AppDispatcher from "./dispatcher";
import {EventEmitter} from "events";
import {FileEntry, FolderEntry, EntryType} from "../utilities/DataTypes.ts"

let _store = {
    directory: {},
    // sortedDirectory: [],
};

class Store extends EventEmitter {
    constructor() {
        super();
        // this.addResource = this.addResource.bind(this);
        // this.toggleSidebar = this.toggleSidebar.bind(this);
        this.loadDirectory = this.loadDirectory.bind(this);
        AppDispatcher.register(this.registerActions.bind(this));
    }

    registerActions({action}) {
        switch (action.actionType) {
            // case Constants.TOGGLE_SIDEBAR:
            //     this.toggleSidebar();
            //     break;
            // case Constants.ADD_RESOURCE:
            //     this.addResource(action.data);
            //     break;
            case Constants.LOAD_DIRECTORY_RESPONSE:
                const results = action.response;
                this.loadDirectory(results);
                break;
            default:
                return true;
        }
    }

    addChangeListener(callback) {
        this.on(Constants.CHANGE, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(Constants.CHANGE, callback);
    }

    addResource(data) {
        console.log(data)
        //Write to database and then use promise to push to
        _store.resources.push(data);
        this.emit(Constants.CHANGE);
    }

    loadDirectory(data) {
        _store.directory = data.name;
        _store.directory = Object.entries(data.name).sort(([, a], [, b]) => {
                return new Date(b.dateCreated) - new Date(a.dateCreated)
            }
        )
            .reduce((r, [k, v]) => ({...r, [k]: v}), {});
        this.emit(Constants.CHANGE);
    }

    toggleSidebar() {
        _store.menuVisible = !_store.menuVisible;
        this.emit(Constants.CHANGE);
    }


    getDirectoryItems() {
        return _store.directory;
    }
};

export default new Store();