import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import styles from "../../styles/Feature.scss";
import Dialog from "@material-ui/core/Dialog";

class Feature extends Component {
    state = {
        open: false
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    render() {
        let {icon, title, description, sideContent, dialogContent} = this.props;

        return (
            <Fragment>
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
                </div>
                <Dialog maxWidth={false} onClose={this.handleClose} open={this.state.open}>
                    {dialogContent}
                </Dialog>
            </Fragment>
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

export default Feature;
