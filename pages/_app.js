import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {PersistGate} from 'redux-persist/integration/react';
import configureAppStore from '../redux/configureStore';
import {Provider} from "react-redux";


function MyApp({Component, pageProps}) {
    const initialState = {};
    const {store, persistor} = configureAppStore(initialState);


    return (
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <PersistGate loading={null} persistor={persistor}>
                    <Component {...pageProps} />
                </PersistGate>
            </DndProvider>
        </Provider>
    )
}

export default MyApp
