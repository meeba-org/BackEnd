import React, {Fragment} from "react";
import animation from "../styles/Animation.scss";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const Fade = (props) => (
    <TransitionGroup>
        <CSSTransition
            timeout={500}
            classNames={{...animation}}
            appear
        >
            <Fragment>
                {React.cloneElement(props.children, {...props})}
            </Fragment>
        </CSSTransition>
    </TransitionGroup>
);

export default Fade;
