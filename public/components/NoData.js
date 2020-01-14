import React, {Component} from 'react';
import styles from '../styles/NoData.scss';
import PropTypes from 'prop-types';

class NoData extends Component {
    render() {
        let text = this.props.text || "לא נמצאו תוצאות";
        return (
            <div styleName="no-data">
                {text}
            </div>
        );
    }
}

NoData.propTypes = {
    text: PropTypes.string,
};

export default NoData;


