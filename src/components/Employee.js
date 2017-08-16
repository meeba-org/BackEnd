import React from 'react';
import {Field} from 'redux-form';
import PropTypes from 'prop-types';
import {Grid} from "material-ui";

class Employee extends React.Component {
    render() {
        let {name, onDelete} = this.props;
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={5}>
                        <Field name={`${name}.first_name`} type="text" component={renderField} className="cell" />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Field name={`${name}.uid`} type="text" component={renderField} className="cell" />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <button  onClick={() => onDelete()}>מחק</button>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

Employee.propTypes = {
    name: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

const renderField = ({ input, label, type, className, meta: { touched, error } }) =>
    <div>
        <input {...input} type={type} placeholder={label} className={className} />
        {touched && error && <span>{error}</span>}
    </div>;

renderField.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    className: PropTypes.string.isRequired,
};


export default Employee;
