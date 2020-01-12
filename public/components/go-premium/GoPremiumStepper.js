import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import withStyles from '@material-ui/core/styles/withStyles';
import React from 'react';

const styles = () => ({
    root: {
        width: '90%',
    },
    backButton: {
        marginRight: 4,
    },
    instructions: {
        marginTop: 4,
        marginBottom: 4,
    }
});

function getSteps() {
    return ['למה להיות מנוי?', 'תשלום', 'סיום'];
}

const GoPremiumStepper = ({classes, activeStep}) => {
    const steps = getSteps();

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default withStyles(styles)(GoPremiumStepper);
