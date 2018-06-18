import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from "../../styles/StatisticsCell.scss";
import CSSModules from "react-css-modules/dist/index";

class StatisticsCell extends Component {
    render() {
        return (
            <div styleName="statisticsCell">
                <hr className="h1"/>
                <div styleName="number">{this.props.num}</div>
                <hr className="h1"/>
                <div styleName="title">{this.props.title}</div>
            </div>
        );
    }
}

StatisticsCell.propTypes = {
    num: PropTypes.number,
    title: PropTypes.string.isRequired
};

export default CSSModules(StatisticsCell, styles);
