import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../../styles/Feature.scss";
import {Dialog} from "material-ui";

class Feature extends Component {
    state = {
        open: false
    };

    render() {
        let {icon, title, description, content, direction} = this.props;

        return (
            <div className="feature" style={{flexDirection: direction ? "row-reverse" : "row"}}>
                <div className="side1">
                    <div className="feature-title-container">
                        <div className="feature-icon">{icon}</div>
                        <div className="feature-title">{title}</div>
                    </div>
                    <div className="feature-description">{description}</div>
                </div>
                <div className="side2">
                    <div onClick={() => {this.setState({open: true});}}> {content}</div>
                    <Dialog maxWidth={false} onClose={() => this.setState({open: false})} open={this.state.open}>
                        {content}
                    </Dialog>
                </div>
            </div>
        );
    }
}

Feature.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.any.isRequired,
    icon: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
};

export default CSSModules(Feature, styles);
