import Constants from "./constants";
import AppDispatcher from "./dispatcher";
import apiCallers from "./apiCallers";

class Actions {
    // addResource(data) {
    //     AppDispatcher.handleViewAction({
    //         actionType: Constants.ADD_RESOURCE,
    //         data: data
    //     });
    // }

    loadDirectory() {
        AppDispatcher.handleViewAction({
            actionType: Constants.LOAD_PROJECT_DIRECTORY,
        });
        apiCallers.loadDirectory();
    }
}


export default new Actions();