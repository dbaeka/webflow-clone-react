import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle, faSearch} from '@fortawesome/free-solid-svg-icons';
import {
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
import ButtonIcon from "../common/ButtonIcon";


const DashboardNavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const [isFocus, setIsFocus] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const router = useRouter();

    return (
        <header className={props.className + " v-elevation"}>
            <Navbar style={{width: "100%"}} color="white" light expand="md">
                <NavbarBrand href="/">bud</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/" className={router.pathname === "/" ? "active" : ""}>Dashboard</NavLink>
                        </NavItem>
                    </Nav>
                    <div className="mr-3">
                        <InputGroup className={"input-bar-modern" + (isFocus ? " focus" : "")}>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                type="text"
                                placeholder="Search projects"
                            />
                        </InputGroup>
                    </div>
                    <ButtonIcon icon={faPlusCircle} title="New Project" onClick={() => console.log("aad")}/>
                </Collapse>
            </Navbar>
        </header>
    );
}

export default DashboardNavBar;