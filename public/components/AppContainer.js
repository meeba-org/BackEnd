import React from 'react';
import App from "./App";
import PropTypes from 'prop-types';

class AppContainer extends React.Component {
    render() {
        return (
            <App>
                {this.props.children}
            </App>
        );
    }
}

AppContainer.propTypes = {
    children: PropTypes.object.isRequired
};

export default AppContainer;
