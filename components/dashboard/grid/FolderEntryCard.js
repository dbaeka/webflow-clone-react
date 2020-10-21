import React from "react";
import {useDrop} from "react-dnd";
import {DropOverlay} from "./DropOverlay";
import styles from "../../../styles/Home.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faEllipsisH} from "@fortawesome/free-solid-svg-icons";

export const FolderEntryCard = ({id, onMoveItem}) => {
    const [{isOver, canDrop}, connectDrop] = useDrop({
        accept: "FILE",
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
        canDrop: (movingItem) => (movingItem.id !== id),
        hover(hoveredOverItem, monitor) {
            if (hoveredOverItem.id !== id) {
                // console.log(hoveredOverItem)
                // console.log(monitor.canDrop())
                // onMoveItem(hoveredOverItem.id, id)
            }
        }
    });

    return (
        <div className={styles.card} ref={connectDrop}>
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
                    <div className={styles.name}>New Folder</div>
                </div>
                <span className={styles.link}>
                    Empty
                </span>
            </div>
        </div>
    )
};