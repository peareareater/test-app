import React from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default function UndoRedo({ onUndo, onRedo }) {
    return (
        <div className="undo-redo">
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button onClick={onUndo}>Undo</Button>
                <Button onClick={onRedo}>Redo</Button>
            </ButtonGroup>
        </div>
    )
}