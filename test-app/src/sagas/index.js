import posts from "./posts";
import { all } from '@redux-saga/core/effects';

export default function* rootSaga() {
   yield all([
      posts(),
   ])
}