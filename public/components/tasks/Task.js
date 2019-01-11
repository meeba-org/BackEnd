import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import CSSModules from "react-css-modules";
import ListItem from "../../../node_modules/@material-ui/core/ListItem/ListItem";
import ListItemText from "../../../node_modules/@material-ui/core/ListItemText/ListItemText";
import styles from "../../styles/Employees.scss";

class Task extends Component {
    state = {
        hover: false
    };

    onMouseEnter = () => {
        this.setState({hover: true});
    };

    onMouseLeave = () => {
        this.setState({hover: false});
    };

    render() {
        const {data, openTaskModal, onDelete} = this.props;

        return (
            <ListItem button onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <ListItemText primary={
                    <Fragment>
                        {data.title}
                        {this.state.hover &&
                        <Fragment>
                            <Tooltip title="הגדרות נוספות" placement="top">
                                <IconButton className={styles["elem"]}
                                            onClick={() => openTaskModal(data)}><SettingsIcon/></IconButton>
                            </Tooltip>
                            <Tooltip title="מחיקה" placement="top">
                                <IconButton onClick={onDelete}><DeleteIcon/></IconButton>
                            </Tooltip>
                        </Fragment>
                        }
                    </Fragment>
                }/>
            </ListItem>
        );
    }
}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    openTaskModal: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,

};
Task.defaultProps = {};

export default CSSModules(Task, styles);

