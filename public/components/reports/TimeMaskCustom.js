import React, {Component} from 'react';
import PropTypes from 'prop-types';
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

TimeMaskCustom.propTypes = {};
TimeMaskCustom.defaultProps = {};

export default TimeMaskCustom;
