import { actionTypes } from '../actions/favourites';
import update from 'immutability-helper';

const initialState = {
    posts: [],
};

export default function favourites(state = initialState, { type, payload }) {
    let index;
    switch (type) {
        case actionTypes.add:
            index = state.posts.indexOf(payload);
            return update(state, {
                posts: { $set: index >= 0 ? state : state.posts.concat(payload) },
            });
        case actionTypes.remove:
            index = state.posts.indexOf(payload);
            if (index >= 0) {
                return update(state, {
                    posts: { $splice: [[index, 1]] },
                });
            }
            return state;
        default:
            return state;
    }
}
