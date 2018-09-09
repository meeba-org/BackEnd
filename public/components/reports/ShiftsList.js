import React from "react";
import Field from "redux-form/es/Field";
import PropTypes from 'prop-types';
import ShiftContainer from "./ShiftContainer";
import CSSModules from "react-css-modules";
import NoData from "../NoData";
import styles from "../../styles/ShiftsList.scss";
import Fade from "../Fade";

class ShiftsList extends React.PureComponent {
    onCreate(fields) {
        let newEntity = {};
        fields.push(newEntity);
        this.props.onCreate(newEntity);
    }

    onUpdate(entity, input) {
        this.props.onUpdate(entity, input);
    }

    onDelete(fields, index) {
        let entityToDelete = fields.get(index);
        this.props.onDelete(entityToDelete);
    }

    onEdit(fields, index) {
        let entityToEdit = fields.get(index);
        this.props.onEdit(entityToEdit);
    }

    render() {
        let {fields, showNames, mode, shouldDisplayNoData} = this.props;
        return (
            <div styleName="shifts-list">
                {fields && fields.map((shiftName, index) =>
                    (<Fade key={index}>
                            <Field
                                component={ShiftContainer}
                                name={shiftName} key={index}
                                onDelete={() => this.onDelete(fields, index)}
                                onEdit={() => this.onEdit(fields, index)}
                                onUpdate={(shift, input) => this.onUpdate(shift, input)}
                                showNames={showNames}
                                mode={mode}
                            />
                    </Fade>)
                )}
                {shouldDisplayNoData && (!fields || (fields.length === 0)) &&
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
    onEdit: PropTypes.func.isRequired,
    showNames: PropTypes.bool,
    shouldDisplayNoData: PropTypes.bool,
    mode: PropTypes.number.isRequired,
};
export default CSSModules(ShiftsList, styles);
