import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../../styles/Feature.scss";

class Feature extends Component {
    render() {
        let {icon, title, description, selected, onSelect} = this.props;

        return (
            <div className={"feature" + (selected ? " select" : "")} onClick={() => onSelect(title)}>
                <div className="feature-icon">{icon}</div>
                <div className="feature-title">{title}</div>
                <div className="feature-description">{description}</div>
            </div>
        );
    }
}

Feature.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
};

export default CSSModules(Feature, styles);
