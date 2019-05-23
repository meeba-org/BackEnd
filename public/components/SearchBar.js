import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import {withStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';

const SearchBar = ({classes, onChange}) => (
    <div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchIcon/>
        </div>
        <InputBase
            onChange={e => onChange(e.target.value)}
            placeholder="חיפוש…"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
        />
    </div>
);

const styles = theme => ({
    search: {
        borderRadius: 4,
        marginRight: "10px",
        display: "flex",
        backgroundColor: fade("#000000", 0.1),
        '&:hover': {
            backgroundColor: fade("#000000", 0.25),
            width: '300px'
        },
        marginLeft: 0,
        width: '200px',
        transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
    searchIcon: {
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px'
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        padding: "8px 20px 8px 8px",
        width: '100%',
    }
});

export default withStyles(styles)(SearchBar);
