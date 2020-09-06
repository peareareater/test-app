import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ArticlesList from './ArticlesList';
import { LinearProgress } from '@material-ui/core';
import React from 'react';

export default function ListOfArticles({ posts, loading, favourites, add, removeFromFavourites, removePost, setPosts }) {
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <ArticlesList
                    articles={posts}
                    favourites={favourites}
                    add={add}
                    removeFromFavourites={removeFromFavourites}
                    removePost={removePost}
                    setPosts={setPosts}
                />
                {loading && <LinearProgress style={{ width: '50%', margin: '10px auto' }} />}
            </div>
        </DndProvider>
    );
}
