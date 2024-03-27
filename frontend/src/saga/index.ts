import { fork, all } from "redux-saga/effects";

import { userWatcher } from "./users/userSaga";
import { adminWatcher } from "./admin/adminSaga";
export default function* rootSaga(): any {
    yield all([
        yield fork(userWatcher),
        yield fork(adminWatcher)
    ]);
}
