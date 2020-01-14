import HomeIcon from "@material-ui/icons/Home";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import React from "react";

import styles from "../../styles/BreadCrumb.scss";

const BreadCrumb = ({data, onSelectTask}) => {
    return (
        <div styleName="breadcrumb">
            <HomeIcon styleName="item-text" onClick={() => onSelectTask(null)}/>
            <div styleName="items">
                {data && data.map((task, index) => (
                    <div key={index} styleName="item">
                        <div styleName="arrow"><KeyboardArrowLeftIcon/></div>
                        <div styleName={0 === index ? "": "item-text"} onClick={() => onSelectTask(task)}>{task.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BreadCrumb;
