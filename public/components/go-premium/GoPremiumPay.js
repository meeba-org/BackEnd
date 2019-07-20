import React, {Component, Fragment} from 'react';
import CSSModules from "react-css-modules";
import styles from "../../styles/GoPremiumPay.scss";

class GoPremiumPay extends Component {

    render() {
        return (
            <div styleName="pay-container">
                <iframe src={"https://testicredit.rivhit.co.il/payment/PaymentFullPage.aspx?GroupId=1f904a93-332c-4d32-aa54-e9b71298b2bb"} />
            </div>
        );
    }
}

GoPremiumPay.propTypes = {
};

export default CSSModules(GoPremiumPay, styles);
