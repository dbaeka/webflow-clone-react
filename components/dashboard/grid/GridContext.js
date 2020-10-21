import React, {createContext, useState, useEffect} from "react";
import Store from "../../../flux/store";
import {Actions} from "../../../flux";
import useSWR from 'swr';

const GridContext = createContext({items: []});


const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
        throw new Error(data.message)
    }
    return data
}


export const GridProvider = (props) => {

    const [items, setItems] = useState(Store.getDirectoryItems());

    const moveItem = (sourceId, destinationId) => {
        const sourceIndex = items.findIndex(
            item => item.id === sourceId
        );
        const destinationIndex = items.findIndex(
            item => item.id === destinationId
        );

        // If source/destination is unknown, do nothing.
        if (sourceId === -1 || destinationId === -1) {
            return;
        }

        const offset = destinationIndex - sourceIndex;

        // this.setState(state => ({
            // items: moveElement(state.items, sourceIndex, offset)
        // }));
    };

    const onChange = () => {
        setItems(Store.getDirectoryItems())
    }

    useEffect(() => {
        Store.addChangeListener(onChange);

        Actions.loadDirectory();

        return () => {
            Store.removeChangeListener(onChange)
        }
    }, [])

    return (
        <GridContext.Provider value={{items, moveItem}}>
            {props.children}
        </GridContext.Provider>
    );
}

export default GridContext;