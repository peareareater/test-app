export const actionTypes = {
    add: 'favourite/add',
    remove: 'favourite/remove',
};

const add = (id) => ({ type: actionTypes.add, payload: id });
const remove = (id) => ({ type: actionTypes.remove, payload: id });

export { add, remove };
