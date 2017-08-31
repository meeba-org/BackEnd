import React from 'react';
import {Field} from 'redux-form';
import PropTypes from 'prop-types';
import {Grid} from "material-ui";

class Employee extends React.Component {
    render() {
        let {name, onDelete, onUpdate} = this.props;
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={5}>
                        <Field name={`${name}.first_name`} type="text" component={TextInput} className="cell" onUpdate={onUpdate} />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Field name={`${name}.uid`} type="text" component={TextInput} className="cell" onUpdate={onUpdate} />
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
    name: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};


class TextInput extends React.Component {
    onUpdate(e) {
        e.preventDefault(); // I must have it - without that no re-render in UI...
        const {input, onUpdate} = this.props;
        let newValue = e.target.value;
        let fieldName = this.extractFieldName(input.name);

        input.onChange(newValue);
        onUpdate(fieldName, newValue);
    }

    extractFieldName(name) {
        if (!name && name.length <= 1)
            return null;

        let res = name.split(".");
        if (!res && res.length <= 1)
            return null;

        return res[res.length - 1];
    }

    render() {
        const { input, label, type, className, onUpdate, meta: { touched, error } } = this.props;
        return (
            <div>
                <input {...input} type={type} placeholder={label} className={className} onChange={(e) => this.onUpdate(e) }/>
                {touched && error && <span>{error}</span>}
            </div>
        )
    }
}

TextInput.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    className: PropTypes.string.isRequired,
};

export default Employee;
