import React from 'react';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ThemeItem from './ThemeItem';
import { connect } from 'react-redux';
import { getPosts } from '../actions/posts';

const themes = ['ReactJS', 'Angular', 'VueJS', 'Frontend'];

function ListOfThemes({ getPosts }) {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                    {themes.map((value) => (
                        <ThemeItem value={value} key={`marquee-${value}`} getPosts={getPosts} />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default connect(null, { getPosts })(ListOfThemes)