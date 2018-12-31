import React, {Component, Fragment} from 'react';
import FAQHeader from "./FAQHeader";
import CSSModules from "react-css-modules";
import styles from "../../styles/FAQContainer.scss";
import FAQContent from "./FAQContent";

class FAQContainer extends Component {
    state = {
        data: [
            {
                q: "אודות מיבא",
                a: "מיבא היא אפליקציית **שעון נוכחות** ו**מחשבון שכר** לעסקים קטנים, מבוססת סלולרי. \n" +
                    "מטרותיה העיקריות הן:\n" +
                    "\n" +
                    " 1. ניהול רישום השעות\n" +
                    " 2. הפקת דוח אקסל בלחיצת כפתור עבור רו\"ח"
            },
            {
                q: "כמה זה עולה",
                a: "כלום, חינם אין כסף!"
            }
        ]
    };

    render() {
        const {data} = this.state;
        return (
            <div styleName="faq">
                <FAQHeader />
                <FAQContent data={data}/>
            </div>
        );
    }
}


FAQContainer.propTypes = {};
FAQContainer.defaultProps = {};

export default CSSModules(FAQContainer, styles);

