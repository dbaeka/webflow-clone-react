import React from "react";
import {useDrop} from "react-dnd";
import {DropOverlay} from "./DropOverlay";
import styles from "../../../styles/Home.module.scss";

export const FolderEntryCard = ({id, onMoveItem, onClick, data}) => {
    const [{isOver, canDrop}, connectDrop] = useDrop({
        accept: "FILE",
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
        canDrop: (movingItem) => (movingItem.id !== id),
        drop(droppedItem) {
            if (droppedItem.id !== id) {
                onMoveItem(droppedItem.id, id);
            }
        },
    });

    return (
        <div className={styles.card} onClick={onClick} ref={connectDrop}>
            <div>
                <div className={styles.preview + " " + styles.folderPreview}>
                    <div
                        className={styles.emptyFolderState}
                    >
                        <div className={styles.emptyFolderHeader}>Add projects</div>
                        <div className={styles.emptyFolderDesc}>Move projects here from the project menu.</div>
                    </div>
                    {isOver && canDrop && <DropOverlay/>}
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.titleWrapper}>
                    <div className={styles.name}>{data.name}</div>
                </div>
                <span className={styles.link}>
                    Empty
                </span>
            </div>
        </div>
    )
};