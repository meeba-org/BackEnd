import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import React from "react";

const MbCard = ({children, title}) => {
    return (
        <Card>
            <CardHeader title={title}/>

            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
};

export default MbCard;
