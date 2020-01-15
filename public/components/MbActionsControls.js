import Divider from "@material-ui/core/Divider";
import React, {Fragment} from 'react';
import "../styles/MbActionsControls.scss";

const MbActionsControls = ({children}) => {
    return (
        <Fragment>
            <div styleName="controls-line">
                {children}
            </div>

            <Divider styleName="divider"/>
        </Fragment>
    );
};

export default MbActionsControls;
