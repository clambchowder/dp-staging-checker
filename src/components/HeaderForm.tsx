import { Checkbox, FormControl, ListItemText, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DeployStatus } from "../models";
import { DeployStatusDisplay } from "../utils";

const HeaderForms = () => {
    const [searchParms, setSearchParams] = useSearchParams();
    const [statuses, setStatuses] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof statuses>) => {
        const {
          target: { value },
        } = event;

        setSearchParams(`?status=${value}`)

        setStatuses(
          // On autofill we get a the stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    // todo
    // clear search button
    // use navigation handler

    return (
        <header>
            <Typography variant={'h1'} sx={{marginTop: 0, textAlign: 'center'}}>
                DP Staging Checker
            </Typography>
            <form >
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="status-multiple-checkbox-label">Status</InputLabel>
                    <Select
                        label={'Status'}
                        labelId={'status-multiple-checkbox-label'}
                        multiple={true}
                        onChange={handleChange}
                        value={statuses}
                        renderValue={(selected) => (
                            selected.length > 2 ? 'Multiple' : selected.map((x) => DeployStatusDisplay[x as DeployStatus]).join(", ")
                        )}
                    >
                    {Object.keys(DeployStatus).map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={statuses.includes(name)} />
                            <ListItemText primary={DeployStatusDisplay[name]} />
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </form>
        </header>
    )
}

export default HeaderForms
