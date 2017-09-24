import React from 'react';
import PropTypes from 'prop-types';
import {Grid, IconButton} from "material-ui";
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowDown from 'material-ui-icons/KeyboardArrowDown';

class EmployeeReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isCollapsed: true
        };
    }

    onUpdate(e, name) {
        let {input,  onUpdate} = this.props;

        let employee = {
            ...input.value,
            [name]: e.target.value,
        };

        input.onChange(employee);
        onUpdate(employee);
    }

    toggleClicked() {
        this.setState({isCollapsed: !(this.state.isCollapsed)});
    }

    render() {
        let {input} = this.props;
        let toggleButton =  this.state.isCollapsed ? <KeyboardArrowLeft/> : <KeyboardArrowDown/>;
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={2}>
                        <IconButton onClick={()=> this.toggleClicked()}>{toggleButton}</IconButton>
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

