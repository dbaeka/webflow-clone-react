import React, {memo} from "react";
import {useDrag} from "react-dnd";
import styles from "../../../styles/Home.module.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisH, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {EntryType} from "../../../utilities/DataTypes.ts";

export const FileEntryCard = memo(({id, data}) => {

    const [{isDragging}, connectDrag] = useDrag({
        item: {id, type: EntryType.File},
        collect: monitor => {
            return {
                isDragging: monitor.isDragging()
            }
        }
    });

    return (
        <div className={styles.card} ref={connectDrag} style={{
            opacity: isDragging ? 0.5 : 1,
        }}>
            <div>
                <div
                    className={styles.preview + " " + styles.newPreview}
                    style={{backgroundImage: "url(/img/file_placeholder.png)"}}
                >
                    <div className={styles.hoverContainer}>
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
                    </li>
                    <li className={styles.settings + " light-gray"}>
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