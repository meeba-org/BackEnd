import * as React from "react";
import {Field} from "redux-form";
import PropTypes from 'prop-types';
import Shift from "./Shift";

class ShiftsList extends React.Component {
    onCreate(fields) {
        let newEntity = {
        };
        fields.push(newEntity);
        this.props.onCreate(newEntity);
    }

    onUpdate(entity) {
        this.props.onUpdate(entity);
    }

    onDelete(fields, index) {
        let entityToDelete = fields.get(index);
        fields.remove(index);
        this.props.onDelete(entityToDelete);
    }

    render() {
        let {fields} = this.props;
        return (
            <div>
                {fields && fields.map((shiftName, index) =>
                    <Field component={Shift} name={shiftName} key={index}
                           onDelete={()=> this.onDelete(fields, index)}
                           onUpdate={(shift) => this.onUpdate(shift)}
                    />
                )}
            </div>
        );
    }
}

ShiftsList.propTypes = {
    fields: PropTypes.object.isRequired,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
export default ShiftsList;
