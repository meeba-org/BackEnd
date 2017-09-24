import React from 'react';
import PropTypes from 'prop-types';
import {Grid, IconButton} from "material-ui";
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';

class EmployeeReport extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {input, isCollapsed, onToggle} = this.props;
        let toggleButton =  isCollapsed(input.value.uid) ? <KeyboardArrowLeft/> : <KeyboardArrowDown/>;
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={2}>
                        <IconButton onClick={()=> onToggle(input.value.uid)}>{toggleButton}</IconButton>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        {input.value.uid}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        {input.value.firstName} {input.value.lastName}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

EmployeeReport.propTypes = {
    input: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default EmployeeReport;

