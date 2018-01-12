import React, {Component} from 'react';
import MaskedInput from 'react-text-mask';

class TimeMaskCustom extends Component {
    render() {
        return (
            <MaskedInput
                {...this.props}
                mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                placeholderChar={'\u2000'}
                guide
                showMask
            />
        );
    }
}

export default TimeMaskCustom;
