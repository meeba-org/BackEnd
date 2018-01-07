import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from "../../styles/Features.scss";
import Feature from "./Feature";

class Features extends Component {
    state = {
        features: [
            {
                icon: "",
                title: "העובד",
                description: "רישום שעות באמצעות הנייד"
            }
        ]
    }
    render() {
        return (
            <div id="features">
                <h4>אז איך זה מתבצע?</h4>
                {this.state.features.map((feature) =>
                    <Feature
                        // icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                )}
            </div>
        );
    }
}

Features.propTypes = {};
Features.defaultProps = {};

export default Features;
