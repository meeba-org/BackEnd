import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {CSSTransition} from "react-transition-group";
import animation from "../styles/Animation.scss";

const Fade = (props) => {
    const { isVisible = true, ...rest } = props;

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
    isVisible: PropTypes.bool
};

export default Fade;
