import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {CSSTransition} from "react-transition-group";
import animation from "../styles/Animation.scss";

const Fade = (props) => {
    const { isVisible, ...rest } = props;

    return (<CSSTransition
        in={isVisible}
        appear
        unmountOnExit
        timeout={400}
        classNames={{...animation}}
    >
        <Fragment>
            {React.Children.map(props.children, (child => React.cloneElement(child, {...rest})))}
        </Fragment>
    </CSSTransition>);
};

Fade.propTypes = {
    // children: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired
};

export default Fade;
