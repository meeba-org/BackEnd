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
        let {icon, title, description, sideContent, dialogContent} = this.props;

        return (
            <div className="feature" onClick={() => {this.setState({open: true});}}>
                <div className="side1">
                    <div className="feature-title-container">
                        <div className="feature-icon">{icon}</div>
                        <div className="feature-title">{title}</div>
                    </div>
                    <div className="feature-description">{description}</div>
                </div>
                <div className="side2">
                    <div>{sideContent}</div>
                </div>
                <Dialog maxWidth={false} onClose={() => this.setState({open: false})} open={this.state.open}>
                    {dialogContent}
                </Dialog>
            </div>
        );
    }
}

Feature.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    icon: PropTypes.object.isRequired,
    sideContent: PropTypes.object.isRequired,
    dialogContent: PropTypes.object.isRequired,
};

export default CSSModules(Feature, styles);
