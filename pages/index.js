import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React, {useContext, useEffect, useState} from "react";
import {contextMenu} from 'react-contexify';
import DashboardNavBar from "../components/dashboard/NavBar";
import {
    Breadcrumb,
    BreadcrumbItem,
} from "reactstrap";
import {EntryType} from "../utilities/DataTypes.ts";
import GridContext from "../components/dashboard/grid/GridContext";
import {FileEntryCard} from "../components/dashboard/grid/FileEntryCard";
import {FolderEntryCard} from "../components/dashboard/grid/FolderEntryCard";
import {ContextMenu} from "../components/dashboard/ContextMenu";
import Store from "../flux/store";
import {MenuFunctionType} from "../utilities/MenuFunctionTypes.ts";


export default function Home() {

    const {items, moveItem} = useContext(GridContext);

    const [displayItems, setDisplayItems] = useState(items);
    const [isSubFolder, setIsSubFolder] = useState(false);
    const [currentFolder, setCurrentFolder] = useState(null);

    const menuId = "menu_"

    const handleFolderClick = (event, item) => {
        setDisplayItems(item.children)
        setIsSubFolder(true);
        setCurrentFolder(item.name);
    }

    const handleFileClick = (event, item) => {
        console.log(item);
    }

    const resetToTopDir = (event) => {
        event.preventDefault();
        setDisplayItems(items);
        setIsSubFolder(false);
        setCurrentFolder(null);
    }

    const showContextMenu = (e, item) => {
        e.preventDefault();
        contextMenu.show({
            id: menuId,
            event: e,
            props: {
                data: item
            }
        })
    }

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

    const onChange = () => {
        setDisplayItems(Store.getDirectoryItems());
    }

    useEffect(() => {
        Store.addChangeListener(onChange);

        return () => {
            Store.removeChangeListener(onChange)
        }
    }, [])

    return (
        <div className={styles.body}>
            <Head>
                <title>Bud Editor</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <DashboardNavBar className={styles.header}/>
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Welcome to <span className={styles.emphasis}>Bud Editor</span>
                    </h1>

                    <p className={styles.description}>
                        Get started by opening{' '}
                        <span className={styles.code}>a project</span>
                    </p>
                    <div className={styles.projectManager}>
                        <Breadcrumb className={styles.breadcrumb}>
                            {(!isSubFolder)
                                ? <BreadcrumbItem>All Projects</BreadcrumbItem>
                                : <BreadcrumbItem active>
                                    <a onClick={resetToTopDir} href="#">All Projects</a>
                                </BreadcrumbItem>
                            }
                            {isSubFolder && <BreadcrumbItem>{currentFolder}</BreadcrumbItem>}
                        </Breadcrumb>
                        <div className={styles.grid}>
                            {Object.entries(displayItems).map(([, item]) => {
                                if (item.type === EntryType.File) {
                                    return <FileEntryCard onClick={(event) => handleFileClick(event, item)}
                                                          onContextClick={(event) => showContextMenu(event, item)}
                                                          key={item.id} id={item.id}
                                                          data={item}/>
                                } else {
                                    return <FolderEntryCard key={item.id} id={item.id} data={item}
                                                            onClick={(event) => handleFolderClick(event, item)}
                                                            onMoveItem={moveItem}/>
                                }
                            })}
                        </div>
                    </div>
                </main>

                <footer className={styles.footer}>
                    <span>
                        Powered by{' '}
                        <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo}/>
                    </span>
                </footer>
                <ContextMenu id={menuId} onClick={handleContextMenu}/>
            </div>
        </div>
    )
}
