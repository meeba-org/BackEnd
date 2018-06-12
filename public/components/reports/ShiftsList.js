import React from "react";
import {Field} from "redux-form";
import PropTypes from 'prop-types';
import Shift from "./Shift";
import CSSModules from "react-css-modules";
import NoData from "../NoData";
import styles from "../../styles/ShiftsList.scss";
import animation from "../../styles/Animation.scss";
import {CSSTransition, TransitionGroup} from 'react-transition-group';

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

    render() {
        let {fields, showNames, mode, shouldDisplayNoData} = this.props;
        return (
            <div styleName="shifts-list">
                {fields && fields.map((shiftName, index) =>
                    <TransitionGroup key={index}>
                        <CSSTransition
                            key={index}
                            timeout={500}
                            classNames={{ ...animation }}
                            appear
                        >
                            <Field
                                component={Shift}
                                name={shiftName} key={index}
                                onDelete={() => this.onDelete(fields, index)}
                                onUpdate={(shift, input) => this.onUpdate(shift, input)}
                                showNames={showNames}
                                mode={mode}
                            />
                        </CSSTransition>
                    </TransitionGroup>
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
