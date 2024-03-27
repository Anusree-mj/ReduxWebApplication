import { takeEvery, put, call } from 'redux-saga/effects';
import { getLoginApi, getSignupApi, getUploadApi, getUserProfileApi } from '../../services/users';
import {
    getLoginAction,
    getLoginFailureAction,
    getLoginSuccessAction,
    getSignupAction,
    getSignupSuccessAction,
    getSignupFailureAction,
    updateProfileAction,
    updateProfileFailureAction,
    updateProfileSuccessAction,
    getUserProfileAction,
    getUserProfileFailureAction,
    getUserProfileSuccessAction
} from '../../store/user/userReducer'
import Cookies from 'js-cookie';

// loginSaga
function* getLoginActionSaga(action: {
    type: string;
    payload: { email: '', password: '', handleLoginSuccess: (userData: any) => void }
}): any {
    try {
        const response = yield call<any>(getLoginApi, action.payload);
        if (response.status === 'ok') {
            // Cookies.set('jwt', response.user.jwt, { expires: 7 });
            action.payload.handleLoginSuccess(response.user)
            yield put(getLoginSuccessAction(response.user))
        } else {
            yield put(getLoginFailureAction(response.message))

        }
    } catch (err) {
        yield put(getLoginFailureAction(err))
    }
}

//signup saga
function* getSignupActionSaga(action: {
    type: string;
    payload: { name: '', email: '', password: '', image: '', handleSignupSuccess: (userData: any) => void }
}): any {
    try {
        const response = yield call<any>(getSignupApi, action.payload);
        if (response.status === 'ok') {
            // Cookies.set('jwt', response.user.jwt, { expires: 7 });
            action.payload.handleSignupSuccess(response.user)
            yield put(getSignupSuccessAction(response.user))
        } else {
            yield put(getSignupFailureAction(response.message))

        }
    } catch (err) {
        yield put(getSignupFailureAction(err))
    }
}

//get user saga
function* getUserProfileActionSaga(action: {
    type: string;
    payload: { handleSignupSuccess: (status: '') => void }
}): any {
    try {
        const response = yield call<any>(getUserProfileApi);
        if (response.status === 'ok') {
            action.payload.handleSignupSuccess(response.user)
            yield put(getSignupSuccessAction(response.user))
        } else {
            yield put(getSignupFailureAction(response.message))

        }
    } catch (err) {
        yield put(getSignupFailureAction(err))
    }
}

// update saga
function* updateUserProfileSaga(action: {
    type: string;
    payload: { name: '', email: '', image: '', handleUpdateSuccess: (userData: any) => void }
}): any {
    try {
        const response = yield call<any>(getUploadApi, action.payload);
        if (response.status === 'ok') {
            action.payload.handleUpdateSuccess(response.user)
            yield put(updateProfileSuccessAction(response.user))
        } else {
            yield put(updateProfileFailureAction(response.message))

        }
    } catch (err) {
        yield put(updateProfileFailureAction(err))
    }
}
export function* userWatcher() {
    yield takeEvery(getLoginAction, getLoginActionSaga);
    yield takeEvery(getSignupAction, getSignupActionSaga);
    yield takeEvery(getUserProfileAction, getUserProfileActionSaga);
    yield takeEvery(updateProfileAction, updateUserProfileSaga);
}