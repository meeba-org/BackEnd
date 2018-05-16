import React, {Component} from 'react';
import styles from '../../styles/Footer.scss';
import CSSModules from "react-css-modules/dist/index";
import facebookImage from '../../styles/images/facebook.png';
import {Button} from "@material-ui/core";

class Footer extends Component {
    render() {
        return (
            <div id="footer">
                <div id="footer-container">
                    <div id={"social"}>
                        <Button color="contrast" href="https://m.me/meebaOnFace" target="_blank">
                            <span className="weak"> שאלה? בעיה?</span>
                            <span className="facebook-link">צור קשר איתנו ב-</span>
                            <img src={facebookImage}/>
                        </Button>
                    </div>
                    <div id="signature">
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
