import React, {Component} from 'react';
import {Computer, Description, PhonelinkRing} from "material-ui-icons";
import styles from '../../styles/Features.scss';
import CSSModules from "react-css-modules/dist/index";
import Feature from "./Feature";
import EmployeeFeatureContent from "./EmployeeFeatureContent";
import ManagerFeatureContent from "./ManagerFeatureContent";
import ReportFeatureContent from "./ReportFeatureContent";


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
                description: <span>רישום שעות באמצעות הנייד - תמיכה <a target="_blank" href="https://play.google.com/store/apps/details?id=chenop.meeba&hl=en">באנדרואיד</a> ו<a target="_blank" href="https://itunes.apple.com/il/app/%D7%9E%D7%99%D7%91%D7%90/id1329551700?mt=8">אייפון</a></span>,
                content: <EmployeeFeatureContent/>
            },
            {
                icon: <Computer style={iconStyle} />,
                title: "המנהל",
                description: "מעקב אחר שעות, חישוב שעות נוספות, סטטיסטיקות",
                content: <ManagerFeatureContent />
            },
            {
                icon: <Description style={iconStyle} />,
                title: "הדוח החודשי",
                description: "הפקת דוח אקסל לרואה החשבון - מכיל מספר שעות עבודה לכל עובד, דמי נסיעות ושכר",
                content: <ReportFeatureContent />
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
                        <Feature
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            content={feature.content}
                            direction={0}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default CSSModules(Features, styles);

