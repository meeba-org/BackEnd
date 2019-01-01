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
                    " 1. ניהול ורישום שעות העובדים\n" +
                    " 2. הפקת דוח אקסל בלחיצת כפתור עבור רו\"ח"
            },
            {
                q: "איך זה עובד?",
                a: `\n\n**המנהל** עובד מול [האתר](https://www.meeba.org.il), מזין עובדים, מעדכן שעות ועוד.
\n\n**העובד** מוריד את [האפליקציה](https://play.google.com/store/apps/details?id=chenop.meeba&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1) לסלולרי ומדווח כניסה ויציאה.
`
            },
            {
                q: "כמה זה עולה?",
                a: "כלום, חינם אין כסף!"
            },
            {
                q: "מה המנהל יכול לעשות?",
                a: `1. לראות מי במשמרת כרגע
2. דוח יומי וחודשי
3. לערוך שעות עובדים
4. לראות מיקום העובד בכניסה
5. לנהל פרטי עובדים`
            },
            {
                q: "מה העובד יכול לעשות?",
                a: `איזה יכולות יש למנהל?
1. להיכנס ולצאת ממשמרת
2. לראות פרטי משמרות עבור חודש מסוים`
            },
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

