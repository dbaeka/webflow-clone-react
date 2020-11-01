import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React, {useEffect, useState} from "react";
import DashboardNavBar from "../components/dashboard/NavBar";
import {
    Breadcrumb,
    BreadcrumbItem,
} from "reactstrap";
import {EntryType} from "../utilities/DataTypes.ts";
import {FileEntryCard} from "../components/dashboard/grid/FileEntryCard";
import {FolderEntryCard} from "../components/dashboard/grid/FolderEntryCard";
import {ContextMenu} from "../components/dashboard/ContextMenu";
import {useRouter} from 'next/router'
import {useProjectFiles} from "../containers/ProjectFiles";


export default function Home() {
    const [items, setItems] = useState(undefined);
    const [isSubFolder, setIsSubFolder] = useState(false);
    const [currentFolder, setCurrentFolder] = useState(null);

    const router = useRouter();
    const [{data}, dispatchMoveFile] = useProjectFiles();

    const menuId = "menu_";

    const moveItem = (sourceId, destinationId) => {
        const sourceItem = data[sourceId];
        const destinationItem = data[destinationId];

        // If source/destination is unknown, do nothing.
        if (sourceItem.type !== EntryType.File || destinationItem.type !== EntryType.Folder) {
            return;
        }

        //TODO: modify the current Store state for instant show
        dispatchMoveFile({source: sourceId, dest: destinationId});

        //TODO Send API GET request to move source to dest through redux and update where necessary

    };


    const handleFolderClick = (event, item) => {
        setItems(item.children)
        setIsSubFolder(true);
        setCurrentFolder(item.name);
    }

    const handleFileClick = (e, item) => {
        e.preventDefault();
        return router.push({
            pathname: '/editor/[[...fid]]',
            query: {fid: item.id},
        })
    }

    const resetToTopDir = (event) => {
        event.preventDefault();
        setItems(items);
        setIsSubFolder(false);
        setCurrentFolder(null);
    }

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
                            {console.log(data)}
                            {Object.entries(data).map(([, item]) => {
                                if (item.type === EntryType.File) {
                                    return <FileEntryCard onClick={(event) => handleFileClick(event, item)}
                                                          key={item.id} id={item.id} menuId={menuId}
                                                          data={item}/>
                                } else if (item.type === EntryType.Folder) {
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
                <ContextMenu id={menuId}/>
            </div>
        </div>
    )
}
