import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import React, {Component, Fragment} from 'react';
import * as BlueSnapHelper from '../../helpers/blueSnapHelper';

class GoPremiumPay extends Component {

    state = {
    };

    componentDidMount () {
        // BlueSnapHelper.run(this.props.paymentToken);
    }

    updatePaymentData = (key, value) => {
        this.setState({
            [key]: value
        });
    }
    render() {
        const {onNext, error} = this.props;
        const {cc, expire, cvv} = this.state;

        return (
            <Fragment>
                <FormControl>
                    <InputLabel>כרטיס אשראי</InputLabel>
                    <Input onChange={event => this.updatePaymentData("cc", event.target.value)}/>
                </FormControl>
                <FormControl>
                    <InputLabel>תוקף</InputLabel>
                    <Input onChange={event => this.updatePaymentData("expire", event.target.value)}/>
                </FormControl>
                <FormControl>
                    <InputLabel>3 ספרות</InputLabel>
                    <Input onChange={event => this.updatePaymentData("cvv", event.target.value)}/>
                </FormControl>
                {error && <div styleName="error-msg">{error}</div>}
                <Button onClick={() => onNext({
                    cc,
                    expire,
                    cvv
                })}>שלם</Button>
            </Fragment>
        );
    }
}

GoPremiumPay.propTypes = {
};

export default GoPremiumPay;
