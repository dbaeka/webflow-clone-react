import React from "react";
import {Menu, Item, Separator, animation} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faCog, faPen, faClone, faFolder} from '@fortawesome/free-solid-svg-icons';
import styles from "../../styles/Home.module.scss";
import {MenuFunctionType} from "../../utilities/MenuFunctionTypes.ts";

const handleContextMenu = ({props, type}) => {
    switch (type) {
        case MenuFunctionType.delete:
            console.log("delete")
            break;
        case MenuFunctionType.open:
            console.log("open")
            break;
        case MenuFunctionType.move:
            console.log("move")
            break;
        case MenuFunctionType.settings:
            console.log("settings")
            break;
        default:
            break;
    }
}

export const ContextMenu = ({id}) => (
    <Menu id={id}
          animation={animation.zoom}
    >
        <Item onClick={(data) => handleContextMenu({...data, type: MenuFunctionType.delete})}>
            <FontAwesomeIcon className={styles.contextMenuItemIcon} icon={faTrash}/>
            Delete
        </Item>
        <Separator/>
        <Item disabled onClick={(data) => handleContextMenu({...data, type: MenuFunctionType.duplicate})}>
            <FontAwesomeIcon className={styles.contextMenuItemIcon} icon={faClone}/>
            Duplicate
        </Item>
        <Item onClick={(data) => handleContextMenu({...data, type: MenuFunctionType.move})}>
            <FontAwesomeIcon className={styles.contextMenuItemIcon} icon={faFolder}/>
            Move to folder
        </Item>
        <Item onClick={(data) => handleContextMenu({...data, type: MenuFunctionType.open})}>
            <FontAwesomeIcon className={styles.contextMenuItemIcon} icon={faPen}/>
            Editor
        </Item>
        <Item onClick={(data) => handleContextMenu({...data, type: MenuFunctionType.settings})}>
            <FontAwesomeIcon className={styles.contextMenuItemIcon} icon={faCog}/>
            Settings
        </Item>
    </Menu>
);
