import { takeEvery, put, call } from 'redux-saga/effects';
import {
    getAdminLoginApi,
    getUsersDetailsApi,
} from '../../services/admin';
import {
    getAdminLoginAction,
    getAdminLoginSuccessAction,
    getAdminLoginFailureAction,
    getUsersDetailsAction,
    getUsersDetailsFailureAction,
    getUsersDetailsSuccessAction,
} from '../../store/admin/adminReducer';

// loginSaga
function* getAdminLoginActionSaga(action: {
    type: string;
    payload: { email: '', password: '', handleAdminLoginSuccess: (adminData: any) => void }
}): any {
    try {
        const response = yield call<any>(getAdminLoginApi, action.payload);
        if (response.status === 'ok') {
            action.payload.handleAdminLoginSuccess(response.admin)
            yield put(getAdminLoginSuccessAction(response.admin))
        } else {
            yield put(getAdminLoginFailureAction(response.message))

        }
    } catch (err) {
        yield put(getAdminLoginFailureAction(err))
    }
}

// get users details
function* getUsersDetailsActionSaga(): any {
    try {
        const response = yield call<any>(getUsersDetailsApi);
        if (response.status === 'ok') {
            yield put(getUsersDetailsSuccessAction(response.users))
        } else {
            yield put(getUsersDetailsFailureAction(response.message))

        }
    } catch (err) {
        yield put(getUsersDetailsFailureAction(err))
    }
}


export function* adminWatcher() {
    yield takeEvery(getAdminLoginAction, getAdminLoginActionSaga);
    yield takeEvery(getUsersDetailsAction, getUsersDetailsActionSaga);
}