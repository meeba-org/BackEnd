/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import {TextField, Paper} from '@material-ui/core';
import {MenuItem} from '@material-ui/core/Menu';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {withStyles} from '@material-ui/core/styles';

function renderInput(inputProps) {
    const { classes, autoFocus, value, ref, ...other } = inputProps;

    return (
        <TextField
            autoFocus={autoFocus}
            className={classes.textField}
            value={value}
            inputRef={ref}
            InputProps={{
                classes: {
                    input: classes.input,
                },
                ...other,
            }}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={index} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
                    ) : (
                        <strong key={index} style={{ fontWeight: 500 }}>
                            {part.text}
                        </strong>
                    );
                })}
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

function getSuggestions(value, suggestions) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

const styles = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0,
        "z-index": 1
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    textField: {
        width: '100%',
    },
});

class AutoComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: props.suggestions,
        };
    }

    handleSuggestionsFetchRequested = ({ value }) => {
        let allSuggestions = this.props.suggestions;
        this.setState({
            suggestions: getSuggestions(value, allSuggestions),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        });
    };

    handleSelect = (event, { suggestion}) => {
        this.props.onSelect(suggestion);
    };

    render() {
        const { classes, placeholder, disabled } = this.props;

        return (
            <Autosuggest
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderInputComponent={renderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                onSuggestionSelected={this.handleSelect}
                inputProps={{
                    autoFocus: true,
                    classes,
                    placeholder,
                    value: this.state.value,
                    onChange: this.handleChange,
                    disabled: disabled
                }}
            />
        );
    }
}

AutoComplete.propTypes = {
    classes: PropTypes.object.isRequired,
    suggestions: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};

export default withStyles(styles)(AutoComplete);
