import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "../../styles/StatisticsCell.scss";

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

export default StatisticsCell;
