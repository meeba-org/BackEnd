import React, {Component} from 'react';
import Computer from "@material-ui/icons/Computer";
import Description from "@material-ui/icons/Description";
import PhonelinkRing from "@material-ui/icons/PhonelinkRing";
import styles from '../../styles/Features.scss';
import Feature from "./Feature";
import EmployeeFeatureContent from "./EmployeeFeatureContent";
import ManagerFeatureContent from "./ManagerFeatureContent";
import ReportFeatureContent from "./ReportFeatureContent";
import MobileImageContent from "./MobileImageContent";

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
                // description: <span>רישום שעות באמצעות הנייד - תמיכה <a target="_blank" href="https://play.google.com/store/apps/details?id=chenop.meeba&hl=en">באנדרואיד</a></span>,
                sideContent: <EmployeeFeatureContent/>,
                dialogContent: <MobileImageContent />
            },
            {
                icon: <Computer style={iconStyle} />,
                title: "המנהל",
                description: "מעקב אחר שעות, מיקום העובד, חישוב שעות נוספות, סטטיסטיקות",
                sideContent: <ManagerFeatureContent />,
                dialogContent: <ManagerFeatureContent />
            },
            {
                icon: <Description style={iconStyle} />,
                title: "הדוח החודשי",
                description: "הפקת דוח אקסל לרואה החשבון - מכיל מספר שעות עבודה לכל עובד, דמי נסיעות ושכר",
                sideContent: <ReportFeatureContent />,
                dialogContent: <ReportFeatureContent />
            }
        ]
    };

    render() {
        return (
            <div styleName="features" id="features1">
                <div styleName="title">איך זה עובד?</div>
                <div styleName="sub-title">תהליכי עבודה מתקדמים</div>

                <div styleName="features-container">
                    {this.state.features.map((feature, index) =>
                        (<Feature
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            sideContent={feature.sideContent}
                            dialogContent={feature.dialogContent}
                        />)
                    )}
                </div>
            </div>
        );
    }
}

export default Features;

