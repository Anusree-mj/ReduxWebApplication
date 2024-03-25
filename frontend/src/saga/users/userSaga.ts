import { takeEvery, put, call } from 'redux-saga/effects';
import { getLoginApi } from '../../services/users';
import {
    getLoginAction,
    getLoginFailureAction,
    getLoginSuccessAction
} from '../../store/user/userReducer'


function* getLoginActionSaga(action: {
    type: string;
    payload: { email: '', image: '',handleLoginSuccess:(userData:any)=>void }
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

export function* userWatcher() {
    yield takeEvery(getLoginAction, getLoginActionSaga);
}