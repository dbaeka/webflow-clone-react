import {takeEvery, takeLatest, call, put, all} from 'redux-saga/effects';
import {actions} from './slice';
import * as api from './api';

export function* fetchFiles({payload}) {
    try {
        const data = yield call(api.fetchFiles, payload);
        yield put(actions.fetchSuccess({data}));
    } catch (error) {
        yield put(actions.fetchFailure({error}));
    }
}

export function* moveFile({payload}) {
    try {
        // yield call(api.moveFile, payload);
        // yield put(actions.fetch({limit: 50, offset: 0}));
    } catch (error) {
        yield put(actions.fetchFailure({error}));
    }
}

// Individual exports for testing
export default function* projectFilesSaga() {
    yield all([
        yield takeEvery(actions.fetch.type, fetchFiles),
        yield takeLatest(actions.moveFile.type, moveFile)
    ])
}