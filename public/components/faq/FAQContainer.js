import React, {Component, Fragment} from 'react';
import FAQHeader from "./FAQHeader";
import CSSModules from "react-css-modules";
import styles from "../../styles/FAQContainer.scss";
import FAQContent from "./FAQContent";

class FAQContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
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
5. לנהל פרטי עובדים

איפה הוא עושה את כל זה? ב[אתר](https://www.meeba.org.il)!

מה לגבי מובייל? ה[אתר](https://www.meeba.org.il) מותאם גם למובייל - כלומר, בסלולרי שלכם פתחו את הדפדפן וגילשו ל-https://meeba.org.il`
                },
                {
                    q: "מה העובד יכול לעשות?",
                    a: `1. להיכנס ולצאת ממשמרת
2. לראות פרטי משמרות עבור חודש מסוים

איפה הוא עושה את כל זה? בסלולרי: [אנדרואיד](https://play.google.com/store/apps/details?id=chenop.meeba&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1), אייפון בשלבי הקמה`
                },
                {
                    name: "commute",
                    q: "מה לגבי החזר נסיעות?",
                    a: `נסיעות ניתן למלא באחת או יותר מהדרכים הבאות:

1. תשלום נסיעות קבוע על בסיס יומי או חודשי - נקבע בממשק המנהל --> [עובדים](/dashboard/employees)
2. תשלום נסיעות משתנה למשמרת - מוזן על ידי העובד, יש לאפשר אופציה זו ב[הגדרות](/dashboard/user)`
                },
            ]
        };

        this.initData();
    }

    initData() {
        let id = 0;

        this.state.data.forEach(q => {
            q.id = id++;
            q.collapse = true;
        });
    }

    toggleCollapse = (questionId) => {
        const {data} = this.state;
        let question = data.find(q => q.id === questionId);
        question.collapse = !question.collapse;

        data.map(q => q.id === questionId ? question: q);

        this.setState({data});
    };

    expandQuestionIfNeeded = () => {
        const {data} = this.state;
        const {params} = this.props;
        let name = params.name;
        if (!name)
            return;

        let question = data.find(q => q.name === name);
        question.collapse = false;
        data.map(q => q.name === name ? question: q);
        this.setState({data});
    };

    componentDidMount() {
        this.expandQuestionIfNeeded();
    }

    render() {
        const {data} = this.state;
        const {params} = this.props;

        return (
            <div styleName="faq">
                <FAQHeader />
                <FAQContent data={data} scrollToId={params.name} toggleCollapse={this.toggleCollapse}/>
            </div>
        );
    }
}


FAQContainer.propTypes = {};
FAQContainer.defaultProps = {};

export default CSSModules(FAQContainer, styles);

