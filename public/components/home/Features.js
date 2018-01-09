import React, {Component} from 'react';
import {Computer, Description, PhonelinkRing} from "material-ui-icons";
import {withStyles} from 'material-ui/styles';

const styles1 = {
    root: {
        height: 48,
        width: 48,
    }
};

class Features extends Component {
    icon = {
        root: {
            height: "48px"
        }
    };

    state = {
        features: [
            {
                icon: <PhonelinkRing />,
                title: "העובד",
                description: "רישום שעות באמצעות הנייד - תמיכה באנדרואיד ואייפון"
            },
            {
                icon: <Computer />,
                title: "המנהל",
                description: "מעקב אחר שעות, חישוב שעות נוספות, סטטיסטיקות"
            },
            {
                icon: <Description />,
                title: "הדוח החודשי",
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

export default withStyles(styles1)(Features);//, styles1);

