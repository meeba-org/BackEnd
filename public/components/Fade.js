import React, {Fragment} from "react";
import animation from "../styles/Animation.scss";
import {CSSTransition} from "react-transition-group";
import PropTypes from "prop-types";

const Fade = (props) => (
        <CSSTransition
            in={props.isVisible}
            appear
            unmountOnExit
            timeout={400}
            classNames={{...animation}}
        >
            <Fragment>
                {React.Children.map(props.children, (child => React.cloneElement(child, {...props})))}
            </Fragment>
        </CSSTransition>
);

Fade.propTypes = {
    // children: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired
};

export default Fade;
