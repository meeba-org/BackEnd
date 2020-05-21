import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import React, {useEffect, useMemo, useState} from 'react';
import {getPredictions} from "../../helpers/googleMapsService";

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

const PlacesAutocomplete = ({place, onSelect}) => {
    const classes = useStyles();
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);

    const fetch = useMemo(
        () =>
            throttle(async (input, callback) => {
                const predictions = await getPredictions(input);
                callback(predictions);
            }, 200),
        [],
    );

    const initValue = async () => {
        setValue(place.name || "");
    };

    useEffect(() => {
        initValue();
    }, [place]);

    useEffect(() => {
        let active = true;

        // if (inputValue === '') {
        //     setOptions(place ? [place] : []);
        //     return undefined;
        // }

        fetch(inputValue, (autocompletePredictions) => {
            if (active) {
                let newOptions = [];

                // if (place) {
                //     newOptions = [place];
                // }

                if (autocompletePredictions) {
                    newOptions = [...newOptions, ...autocompletePredictions];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            id="google-map-demo"
            style={{maxWidth: 400, marginBottom: 15}}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={async (event, prediction) => {
                setOptions(prediction ? [prediction, ...options] : options);
                onSelect(prediction);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label="כתובת"/>
            )}
            renderOption={(option) => {
                const matches = option?.structured_formatting?.main_text_matched_substrings;
                const parts = parse(
                    option?.structured_formatting?.main_text,
                    matches?.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span key={index} style={{fontWeight: part.highlight ? 700 : 400}}>{part.text}</span>
                            ))}

                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
};
export default PlacesAutocomplete;
