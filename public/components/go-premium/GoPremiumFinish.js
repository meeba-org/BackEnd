import Button from '@material-ui/core/Button';
import React from 'react';
import '../../styles/GoPremiumFinish.scss';
import Icon from '@material-ui/core/Icon';

const GoPremiumFinish = ({onClose, error}) => {
    const hasError = !!error;

    return (
        <div styleName="container">
            <div styleName="check">
                <Icon styleName={hasError ? 'error' : 'success'} color="primary" style={{ fontSize: 200 }}>
                    {hasError ? 'error' : 'check'}
                </Icon>

                <div styleName="text">{hasError ? ' שגיאה! צור עימנו קשר בפייסבוק' :  'הפרטים התקבלו בהצלחה - תודה!'}</div>
                {hasError &&
                    <div styleName="text">{error}</div>
                }
            </div>

            <div styleName="buttons-container">
                <Button variant="contained" color="primary"  onClick={onClose}>סגור</Button>
            </div>
        </div>
    );
};

export default GoPremiumFinish;
