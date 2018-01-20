import React, {Component} from 'react';
import {Computer, Description, PhonelinkRing} from "material-ui-icons";
import styles from '../../styles/Features.scss';
import CSSModules from "react-css-modules/dist/index";
import Feature from "./Feature";
import playStoreImage from '../../styles/images/playStore.svg';
import appStoreImage from '../../styles/images/appStore.svg';


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
                selected: true,
                content: <div>
                    <div className="badges">
                        <div className="badge">
                            <a target="_blank"
                               href="https://play.google.com/store/apps/details?id=chenop.meeba&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                                <img alt=" Google Play כעת ב-"
                                     src={playStoreImage}/>
                            </a>
                        </div>
                        <div className="badge">
                            <a target="_blank"
                               href="https://itunes.apple.com/il/app/%D7%9E%D7%99%D7%91%D7%90/id1329551700?mt=8">
                                <img alt=" Apple Store כעת ב-"
                                     src={appStoreImage}/>
                            </a>
                        </div>
                    </div>
                    <img src="../../styles/images/2.png"/>
                </div>
            },
            {
                icon: <Computer style={iconStyle} />,
                title: "המנהל",
                description: "מעקב אחר שעות, חישוב שעות נוספות, סטטיסטיקות",
                content: <div>
                    <img src="../../styles/images/sc1.png"/>
                </div>
            },
            {
                icon: <Description style={iconStyle} />,
                title: "הדוח החודשי",
                description: "הפקת דוח אקסל לרואה החשבון - מכיל מספר שעות עבודה לכל עובד, דמי נסיעות ושכר",
                content: <div>
                    <img src="../../styles/images/playStore.svg"/>
                </div>
            }
        ]
};

    onSelect = (title) => {
        let features = this.state.features.map(feature => {
            return {
                ...feature,
                selected: feature.title === title
            };
        });

        this.setState({features});
    };

    getSelectedFeature = () => this.state.features.find(feature => feature.selected);

    render() {
        let selectedFeature = this.getSelectedFeature();

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
                            onSelect={this.onSelect}
                            selected={feature.selected}
                        />
                    )}
                </div>
                <div id="feature-content">
                    {selectedFeature.content}
                </div>
            </div>
        );
    }
}

export default CSSModules(Features, styles);

