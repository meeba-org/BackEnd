import React, {Component} from 'react';
import styles from '../../styles/Footer.scss';
import CSSModules from "react-css-modules/dist/index";
import facebookImage from '../../styles/images/facebook.png';
import Button from "@material-ui/core/Button";

class Footer extends Component {
    render() {
        return (
            <div styleName="footer">
                <div styleName="footer-container">
                    <div styleName={"social"}>
                        <Button color="inherit" href="https://m.me/meebaOnFace" target="_blank">
                            <span styleName="weak"> שאלה? בעיה?</span>
                            <span styleName="facebook-link">צור קשר איתנו ב-</span>
                            <img src={facebookImage}/>
                        </Button>
                    </div>
                    <div styleName="signature">
                        <h5>©2017 - נוצר ע"י <a target="_blank" href="https://www.linkedin.com/in/chenop/">
                            חן אופנהיים
                        </a></h5>
                    </div>
                </div>
            </div>
        );
    }
}

Footer.propTypes = {};
Footer.defaultProps = {};

export default CSSModules(Footer, styles);
