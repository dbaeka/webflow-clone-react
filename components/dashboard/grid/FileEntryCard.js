import React, {memo} from "react";
import {useDrag} from "react-dnd";
import styles from "../../../styles/Home.module.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisH, faChevronRight, faArrowsAlt} from '@fortawesome/free-solid-svg-icons';
import {EntryType} from "../../../utilities/DataTypes.ts";
import {contextMenu} from "react-contexify";

export const FileEntryCard = memo(({id, onClick, data, menuId}) => {

    const [{isDragging}, connectDrag, preview] = useDrag({
        item: {id, type: EntryType.File},
        collect: monitor => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    });

    const showContextMenu = (e) => {
        e.preventDefault();
        contextMenu.show({
            id: menuId,
            event: e,
            props: {
                data: data
            }
        })
    }

    return (
        <div className={styles.card} ref={preview} style={{
            opacity: isDragging ? 0.5 : 1,
        }}>
            <div>
                <div
                    className={styles.preview + " " + styles.newPreview}
                    style={{backgroundImage: "url(/img/file_placeholder.png)"}}
                >
                    <div onClick={onClick} className={styles.hoverContainer}>
                        <div className={styles.link}>
                            <h3>
                                <span>Open Editor</span>
                                <FontAwesomeIcon className={styles.chevron} icon={faChevronRight}/>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.controls}>
                <ul>
                    <li className={styles.details + " " + styles.status}>
                        <div ref={connectDrag} className={styles.handle}>
                            <FontAwesomeIcon icon={faArrowsAlt}/>
                        </div>
                    </li>
                    <li onClick={showContextMenu} className={styles.settings + " light-gray"}>
                        <FontAwesomeIcon icon={faEllipsisH}/>
                    </li>
                </ul>
            </div>
            <div className={styles.bottom}>
                <div className={styles.titleWrapper}>
                    <div className={styles.name}>{data.name}</div>
                </div>
                <a className={styles.link} href="#">
                    Open Project
                </a>
            </div>
        </div>
    );
});