import React, {Component} from 'react';
import styles from '../styles/NoData.scss';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';

class NoData extends Component {
    render() {
        let text = this.props.text || "לא נמצאו תוצאות";
        return (
            <div className="no-data">
                {text}
            </div>
        );
    }
}

NoData.propTypes = {
    text: PropTypes.string,
};

export default CSSModules(NoData, styles);


