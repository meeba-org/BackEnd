import React, {Component} from 'react';
import './styles/Features.scss';
import employeeImage from "../../styles/images/labor.png";
import managerImage from "../../styles/images/manager.png";
import accountantImage from "../../styles/images/profits.png";
import EmployeeFeatureContent from "./EmployeeFeatureContent";
import Feature from "./Feature";
import ManagerFeatureContent from "./ManagerFeatureContent";
import MobileImageContent from "./MobileImageContent";
import ReportFeatureContent from "./ReportFeatureContent";

class Features extends Component {

    state = {
        features: [
            {
                icon: <img src={employeeImage} loading="lazy" />,
                title: "העובד",
                description: <span>רישום שעות באמצעות הנייד - תמיכה <a target="_blank" rel="noopener noreferrer" href="https://play.google.com/store/apps/details?id=chenop.meeba&hl=en">באנדרואיד</a> ו<a target="_blank" rel="noopener noreferrer" href="https://itunes.apple.com/il/app/%D7%9E%D7%99%D7%91%D7%90/id1329551700?mt=8">אייפון</a></span>,
                sideContent: <EmployeeFeatureContent/>,
                dialogContent: <MobileImageContent />
            },
            {
                icon: <img src={managerImage} loading="lazy" />,
                title: "המנהל",
                description: "מעקב אחר שעות, מיקום העובד, חישוב שעות נוספות, סטטיסטיקות",
                sideContent: <ManagerFeatureContent />,
                dialogContent: <ManagerFeatureContent />
            },
            {
                icon: <img src={accountantImage} loading="lazy" />,
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

