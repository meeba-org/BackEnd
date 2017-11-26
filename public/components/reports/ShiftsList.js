import React from "react";
import {Field} from "redux-form";
import PropTypes from 'prop-types';
import Shift from "./Shift";
import styles from "../../styles/ShiftsList.scss";
import CSSModules from "react-css-modules";
import NoData from "../NoData";

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
        this.props.onDelete(entityToDelete);
    }

    render() {
        let {fields, showNames, mode, shouldDisplayNoData} = this.props;
        return (
            <div className="shifts-list">
                {fields && fields.map((shiftName, index) =>
                    <Field
                        component={Shift}
                        name={shiftName} key={index}
                        onDelete={()=> this.onDelete(fields, index)}
                        onUpdate={(shift) => this.onUpdate(shift)}
                        showNames={showNames}
                        mode={mode}
                    />
                )}
                {shouldDisplayNoData && (!fields || (fields.length == 0)) &&
                    <NoData text="לא נמצאו משמרות"/>
                }
            </div>
        );
    }
}

ShiftsList.propTypes = {
    fields: PropTypes.object.isRequired,
    onCreate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    showNames: PropTypes.bool,
    shouldDisplayNoData: PropTypes.bool,
    mode: PropTypes.number.isRequired,
};
export default CSSModules(ShiftsList, styles);
