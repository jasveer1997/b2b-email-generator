import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import withReducer from '../../helper/reducer';
import withSaga from '../../helper/saga';
import createActions from '../../helper/actions';

import {ADD_USER, FETCH_ALL_USERS} from './actionTypes';
import reducer from './reducer';
import saga from './saga';

const mapStateToProps = (state) => {
    const { appData: { eGen = {}, addUser = {} } = {} } = state;
    return {
        usersData: eGen,
        addUserData: addUser,
    };
}

const mapDispatchToProps = dispatch => ({
    fetchUsers: option => dispatch(createActions(FETCH_ALL_USERS)(option)),
    addNewUser: option => dispatch(createActions(ADD_USER)(option)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducerHelper = withReducer({ name: "appData", reducer });

const withSagaHelper = withSaga({ name: "eGen", saga });

export default compose(setDisplayName('Email Generator'), withReducerHelper, withSagaHelper, withConnect);
