import React, {Component} from 'react';
const queryString = require('query-string');

class PaymentSuccessRedirectContainer extends Component {

    componentDidMount() {
        const params = queryString.parse(this.props.location.search);

        const token = params.Token;
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
