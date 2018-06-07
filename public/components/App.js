import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import ModalRoot from "./modals/ModalRoot";
import "../styles/App.scss";

class App extends React.Component {

    render() {
        return (
            <Fragment>
                {this.props.children}
                <ModalRoot />
            </Fragment>
        );
    }
}

App.propTypes = {
    children: PropTypes.object,
};

export default App;

