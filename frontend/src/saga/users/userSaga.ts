import { takeEvery, put, call } from 'redux-saga/effects';
import { getLoginApi, getSignupApi } from '../../services/users';
import {
    getLoginAction,
    getLoginFailureAction,
    getLoginSuccessAction,
    getSignupAction,
    getSignupSuccessAction,
    getSignupFailureAction
} from '../../store/user/userReducer'


function* getLoginActionSaga(action: {
    type: string;
    payload: { email: '', password: '', handleLoginSuccess: (userData: any) => void }
}): any {
    try {
        const response = yield call<any>(getLoginApi, action.payload);
        console.log('response from backend', response)
        if (response.status === 'ok') {
            action.payload.handleLoginSuccess(response.user)
            yield put(getLoginSuccessAction(response.user))
        } else {
            console.log('responsemessage', response.message)
            yield put(getLoginFailureAction(response.message))

        }
    } catch (err) {
        yield put(getLoginFailureAction(err))
    }
}

function* getSignupActionSaga(action: {
    type: string;
    payload: { name: '', email: '', password: '', image: '', handleSignupSuccess: (userData: any) => void }
}): any {
    try {
        const response = yield call<any>(getSignupApi, action.payload);
        console.log('response from backend', response)
        if (response.status === 'ok') {

            action.payload.handleSignupSuccess(response.user)
            yield put(getSignupSuccessAction(response.user))
        } else {
            console.log('responsemessage', response.message)
            yield put(getSignupFailureAction(response.message))

        }
    } catch (err) {
        yield put(getSignupFailureAction(err))
    }
}

export function* userWatcher() {
    yield takeEvery(getLoginAction, getLoginActionSaga);
    yield takeEvery(getSignupAction, getSignupActionSaga)
}