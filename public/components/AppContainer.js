import React from 'react';
import { connect } from 'react-redux';
import { meFromToken, meFromTokenSuccess, meFromTokenFailure, resetToken } from '../actions/actions';
import axios from 'axios';
import config from "../config";

class AppContainer extends React.Component {
    componentWillMount() {
        this.props.loadUserFromToken();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserFromToken: () => {
            let token = sessionStorage.getItem('jwtToken');
            if(!token || token === '') {//if there is no token, dont bother
                return;
            }

            //fetch user from token (if server deems it's valid token)
            dispatch(meFromToken(token));
            return axios({
                method: 'get',
                url: `${config.ROOT_URL}/authenticate`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(function (response) {
                sessionStorage.setItem('jwtToken', response.payload.data.token);
                dispatch(meFromTokenSuccess(response.payload));
            }).catch(function (response) {
                sessionStorage.removeItem('jwtToken');//remove token from storage
                dispatch(meFromTokenFailure(response.payload));
            });
        },
        resetMe: () =>{
            sessionStorage.removeItem('jwtToken'); //remove token from storage
            dispatch(resetToken());
        }
    };
};


export default connect(null, mapDispatchToProps)(AppContainer);
