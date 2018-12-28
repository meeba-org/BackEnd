import React, {Component, Fragment} from 'react';
import CSSModules from "react-css-modules";
import styles from "../../styles/FAQHeader.scss";

class FAQHeader extends Component {

    render() {
        return (
            <div styleName="header">
                <div styleName="header-bg">
                    <div styleName="title">
                        שאלות ותשובות
                    </div>
                </div>
            </div>
        );
    }
}

export default CSSModules(FAQHeader, styles);
