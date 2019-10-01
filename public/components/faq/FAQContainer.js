import React, {Component} from 'react';
import CSSModules from "react-css-modules";
import {MONTHLY_SUBSCRIPTION_PRICE} from "../../../constants";
import styles from "../../styles/FAQContainer.scss";
import FAQContent from "./FAQContent";
import FAQHeader from "./FAQHeader";

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
                    a: `**המנהל** עובד מול [האתר](https://www.meeba.org.il), מזין עובדים, מעדכן שעות ועוד.

**העובד** מוריד את האפליקציה ([אנדרואיד](https://play.google.com/store/apps/details?id=chenop.meeba&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1) / [אייפון](https://itunes.apple.com/il/app/%D7%9E%D7%99%D7%91%D7%90/id1329551700?mt=8)) לסלולרי ומדווח כניסה ויציאה.`
                },
                {
                    q: "כמה זה עולה?",
                    a: `מרבית היכולות הינן חינם אין כסף!  
איזה יכולות הינן בתשלום?
- הגדרת 4 עובדים ומעלה
- הגדרת 3 משימות ומעלה
- הצגת מיקום העובד בכניסה

מחיר: ${MONTHLY_SUBSCRIPTION_PRICE} ש"ח חודשי
`
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

איפה הוא עושה את כל זה? בסלולרי: [אנדרואיד](https://play.google.com/store/apps/details?id=chenop.meeba&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1), [אייפון](https://itunes.apple.com/il/app/%D7%9E%D7%99%D7%91%D7%90/id1329551700?mt=8)`
                },
                {
                    name: "commute",
                    q: "מה לגבי החזר נסיעות?",
                    a: "נסיעות ניתן למלא באחת או יותר מהדרכים הבאות:\n" +
                        "\n" +
                        "1. תשלום נסיעות קבוע על בסיס יומי או חודשי - נקבע בממשק המנהל --> [עובדים](/dashboard/employees)\n" +
                        "2. תשלום נסיעות משתנה למשמרת - מוזן על ידי העובד, יש לאפשר אופציה זו ב[הגדרות](/dashboard/user)\n"
                },
                {
                    q: "גיבויים",
                    a: `גיבוי אוטומאטי מתבצע בכל יום - עם זאת תקלות יכולות לקרות, מומלץ בכל סוף חודש להוריד ולשמור את דוח השעות החודשי`
                },
                {
                    name: "break",
                    q: "הפסקות",
                    a: `[החוק](https://www.kolzchut.org.il/he/%D7%94%D7%A4%D7%A1%D7%A7%D7%95%D7%AA_%D7%91%D7%A2%D7%91%D7%95%D7%93%D7%94) מחייב מתן הפסקות במשמרות מעל אורך מסוים.  
מיבא תומכת במקרה הבסיסי בלבד שהוא ניכוי הפסקה במשמרת שאורכה מעל 6 שעות.  
- את אורך ההפסקה ניתן לקבוע ב: הגדרות --> אורך הפסקה (דק')
- עבור משמרת ספיצפית - ניתן להזין אורך הפסקה אחר במסך עריכת משמרת
- בדוח ניתן לראות את זמן ההפסקה לכל משמרת ביחידות עשרוניות - לדוגמא 0.5 עבור 30 דקות.
- זמן ההפסקה כמובן מנוכה מאורך המשמרת
`
                },
                {
                    name: "tasks",
                    q: "משימות",
                    a: `משימה היא בעצם אפשרות נוספת לסווג משמרות לקבוצות.  
משימה יכולה להיות אירוע חד פעמי או קטיגוריה.  
ניתן להגדיר משימות ולכל משימה תתי משימות.  
לכל משימה ותת משימה שתגדירו יהיה טאב נוסף באקסל עם כל המשמרות ששויכו אליה.  
עובד יכול לשייך את המשמרת שלו לאירוע / משימה.  

### כיצד אני מאפשר משימות?
הגדרות --> משימות - שים לב שכעת התווסף בתוך הגדרות טאב חדש "משימות"   
--> היכנס והגדר את המשימות

### היכן אני רואה דוח לפי משימות?
לאחר אפשור משימות - מצד ימין נוסף לתפריט "דוח משימות"    


### דוגמאות 
כיצד יכול להיראות עץ המשימות שלכם:  
#### אולם אירועים:
 - בר מצווה משה כהן 
 - חתונה יעל וגל
 - ברית יוסי ישראלי

#### חברת תכנה:
 - צוות FrontEnd  
   - Testing  
   - Development
 - צוות Backend
   - Testing
   - Development

#### סיווג ללקוחות:
- תנובה
- אסם
- שטראוס`
                }
            ]
        };

        this.initData();
    }

    componentDidMount() {
        this.expandQuestionIfNeeded();
    }

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

