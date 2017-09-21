import * as React from "react";
import CSSModules from "react-css-modules";
import styles from "../../styles/MonthlyReport.scss";
import {Button, Card, Divider} from "material-ui";
import {CardContent, CardHeader} from "../../../node_modules/material-ui/Card/index";
import AddIcon from 'material-ui-icons/Add';

class MonthlyReport extends React.Component {
    render()
    {
        const {fields} = this.props;
        return (
            <Card id="monthly-report">
                <CardHeader title="דוח חודשי"/>

                <CardContent className="card-content">

                    <div>
                        <Button className="add-button" dense raised color="primary" onClick={() => this.onCreate(fields)}><AddIcon /></Button>
                        <Divider className="divider" />

                        {/*{fields && fields.map((employeeIndex, index) =>*/}
                            {/*<Field component={Employee} name={employeeIndex} key={index} onDelete={()=> this.onDelete(fields, index)} onUpdate={(employee) => this.onUpdate(employee)}/>*/}
                        {/*)}*/}
                    </div>

                </CardContent>
            </Card>
        );
    }
}

export default CSSModules(MonthlyReport, styles);
