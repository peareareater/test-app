import React from 'react';
import Typography from '@material-ui/core/Typography';
import './styles.css';

export default function Marquee({ string, onClick }) {
    return (
        <div className="marquee">
            <span className="link link_animated" onClick={() => onClick(string)}>
                <Typography>{string}</Typography>
            </span>
        </div>
    );
}
