import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {GridProvider} from "../components/dashboard/grid/GridContext";

function MyApp({Component, pageProps}) {
    return (
        <DndProvider backend={HTML5Backend}>
            <GridProvider>
                <Component {...pageProps} />
            </GridProvider>
        </DndProvider>
    )
}

export default MyApp
