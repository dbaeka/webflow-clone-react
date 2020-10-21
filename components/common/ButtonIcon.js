import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const ButtonIcon = (props) => {
    return (
        <a className="btn-w-icon btn-primary" onClick={props.onClick}>
            <div className="btn-prepend">
                <FontAwesomeIcon icon={props.icon}/>
            </div>
            <div>
                {props.title}
            </div>
        </a>
    );
}

ButtonIcon.propTypes = {
    icon: PropTypes.object.isRequired,
    title: PropTypes.string,
}

ButtonIcon.defaultProps = {
    title: "New Button",
}

export default ButtonIcon;