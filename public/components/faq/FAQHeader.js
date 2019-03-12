import React, {Component} from 'react';
import CSSModules from "react-css-modules";
import styles from "../../styles/FAQHeader.scss";
import HomeAppBar from '../home/HomeAppBar';

class FAQHeader extends Component {

    render() {
        return (
            <div styleName="header">
                <div styleName="header-bg">
                    <HomeAppBar />
                    <div styleName="title">
                        שאלות ותשובות
                    </div>
                </div>
            </div>
        );
    }
}

export default CSSModules(FAQHeader, styles);
