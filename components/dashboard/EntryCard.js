import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisH, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {
    Card,
    CardBody,
    CardFooter,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'reactstrap';
import styles from "../../styles/Home.module.scss";


const EntryCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const [isFocus, setIsFocus] = useState(false);

    return (
        <div className={styles.card}>
            <div>
                <div
                    className={styles.preview + " " + styles.newPreview}
                    style={{backgroundImage: "url(/img/file_placeholder.png)"}}
                >
                    <div className={styles.hoverContainer}>
                        <div className={styles.link}>
                            <h3 className={styles.editor}>
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
                    <div className={styles.name}>Title Goes here</div>
                </div>
                <a className={styles.link} href="#">
                    Open Project
                </a>
            </div>
        </div>
    );
}

export default EntryCard;