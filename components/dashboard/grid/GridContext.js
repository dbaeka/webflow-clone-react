import React, {createContext, useEffect, useState} from "react";
import {EntryType} from "../../../utilities/DataTypes.ts";
import {useMoveProjectFile, useProjectFiles} from "../../../containers/ProjectFiles";
import {shallowEqual} from 'react-redux';

// const GridContext = createContext({items: {}});


export const GridProvider = (props) => {




    const moveItem = (sourceId, destinationId) => {
        const sourceItem = items[sourceId];
        const destinationItem = items[destinationId];

        // If source/destination is unknown, do nothing.
        if (sourceItem.type !== EntryType.File || destinationItem.type !== EntryType.Folder) {
            return;
        }

        //TODO: modify the current Store state for instant show
        const store = useMoveProjectFile({source: sourceId, dest: destinationId});
        // console.log(store);
        // setItems({...items, ...store});

        //TODO Send API GET request to move source to dest through redux and update where necessary

    };

    // return (
    //     <GridContext.Provider value={{items, moveItem}}>
    //         {props.children}
    //     </GridContext.Provider>
    // );
}

// export default GridContext;