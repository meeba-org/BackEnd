import React, {Component, Fragment} from 'react';
import FAQHeader from "./FAQHeader";
import CSSModules from "react-css-modules";
import styles from "../../styles/FAQContainer.scss";
import FAQContent from "./FAQContent";

class FAQContainer extends Component {
    state = {
        data: [
            {
                q: "אז מה היה לנו?",
                a: "פלאגים, פאטינות"
            },
            {
                q: "מה יהיה?",
                a: "יהיה טוב"
            }
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

