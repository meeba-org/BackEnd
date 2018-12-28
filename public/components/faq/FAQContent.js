import React, {Component, Fragment} from 'react';
import CSSModules from "react-css-modules";
import styles from "../../styles/FAQContent.scss";
import Fade from "../Fade";
import IconButton from "@material-ui/core/IconButton";
import Add from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';

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
            {text}
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
        const {question} = this.props;
        const {collapse} = this.state;

        return (
            <div>
                <Question text={question.q} onClick={this.toggleCollapse} collapse={collapse}/>

                {!this.state.collapse &&
                <Fade>
                    <Answer text={question.a}/>
                </Fade>
                }
            </div>
        );
    }
}

class FAQContent extends Component {
    render() {
        const {data} = this.props;
        
        return (
            <div styleName="content">
                {data && data.map((question, index) =>
                    <QuestionAndAnswer question={question} key={index}/>
                )}
            </div>
        );
    }
}

FAQContent.propTypes = {};
FAQContent.defaultProps = {};

export default CSSModules(FAQContent, styles);
