import React, {Component} from 'react';
import styles from '../styles/NoData.scss';
import CSSModules from 'react-css-modules';

class NoData extends Component {
    render() {
        return (
            <div className="no-data">
                לא נמצאו תוצאות
            </div>
        );
    }
}

export default CSSModules(NoData, styles);


