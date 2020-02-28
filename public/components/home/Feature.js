import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import "../../styles/Feature.scss";
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
                <div styleName="feature">
                    <div styleName="image">{icon}</div>
                    <div styleName="side1">
                        <div styleName="title-container">
                            <div styleName="title">{title}</div>
                        </div>
                        <div styleName="description">{description}</div>
                    </div>
                    <div styleName="side2" onClick={this.handleOpen}>
                        {sideContent}
                    </div>
                </div>
                <Dialog maxWidth={'md'} onClose={this.handleClose} open={this.state.open}>
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
