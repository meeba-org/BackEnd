import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import React, {Component, Fragment} from 'react';
import * as BlueSnapHelper from '../../helpers/blueSnapHelper';
import axios from "axios";

class GoPremiumPay extends Component {

    state = {
    };

    componentDidMount () {
        const {blueSnapBaseUrl} = this.props;

        // TODO this needs to be BE to BE, not cors
        axios.get(blueSnapBaseUrl + '/services/2/payment-fields-tokens')
            .then(token => {
                BlueSnapHelper.run(token);
            });
        // const script = document.createElement("script");
        //
        // script.src = blueSnapBaseUrl + "/source/web-sdk/bluesnap.js";
        // script.async = true;
        //
        // document.body.appendChild(script);
    }

    render() {
        const {onNext} = this.props;

        return (
            <Fragment>
                <FormControl>
                    <InputLabel>כרטיס אשראי</InputLabel>
                    <div data-bluesnap="ccn"></div>
                </FormControl>
                <FormControl>
                    <InputLabel>תוקף</InputLabel>
                    <div data-bluesnap="exp"></div>
                </FormControl>
                <FormControl>
                    <InputLabel>3 ספרות</InputLabel>
                    <div data-bluesnap="cvv"></div>
                </FormControl>
                <Button onClick={onNext}>שלם</Button>
            </Fragment>
        );
    }
}

GoPremiumPay.propTypes = {
};

export default GoPremiumPay;
