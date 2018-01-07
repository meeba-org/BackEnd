import React, {Component} from 'react';
import styles from '../../styles/Footer.scss';
import CSSModules from "react-css-modules/dist/index";

class Footer extends Component {
    render() {
        return (
            <div id="footer">
                <h5>©2017 - נוצר ע"י <a target="_blank" href="https://www.linkedin.com/in/chenop/">חן אופנהיים</a></h5>
            </div>
        );
    }
}

Footer.propTypes = {};
Footer.defaultProps = {};

export default CSSModules(Footer, styles);
