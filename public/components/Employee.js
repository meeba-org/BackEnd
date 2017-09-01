import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from "material-ui";
import TextInput from "./TextInput";

class Employee extends React.Component {
    onUpdate(propName, value) {
        let {input, onUpdate} = this.props;

        let employee = {
            ...input.value,
            [propName]: value,
        };

        input.onChange(employee);
        onUpdate(employee);
    }

    render() {
        let {input, onDelete} = this.props;
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={5}>
                        <TextInput value={input.value.first_name} name="first_name" type="text" className="cell" onUpdate={(name, value) => this.onUpdate(name, value)} />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextInput value={input.value.uid} name="uid" type="text" className="cell" onUpdate={(name, value) => this.onUpdate(name, value)} />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <button  onClick={onDelete}>מחק</button>
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

