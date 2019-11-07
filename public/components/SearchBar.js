import InputBase from '@material-ui/core/InputBase';
import {withStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import {debounce} from "../helpers/utils";

const SearchBar = ({classes, onChange}) => (
    <div className={classes.search}>
        <div className={classes.searchIcon}>
            <SearchIcon/>
        </div>
        <InputBase
            onChange={e => {
                let value = e.target.value;

                debounce(() => onChange(value), 250)();
            }}
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
        marginLeft: "10px",
        display: "flex",
        backgroundColor: fade("#000000", 0.1),
        '&:hover': {
            backgroundColor: fade("#000000", 0.25),
            [theme.breakpoints.up('xs')]: {
                width: '100%'
            },
            [theme.breakpoints.between('sm', 'xl')]: {
                width: '300px'
            }
        },
        width: '150px',
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
        height: '40px'
    },
    inputInput: {
        padding: "8px 20px 8px 8px",
        width: '100%',
    }
});

export default withStyles(styles)(SearchBar);
