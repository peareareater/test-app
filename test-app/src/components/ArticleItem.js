import React from 'react';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { useDrag, useDrop } from 'react-dnd';

export default function ArticleItem({ post, handleFavourite, removePost, isFavourite, index, moveCard }) {
    const { thumbnail, id } = post;
    const classes = useStyles();
    const ref = React.useRef();

    const [, drop] = useDrop({
        accept: 'POST',
        hover(item) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'POST', id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drag(drop(ref));
    return (
        <div ref={ref} className={classes.gridItem} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <GridListTile>
                <a target="_blank" href={post.url} className={classes.link}>
                    {thumbnail && thumbnail !== 'self' ? (
                        <img src={thumbnail} alt={post.title} className={classes.thumbnail} />
                    ) : (
                        <AssignmentIcon className={classes.thumbnail} />
                    )}
                </a>
                <GridListTileBar
                    title={post.title}
                    subtitle={<span>Author: {post.author}</span>}
                    actionIcon={
                        <div className={classes.iconBox}>
                            <IconButton
                                className={isFavourite(id) ? classes.favouriteIconActive : classes.favouriteIcon}
                                onClick={() => handleFavourite(id)}
                            >
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton className={classes.deleteIcon} onClick={() => removePost(id)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    }
                />
            </GridListTile>
        </div>
    );
}

const useStyles = makeStyles(() => ({
    thumbnail: {
        opacity: 0.5,
        margin: 'auto',
        color: 'grey',
        width: 245,
        height: 180,
    },
    iconBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    gridItem: {
        width: '48%',
        margin: '1%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    favouriteIconActive: {
        padding: 5,
        color: 'red',
    },
    favouriteIcon: {
        padding: 5,
        color: 'red',
        opacity: 0.3,
    },
    deleteIcon: {
        padding: 5,
        color: 'black',
    },
    link: {
        display: 'flex',
        textDecoration: 'none !important',
    },
    dragging: {
        opacity: 0.5,
    },
    root: {},
}));
