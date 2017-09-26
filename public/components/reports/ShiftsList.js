import * as React from "react";
import {Field} from "redux-form";
import PropTypes from 'prop-types';

class ShiftsList extends React.Component {

    render() {
        let {fields} = this.props;
        return (
            <div>
                {fields.map((shift, index) =>
                    <div key={index}>
                        <h4>
                            Shift #{index + 1} clock in: {shift.clockInTime}
                        </h4>
                        <Field
                            name={`${shift}.clockInTime`}
                            type="text"
                            component="input"
                            label="Clock In"
                        />
                    </div>
                )}
            </div>
        );
    }
}

ShiftsList.propTypes = {
    fields: PropTypes.object.isRequired,
    onCreateShift: PropTypes.func.isRequired,
    onUpdateShift: PropTypes.func.isRequired,
    onDeleteShift: PropTypes.func.isRequired,
};
export default ShiftsList;
