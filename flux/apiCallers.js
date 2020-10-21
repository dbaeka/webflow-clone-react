import ActionsServer from "./actions-server";
import axios from "axios";


export default {
    loadDirectory() {
        var config = {
            headers: {'Access-Control-Allow-Origin': '*'},
        };

        axios.get("/api/load_directory", config).then(res => {
            if (res.status === 200) {
                const {data} = res;
                ActionsServer.loadDirectory(data);
            }
        }).catch(err => console.log(err))
    }
}