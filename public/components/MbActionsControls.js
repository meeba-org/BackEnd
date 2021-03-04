import Divider from "@material-ui/core/Divider";
import React, {Fragment} from 'react';
import "../styles/MbActionsControls.scss";

const MbActionsControls = ({direction = "row", children}) => {
    return (
        <Fragment>
            <div styleName="controls-line" style={{flexDirection: direction }}>
                {children}
            </div>

            <Divider styleName="divider"/>
        </Fragment>
    );
};

export default MbActionsControls;
