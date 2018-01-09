import React, {Component} from 'react';
import {Computer, Description, PhonelinkRing} from "material-ui-icons";
import styles from '../../styles/Features.scss';
import CSSModules from "react-css-modules/dist/index";
import Feature from "./Feature";

const iconStyle = {
    height: "48px",
    width: "48px",
};

class Features extends Component {

    state = {
        features: [
            {
                icon: <PhonelinkRing style={iconStyle} />,
                title: "העובד",
                description: <span>רישום שעות באמצעות הנייד - תמיכה <a target="_blank" href="https://play.google.com/store/apps/details?id=chenop.meeba&hl=en">באנדרואיד</a> ואייפון</span>
            },
            {
                icon: <Computer style={iconStyle} />,
                title: "המנהל",
                description: "מעקב אחר שעות, חישוב שעות נוספות, סטטיסטיקות"
            },
            {
                icon: <Description style={iconStyle} />,
                title: "האקסל",
                description: "הפקת דוח אקסל לרואה החשבון - הכולל מספר שעות עבודה לכל עובד, דמי נסיעות ושכר"
            }
        ]
    };

    render() {
        return (
            <div id="features">
                <div className="title">שמחים שאתם איתנו!</div>
                <div className="sub-title">תהליכי עבודה מתקדמים</div>

                <div className="features-container">
                    {this.state.features.map((feature, index) =>
                        <Feature key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />


                    )}
                </div>
            </div>
        );
    }
}

export default CSSModules(Features, styles);

