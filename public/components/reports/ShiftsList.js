import * as React from "react";
import {Field} from "redux-form";

class ShiftsList extends React.Component {

    render() {
        let {fields} = this.props;
        return (
            <div>
                {fields.map((shift, index) =>
                    <div>
                        <h4>
                            Shift #{index + 1} clock in: {shift.clockInTime}
                        </h4>
                        <Field
                            name={`${shift}.clickInTime`}
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

export default ShiftsList;
