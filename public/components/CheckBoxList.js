import React, {Component} from 'react';
import List, {ListItem, ListItemText} from '@material-ui/core/List';
import {Checkbox} from "@material-ui/core";
import PropTypes from 'prop-types';

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
        const {items} = this.props;

        return (
            <List>
                {items.map((item, index) => (
                    <ListItem
                        key={index}
                        dense
                        button
                        onClick={() => this.handleToggle(item)}
                    >
                        <Checkbox
                            checked={this.state.checked.indexOf(item) !== -1}
                            tabIndex={-1}
                            disableRipple
                        />
                        <ListItemText primary={item.firstName} />
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

export default CheckBoxList;

