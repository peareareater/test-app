import { actionTypes } from '../actions/posts';
import { parseItem } from '../helpers';
import update from 'immutability-helper';
import undoable from 'redux-undo';

const initialState = [];

function posts(state = initialState, { type, payload }) {
    switch (type) {
        case actionTypes.getPostsSuccess:
            return update(state, { $set: state.concat(parseItem(payload)) });
        case actionTypes.remove:
            return update(state, {
                $set: state.slice().filter((post) => post.id !== payload),
            });
        case actionTypes.setPosts:
            const { dragIndex, hoverIndex } = payload;
            const dragCard = state[dragIndex];
            return update(state, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            });
        default:
            return state;
    }
}

export default undoable(posts, { limit: 10 });
