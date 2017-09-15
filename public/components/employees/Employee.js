import React from 'react';
import PropTypes from 'prop-types';
import {Grid, IconButton, Input} from "material-ui";
import DeleteIcon from 'material-ui-icons/Delete';

class Employee extends React.Component {
    onUpdate(e, name) {
        let {input,  onUpdate} = this.props;

        let employee = {
            ...input.value,
            [name]: e.target.value,
        };

        input.onChange(employee);
        onUpdate(employee);
    }

    render() {
        let {input, onDelete} = this.props;
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={3}>
                        <Input value={input.value.first_name} placeholder="שם" onChange={(e) => this.onUpdate(e, "first_name")} />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Input value={input.value.uid} placeholder="ת.ז." onChange={(e) => this.onUpdate(e, "uid")} />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <IconButton onClick={onDelete}><DeleteIcon /></IconButton>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

Employee.propTypes = {
    input: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default Employee;
