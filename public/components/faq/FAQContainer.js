import React, {Component, Fragment} from 'react';
import Fade from "../Fade";
import FAQHeader from "./FAQHeader";
import CSSModules from "react-css-modules";
import styles from "../../styles/FAQContainer.scss";

const Question = ({text, onClick}) => {
    return (
        <div onClick={onClick}>
            {text}
        </div>
    );
};

const Answer = ({text}) => {
    return (
        <div>
            {text}
        </div>
    );
};

class QuestionAndAnswer extends Component {
    state = {
        collapse: true
    };

    toggleCollapse = () => {
        this.setState({collapse: !this.state.collapse});
    };

    render() {
        const {question} = this.props;

        return (
            <div>
                <Question text={question.q} onClick={this.toggleCollapse}/>

                {this.state.collapse &&
                    <Fade>
                        <Answer text={question.a}/>
                    </Fade>
                }
            </div>
        );
    }
}

class FAQContainer extends Component {
    state = {
        data: [
            {
                q: "אז מה היה לנו?",
                a: "פלאגים, פאטינות"
            },
            {
                q: "מה יהיה?",
                a: "יהיה טוב"
            }
        ]
    };

    render() {
        const {data} = this.state;
        return (
            <div styleName="faq">
                <FAQHeader />
                {data && data.map((question, index) =>
                    <QuestionAndAnswer question={question} key={index}/>
                )}
            </div>
        );
    }
}


FAQContainer.propTypes = {};
FAQContainer.defaultProps = {};

export default CSSModules(FAQContainer, styles);

