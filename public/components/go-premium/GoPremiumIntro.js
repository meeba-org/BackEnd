import Button from '@material-ui/core/Button';
import CheckIcon from "@material-ui/icons/Check";
import React from 'react';
import {MONTHLY_SUBSCRIPTION_PRICE} from "../../../constants";
import './styles/GoPremiumIntro.scss';

const IntroLine = ({text}) => <div styleName="text"><CheckIcon styleName="check"/>{text}</div>;

const GoPremiumIntro = ({onNext, onClose}) => {
    return (
        <div styleName="container">
            <div styleName="price-container">
                <div styleName="price">
                    <div styleName="label">עלות חודשית:</div>
                    <div styleName="inner-price">
                        <div styleName="number">{MONTHLY_SUBSCRIPTION_PRICE}</div>
                        <div styleName="symbol">ש"ח</div>
                    </div>
                    <div styleName="erased number">6 ש"ח לעובד</div>
                </div>
                <div styleName="comment">עוזרים לעסקים הקטנים בתקופת הקורונה 🙏🏻</div>
            </div>

            <div styleName="intro-info">
                <IntroLine text={"מספר עובדים ללא הגבלה"}/>
                <IntroLine text={"הצגת מיקום בכניסה למשמרת"}/>
                <IntroLine text={"משימות"}/>
            </div>

            <div styleName="buttons-container">
                <Button styleName="interested" variant="contained" color="primary" onClick={onNext}>אני מעוניין!</Button>
                <Button onClick={onClose}>אני אחשוב על זה...</Button>
            </div>
        </div>
    );
};

export default GoPremiumIntro;
