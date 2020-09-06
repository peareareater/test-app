import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';
import UndoRedo from '../components/UndoRedo';

const mapStateToProps = (state) => {
    return {
        canUndo: state.posts.present.length > 0,
        canRedo: state.posts.present.length > 0,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUndo: () => dispatch(UndoActionCreators.undo()),
        onRedo: () => dispatch(UndoActionCreators.redo())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo)
