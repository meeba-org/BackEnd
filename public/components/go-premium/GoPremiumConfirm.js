import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';

const GoPremiumIntro = ({onNext}) => {
    return (
        <Fragment>
            סיימת!
            <Button onClick={onNext}>סגור</Button>
        </Fragment>
    );
};

export default GoPremiumIntro;
