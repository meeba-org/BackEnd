import React, {Component} from 'react';
import styles from "../../styles/Features.scss";
import CSSModules from "react-css-modules";
import {Computer, Description, PhonelinkRing} from "material-ui-icons";

class Features extends Component {
    state = {
        features: [
            {
                icon: <PhonelinkRing />,
                title: "העובד",
                description: "רישום שעות באמצעות הנייד"
            },
            {
                icon: <Computer />,
                title: "המנהל",
                description: "מעקב שעות, יצירת דוחות"
            },
            {
                icon: <Description />,
                title: "האקסל",
                description: "המערכת תפיק דוח אקסל לרואה החשבון - הכולל מספר שעות עבודה לכך עובד, דמי נסיעות ושכר"
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
                        <div className="feature" key={index}>
                            <div className="feature-icon">{feature.icon}</div>
                            <div className="feature-title">{feature.title}</div>
                            <div className="feature-description">{feature.description}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default CSSModules(Features, styles);
