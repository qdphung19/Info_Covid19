import { FormControl, FormHelperText, InputLabel, makeStyles, NativeSelect } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: `${theme.spacing(3)}px 0`,
        minWidth: 120,
    },
}));

export default function CountrySelector({ value, handleOnChange, countries }) {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="contry-selector" shrink>
                Pays
            </InputLabel>
            <NativeSelect
                value={value}
                onChange={handleOnChange}
                inputProps={{
                    name: "contry",
                    id: "contry-selector",
                }}
            >
                {countries.map((country) => {
                    return (
                        <option key={country.ISO2} value={country.ISO2.toLowerCase()}>
                            {country.Country}
                        </option>
                    );
                })}
            </NativeSelect>
            <FormHelperText>Choisissez un pay</FormHelperText>
        </FormControl>
    );
}
