import React from 'react';
import PropTypes from 'prop-types';

class TextInput extends React.Component {
    onUpdate(e) {
        const {onUpdate, name} = this.props;
        let newValue = e.target.value;

        onUpdate(name, newValue);
    }

    render() {
        const { value, label, type, className} = this.props;
        return (
            <div>
                <input value={value} type={type} placeholder={label} className={className} onChange={(e) => this.onUpdate(e)}/>
            </div>
        );
    }
}

TextInput.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    className: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default TextInput;

