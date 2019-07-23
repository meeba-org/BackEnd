import Button from '@material-ui/core/Button';
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from '../../styles/GoPremiumFinish.scss';
import Icon from '@material-ui/core/Icon';

const GoPremiumFinish = ({onClose}) => {
    return (
        <div styleName="container">
            <div styleName="check">
                <Icon styleName="icon" color="primary" style={{ fontSize: 200 }}>
                    check
                </Icon>

                <div styleName="text">תודה - מקווים להצדיק את האמון</div>
            </div>

            <div styleName="buttons-container">
                <Button variant="contained" color="primary"  onClick={onClose}>סגור</Button>
            </div>
        </div>
    );
};

export default CSSModules(GoPremiumFinish, styles);
