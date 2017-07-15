'use strict';

import React from "react";
import CSSModules from 'react-css-modules';
import styles from "../styles/SideBar.scss";

class SideBar extends React.Component {
    // static propTypes = {
    //     name: PropTypes.object.isRequired
    // }

    render() {
        return (
            <div id="sideBar">
                <h1>תפריט</h1>
                <h4>עובדים</h4>
            </div>
        );
    }
}

export default CSSModules(SideBar, styles);

