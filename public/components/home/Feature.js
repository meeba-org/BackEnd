import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Feature extends Component {
    render() {
        let {title, description} = this.props;

        return (
            <div className="feature">
                <div className="title">{title}</div>
                <div className="description">{description}</div>
            </div>
        );
    }
}

Feature.propTypes = {};
Feature.defaultProps = {};

export default Feature;
