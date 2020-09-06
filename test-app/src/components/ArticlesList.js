import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import ArticleItem from './ArticleItem';

export default function ArticlesList({ articles, favourites, removeFromFavourites, add, removePost, setPosts }) {
    const classes = useStyles();
    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            setPosts({ dragIndex, hoverIndex });
        },
        [articles]
    );

    const handleFavourite = (id) => {
        if (isFavourite(id)) {
            removeFromFavourites(id);
            return;
        }
        add(id);
    };
    const isFavourite = (id) => favourites.indexOf(id) >= 0;

    const renderArticle = (post, idx) => {
        return (
            <ArticleItem
                key={`post-${idx}`}
                post={post}
                handleFavourite={handleFavourite}
                removePost={removePost}
                isFavourite={isFavourite}
                moveCard={moveCard}
                index={idx}
            />
        );
    };
    return (
        <div className={classes.root}>
            {articles && (
                <GridList cellHeight={180} className={classes.gridList}>
                    {articles.map((post, idx) => renderArticle(post, idx))}
                </GridList>
            )}
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        margin: '0 0 0 3% !important',
        width: 800,
    },
}));
