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

    render() {
        const {onNext} = this.props;

        return (
            <Fragment>
                <FormControl>
                    <InputLabel>כרטיס אשראי</InputLabel>
                    <Input />
                </FormControl>
                <FormControl>
                    <InputLabel>תוקף</InputLabel>
                    <Input />
                </FormControl>
                <FormControl>
                    <InputLabel>3 ספרות</InputLabel>
                    <Input />
                </FormControl>
                <Button onClick={onNext}>שלם</Button>
            </Fragment>
        );
    }
}

GoPremiumPay.propTypes = {
};

export default GoPremiumPay;
