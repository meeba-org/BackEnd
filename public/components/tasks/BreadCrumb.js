import React, {Fragment} from "react";

export const BreadCrumb = ({data}) => {
    return (
        <Fragment>
            <span>HOME</span>
            {data && data.map((task) => (
                <div>{task.title}</div>
            ))}
        </Fragment>
    );
};
