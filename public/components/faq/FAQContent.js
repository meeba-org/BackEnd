import React, {Component, Fragment} from 'react';
import CSSModules from "react-css-modules";
import styles from "../../styles/FAQContent.scss";
import Fade from "../Fade";
import IconButton from "@material-ui/core/IconButton";
import Add from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";

const Question = CSSModules(({text, onClick, collapse}) => {
    return (
        <div styleName="question" onClick={onClick}>
            <div styleName="text">{text}</div>
            <IconButton className={styles["icon"]}>{collapse ? <Add /> : <Minus />}</IconButton>
        </div>
    );
}, styles);

const Answer = CSSModules(({text}) => {
    return (
        <div styleName="answer">
            <ReactMarkdown source={text} />
        </div>
    );
}, styles);

class QuestionAndAnswer extends Component {
    state = {
        collapse: true
    };

    toggleCollapse = () => {
        this.setState({collapse: !this.state.collapse});
    };

    render() {
        const {question, collapse} = this.props;

        return (
            <div id={question.id}>
                <Question text={question.q} onClick={this.toggleCollapse} collapse={collapse}/>

                <Fade isVisible={!collapse}>
                    <Answer text={question.a}/>
                </Fade>
            </div>
        );
    }
}

class FAQContent extends Component {
    calcCollapse = (question, expandQuestionId) => {
        if (!expandQuestionId || !question.id)
            return true;

        return question.id !== expandQuestionId;
    };

    componentDidUpdate() {
        const element = document.getElementById(this.props.expandQuestionId);

        element.scrollIntoView({behavior: 'smooth'});
    }

    render() {
        const {data, expandQuestionId} = this.props;

        return (
            <div styleName="content">
                {data && data.map((question, index) =>
                    <QuestionAndAnswer question={question} key={index} collapse={this.calcCollapse(question, expandQuestionId)}/>
                )}
            </div>
        );
    }
}

FAQContent.propTypes = {
    expandQuestionId: PropTypes.string,
};
FAQContent.defaultProps = {};

export default CSSModules(FAQContent, styles);
