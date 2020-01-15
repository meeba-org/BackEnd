import React, {Component} from 'react';
import '../../styles/Footer.scss';
import facebookImage from '../../styles/images/facebook.png';
import Button from "@material-ui/core/Button";

class Footer extends Component {
    render() {
        return (
            <div styleName="footer">
                <div styleName="footer-container">
                    <div>
                        <Button color="inherit" href="https://m.me/meebaOnFace" target="_blank">
                            <span styleName="weak"> שאלה? בעיה?</span>
                            <span>צור קשר איתנו ב-</span>
                            <img src={facebookImage}/>
                            <div className="fb-like" styleName="like" data-href="https://www.facebook.com/meebaOnFace" data-layout="button_count" data-action="like" data-size="large" data-show-faces="false" data-share="false" />
                        </Button>
                    </div>
                    <div styleName="signature">
                        <div>נוצר ע"י <a target="_blank" href="https://www.linkedin.com/in/chenop/">חן אופנהיים</a>, טלפון: 052-8421440</div>
                    </div>
                    <div styleName="term-usage"><a target="_blank" href="https://docs.google.com/document/d/1vGWUvLTo2izTOBTmJBpjkKPwm4bpRkVGV9IsyJSxVzw/edit?usp=sharing">תנאי שימוש</a></div>
                </div>
            </div>
        );
    }
}

Footer.propTypes = {};
Footer.defaultProps = {};

export default Footer;
