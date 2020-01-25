import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import "../styles/MbCard.scss";

const MbCard = ({children, title}) => {
    return (
        <Card styleName="container" elevation={0}>
            <CardHeader title={title}/>

            <CardContent styleName="card-content">
                {children}
            </CardContent>
        </Card>
    );
};

export default MbCard;
