import Constants from "./constants";
import AppDispatcher from "./dispatcher";

class ActionsServer {
    loadDirectory(response) {
        AppDispatcher.handleServerAction({
            actionType: Constants.LOAD_DIRECTORY_RESPONSE,
            response: response
        });
    }

    // loadDirectory(response) {
    //     AppDispatcher.handleServerAction({
    //         actionType: Constants.GET_RESOURCES_RESPONSE,
    //         response: response
    //     });
    // }
}


export default new ActionsServer();