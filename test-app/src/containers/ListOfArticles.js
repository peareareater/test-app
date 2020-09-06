import { connect } from 'react-redux';
import { statuses } from '../constants';
import { add, remove as removeFromFavourites } from '../actions/favourites';
import { remove as removePost, setPosts } from '../actions/posts';
import ListOfArticles from '../components/ListOfArticles'


function mapStateToProps(state) {
    const { posts, favourites } = state;
    return {
        posts: posts.present,
        favourites: favourites.posts,
        loading: state.status === statuses.running,
    };
}
export default connect(mapStateToProps, { add, removeFromFavourites, removePost, setPosts })(ListOfArticles);
