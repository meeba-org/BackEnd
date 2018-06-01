import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../styles/App.scss";
import ModalRoot from "./modals/ModalRoot";

class App extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}
                <ModalRoot />
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object,
};

export default CSSModules(App, styles);

