import { call, put, takeEvery } from '@redux-saga/core/effects';
import { actionTypes } from '../actions/posts';
import { client } from '../client';

function* getPosts({ payload: theme }) {
    try {
        const payload = yield call(client.get, `r/${theme}.json`);
        const { children, dist } = payload;
        const randomIndex = Math.floor((dist - 1) * Math.random());
        const randomArticle = children[randomIndex];
        yield put({ type: actionTypes.getPostsSuccess, payload: randomArticle && randomArticle.data });
    } catch (e) {
        yield put({ type: actionTypes.getPostsError, error: e.message });
    }
}

export default function* postsSaga() {
    yield takeEvery(actionTypes.getPosts, getPosts);
}
