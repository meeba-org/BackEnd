import React, {Component} from 'react';

class PaymentSuccessRedirectContainer extends Component {

    componentDidMount() {
        const {location} = this.props;
        const token = location.query.Token;
        const msg = {
            token,
            msg: 'user_payed'
        };
        top.postMessage(msg, "*");
    }

    render() {
        console.log(this.props);
        return (
            <h1>Payment Success2!</h1>
        );
    }
}

export default PaymentSuccessRedirectContainer;
