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
    onChange(e) {
        const {input} = this.props;
        e.preventDefault();

        input.onChange(e.target.value);
    }

    render() {
        const { input, label, type, className, onUpdate, meta: { touched, error } } = this.props;
        return (
            <div>
                <input {...input} type={type} placeholder={label} className={className} onChange={(e) => {input.onChange(e.target.value); onUpdate(input.name, e.target.value);}}/>
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
