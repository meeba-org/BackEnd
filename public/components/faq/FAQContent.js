import IconButton from "@material-ui/core/IconButton";
import Add from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import React, {Component} from 'react';
import ReactMarkdown from "react-markdown";
import styles from "../../styles/FAQContent.scss";
import Fade from "../Fade";

const Question = ({text, onClick, collapse}) => {
    return (
        <div styleName="question" onClick={onClick}>
            <div styleName="text">{text}</div>
            <IconButton className={styles["icon"]}>{collapse ? <Add /> : <Minus />}</IconButton>
        </div>
    );
};

const Answer = ({text}) => {
    return (
        <div styleName="answer">
            <ReactMarkdown source={text} />
        </div>
    );
};

const AnswerFooter = () => {
    return (
        <div styleName="answer-footer">
            לא מספיק ברור? מחכים לשאלות שלכם ב<a href={"https://m.me/meebaOnFace"}>צ'אט</a>
        </div>
    );
};

class QuestionAndAnswer extends Component {
    render() {
        const {question, onClick} = this.props;
        const collapse = question.collapse;

        return (
            <div id={question.name}>
                <Question text={question.q} onClick={() => onClick(question.id)} collapse={collapse}/>

                <Fade isVisible={!collapse}>
                    <div>
                        <Answer text={question.a}/>
                        <AnswerFooter />
                    </div>
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
                    (<QuestionAndAnswer
                        question={question}
                        key={index}
                        onClick={toggleCollapse}
                    />)
                )}
            </div>
        );
    }
}

FAQContent.propTypes = {
};
FAQContent.defaultProps = {};

export default FAQContent;
