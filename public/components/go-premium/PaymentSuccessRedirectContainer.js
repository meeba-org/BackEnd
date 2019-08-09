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
        return (
            <h1 />
        );
    }
}

export default PaymentSuccessRedirectContainer;
