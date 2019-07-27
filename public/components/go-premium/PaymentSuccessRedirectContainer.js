import React, {Component} from 'react';

class PaymentSuccessRedirectContainer extends Component {

    componentDidMount() {
        let msg = 'user_payed';
        console.log(msg);
        top.postMessage(msg, "*");
    }

    render() {
        return (
            <h1 />
        );
    }
}

export default PaymentSuccessRedirectContainer;
