import Button from '@material-ui/core/Button';
import CheckIcon from "@material-ui/icons/Check";
import React from 'react';
import CSSModules from "react-css-modules";
import styles from '../../styles/GoPremiumIntro.scss';

const IntroLine = CSSModules(({text}) => <div styleName="text"><CheckIcon styleName="check"/>{text}</div>, styles);

const GoPremiumIntro = ({onNext, onClose}) => {
    return (
        <div styleName="container">
            <div styleName="intro-info">
                <IntroLine text={"מספר עובדים ללא הגבלה"}/>
                <IntroLine text={"הצגת מיקום בכניסה למשמרת"}/>
                <IntroLine text={"משימות"}/>
                <IntroLine text={"גיבוי יומי"}/>
            </div>

            <div styleName="buttons-container">
                <Button styleName="interested" variant="contained" color="primary" onClick={onNext}>אני מעוניין!</Button>
                <Button onClick={onClose}>אני אחשוב על זה...</Button>
            </div>
        </div>
    );
};

export default CSSModules(GoPremiumIntro, styles);
