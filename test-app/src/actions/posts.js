export const actionTypes = {
    getPosts: 'posts/getPosts',
    getPostsSuccess: 'posts/getPostsSuccess',
    getPostsError: 'posts/getPostsError',
    remove: 'posts/remove',
    setPosts: 'posts/setPosts',
};

const getPosts = (theme) => ({ type: actionTypes.getPosts, payload: theme });
const remove = (id) => ({ type: actionTypes.remove, payload: id });
const setPosts = (data) => ({ type: actionTypes.setPosts, payload: data });

export { getPosts, remove, setPosts }