import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    root: {
        justifyContent: "flex-start",
        display: "flex"
    }
});

class CheckBoxList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
        };
    }

    handleToggle(value) {
        const {onCheck} = this.props;
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];


        if (currentIndex === -1) {
            newChecked.push(value);
            onCheck(value, true);
        } else {
            newChecked.splice(currentIndex, 1);
            onCheck(value, false);
        }

        this.setState({
            checked: newChecked,
        });
    }

    render() {
        const {items, classes} = this.props;

        return (
            <List>
                {items.map((item, index) => (
                    <ListItem
                        key={index}
                        variant="contained"
                        button
                        onClick={() => this.handleToggle(item)}
                    >
                        <Checkbox
                            checked={this.state.checked.indexOf(item) !== -1}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText classes={{root: classes.root}} primary={item.fullName} />
                    </ListItem>
                ))}
            </List>
        );
    }
}

CheckBoxList.propTypes = {
    onCheck: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
};
CheckBoxList.defaultProps = {};

export default withStyles(styles)(CheckBoxList);

