import React, {Component} from 'react';

class PaymentSuccessRedirectContainer extends Component {

    componentDidMount() {
        let msg = 'user_payed';
        console.log(this.props);
        top.postMessage(msg, "*");
    }

    render() {
        console.log(this.props)
        return (
            <h1>Payment Success2!</h1>
        );
    }
}

export default PaymentSuccessRedirectContainer;
