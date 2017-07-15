import React from "react";
import CSSModules from "react-css-modules";
import styles from "../styles/Content.scss";
import {Card, CardActions, CardText, CardTitle, FlatButton, RaisedButton} from "material-ui";

class Content extends React.Component {
    render() {
        return (
            <div id="content">
                <Card>
                    <CardTitle title="מיבה" subtitle="מעקב נוכחות"/>
                    <CardText>
                        בדיקת היתכנות לפריימוורק עם תמיכה בעברית וכתיבה מימין לשמאל
                    </CardText>
                    <CardActions>
                        <RaisedButton label="אישור" primary={true}/>
                        <FlatButton label="ביטול"/>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

//
export default CSSModules(Content, styles);
