import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';

const GoPremiumIntro = ({onNext}) => {
    return (
        <Fragment>
            Pay!
            <Button onClick={onNext}>להצטרפות</Button>
        </Fragment>
    );
};

export default GoPremiumIntro;
