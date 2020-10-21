import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import React, {useContext} from "react";

import DashboardNavBar from "../components/dashboard/NavBar";
import {
    Breadcrumb,
    BreadcrumbItem,
} from "reactstrap";
import {EntryType} from "../utilities/DataTypes.ts";
import GridContext from "../components/dashboard/grid/GridContext";
import {FileEntryCard} from "../components/dashboard/grid/FileEntryCard";
import {FolderEntryCard} from "../components/dashboard/grid/FolderEntryCard";


export default function Home() {

    // const items = new Map();

    const {items, moveItem} = useContext(GridContext);

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
                            <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
                            <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
                        </Breadcrumb>
                        <div className={styles.grid}>
                            {Object.entries(items).map(([, item]) => {
                                if (item.type === EntryType.File) {
                                    return <FileEntryCard key={item.id} id={item.id} data={item}/>
                                } else {
                                    return <FolderEntryCard key={item.id} id={item.id} data={item}
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
            </div>
        </div>
    )
}
