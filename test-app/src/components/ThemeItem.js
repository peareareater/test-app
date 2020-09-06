import React from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Marquee from './Marquee';

export default function ThemeItem({ value, getPosts }) {
    const classes = useStyle();
    return (
        <Grid key={value} item className={classes.item}>
            <Paper className={classes.paper}>
                <Marquee string={value} onClick={getPosts}/>
            </Paper>
        </Grid>
    );
}

const useStyle = makeStyles((theme) => ({
    item: {
        width: '100%',
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        margin: 'auto',
        height: 50,
        width: '60%',
        maxWidth: 800,
    },
}));
