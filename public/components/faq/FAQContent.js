import React, {Component, Fragment} from 'react';
import CSSModules from "react-css-modules";
import styles from "../../styles/FAQContent.scss";
import Fade from "../Fade";
import IconButton from "@material-ui/core/IconButton";
import Add from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import ReactMarkdown from "react-markdown";

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
    render() {
        const {question, onClick} = this.props;
        const collapse = question.collapse;

        return (
            <div id={question.name}>
                <Question text={question.q} onClick={() => onClick(question.id)} collapse={collapse}/>

                <Fade isVisible={!collapse}>
                    <Answer text={question.a}/>
                </Fade>
            </div>
        );
    }
}

class FAQContent extends Component {
    componentDidUpdate() {
        const {scrollToId} = this.props;
        if (!scrollToId)
            return;

        const element = document.getElementById(scrollToId);

        element.scrollIntoView({behavior: 'smooth'});
    }

    render() {
        const {data, toggleCollapse} = this.props;

        return (
            <div styleName="content">
                {data && data.map((question, index) =>
                    <QuestionAndAnswer
                        question={question}
                        key={index}
                        onClick={toggleCollapse}
                    />
                )}
            </div>
        );
    }
}

FAQContent.propTypes = {
};
FAQContent.defaultProps = {};

export default CSSModules(FAQContent, styles);
