import TextField from "@material-ui/core/TextField";
import React, {useRef, useState} from 'react';

const StartOfMonthField = ({value, onChange}) => {
    const [error, setError] = useState(false);

    const handleChange = e => {
        const value = parseInt(e.target.value);
        setError(false);

        if (Number.isNaN(value) || value < 1 || value > 30) {
            setError(true);
            e.target.select();
        }
        else {
            onChange(value);
        }
    };

    return (
        <TextField
            label="היום הראשון לדוח החודשי"
            error={error}
            value={value}
            onChange={handleChange}
            type="number"
            helperText="מאיזה יום עד איזה יום יחושב הדוח החודשי (1-30)"
        />
    );
};

export default StartOfMonthField;
