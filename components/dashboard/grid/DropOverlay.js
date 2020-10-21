import React from "react";
import styles from "../../../styles/Home.module.scss";

export const DropOverlay = () => {
    return (
        <div
            className={styles.hoverFolderContainer}
            // style={{opacity}}
        >
            {/*<div className={styles.emptyFolderHeader}>Add projects</div>*/}
            {/*<div className={styles.emptyFolderDesc}>Move projects here from the project menu.</div>*/}
        </div>
    )
};