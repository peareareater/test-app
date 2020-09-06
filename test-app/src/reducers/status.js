import { actionTypes } from '../actions/posts';
import { statuses } from '../constants';

const initialState = statuses.idle;

export default function status(state = initialState, { type }) {
    switch (type) {
        case actionTypes.getPosts:
            return statuses.running;
        case actionTypes.getPostsSuccess:
            return statuses.success;
        case actionTypes.getPostsError:
            return statuses.error;
        default:
            return state;
    }
}
