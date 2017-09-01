import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from "material-ui";

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
                        <TextInput value={input.value.first_name} name='first_name' type="text" className="cell" onUpdate={(name, value) => this.onUpdate(name, value)} />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextInput value={input.value.uid} name='uid' type="text" className="cell" onUpdate={(name, value) => this.onUpdate(name, value)} />
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
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


class TextInput extends React.Component {
    onUpdate(e) {
        const {onUpdate, name} = this.props;
        let newValue = e.target.value;

        onUpdate(name, newValue);
    }

    render() {
        const { value, label, type, className} = this.props;
        return (
            <div>
                <input value={value} type={type} placeholder={label} className={className} onChange={(e) => this.onUpdate(e) }/>
            </div>
        )
    }
}

TextInput.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    className: PropTypes.string.isRequired,
};

export default Employee;

