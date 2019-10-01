import React, {Component} from 'react';
import CSSModules from "react-css-modules";
import styles from "../../styles/GoPremiumPay.scss";

class GoPremiumPay extends Component {

    render() {
        const {paymentUrl} = this.props;
        return (
            <div styleName="pay-container">
                <iframe src={paymentUrl} />
            </div>
        );
    }
}

GoPremiumPay.propTypes = {
};

export default CSSModules(GoPremiumPay, styles);
