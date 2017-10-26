import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchCompany} from "../../actions/companyActions";

class CompanyContainer extends React.Component {
    componentDidMount() {
        this.props.fetchCompany();
    }

    render() {
        const {company} = this.props;

        return (
            <div>
                {!!company &&
                    <div>Company: {company.name}</div>
                }
            </div>
        );
    }
}

CompanyContainer.propTypes = {
    company: PropTypes.object,
    // handleSubmit: PropTypes.func.isRequired,
    fetchCompany: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        initialValues: {
            company: state.company
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCompany: () => {dispatch(fetchCompany());},
        // updateCompany: (company) => {dispatch(updateCompany(company));},
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyContainer);


