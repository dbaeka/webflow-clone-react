import React from "react";
import {Menu, Item, Separator, animation} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faCog, faPen, faClone, faFolder} from '@fortawesome/free-solid-svg-icons';
import styles from "../../styles/Home.module.scss";
import {MenuFunctionType} from "../../utilities/MenuFunctionTypes.ts";

export const ContextMenu = ({id, onClick}) => (
    <Menu id={id}
          animation={animation.zoom}
    >
        <Item onClick={(data) => onClick({...data, type: MenuFunctionType.delete})}>
            <FontAwesomeIcon className={styles.contextMenuItemIcon} icon={faTrash}/>
            Delete
        </Item>
        <Separator/>
        <Item disabled onClick={(data) => onClick({...data, type: MenuFunctionType.duplicate})}>
            <FontAwesomeIcon className={styles.contextMenuItemIcon} icon={faClone}/>
            Duplicate
        </Item>
        <Item onClick={(data) => onClick({...data, type: MenuFunctionType.move})}>
            <FontAwesomeIcon className={styles.contextMenuItemIcon} icon={faFolder}/>
            Move to folder
        </Item>
        <Item onClick={(data) => onClick({...data, type: MenuFunctionType.open})}>
            <FontAwesomeIcon className={styles.contextMenuItemIcon} icon={faPen}/>
            Editor
        </Item>
        <Item onClick={(data) => onClick({...data, type: MenuFunctionType.settings})}>
            <FontAwesomeIcon className={styles.contextMenuItemIcon} icon={faCog}/>
            Settings
        </Item>
    </Menu>
);
