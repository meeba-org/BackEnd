import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CSSModules from "react-css-modules";
import styles from "../../styles/Feature.scss";
import {Dialog} from "@material-ui/core";

class Feature extends Component {
    state = {
        open: false
    };

    handleClose = () => {
        console.log("closing: ", this.props.title);
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true});
    };

    render() {
        let {icon, title, description, sideContent, dialogContent} = this.props;

        //console.log("open: ", title, this.state.open);
        return (
            <div styleName="feature" onClick={this.handleOpen}>
                <div styleName="side1">
                    <div styleName="feature-title-container">
                        <div styleName="feature-icon">{icon}</div>
                        <div styleName="feature-title">{title}</div>
                    </div>
                    <div styleName="feature-description">{description}</div>
                </div>
                <div styleName="side2">
                    <div>{sideContent}</div>
                </div>
                <Dialog maxWidth={false} onClose={this.handleClose} open={this.state.open}>
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
