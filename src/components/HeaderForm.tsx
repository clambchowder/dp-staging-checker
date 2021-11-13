import { Checkbox, FormControl, ListItemText, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import useFilterParams, { IFilterParams } from "../hooks/useFilterParams";
import { DeployStatus } from "../models";
import { DeployStatusDisplay, nameof } from "../utils";

const HeaderForms = () => {
    const [filterParams, setFilterParams] = useFilterParams();

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const { target: { value, name } } = event;
        setFilterParams({
            ...filterParams,
            [name]: value
        })
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
                        name={String(nameof<IFilterParams>("status"))}
                        value={filterParams.status as string[]}
                        renderValue={(selected) => (
                            selected.length > 2 ? 'Multiple' : selected.map((x) => DeployStatusDisplay[x as DeployStatus]).join(", ")
                        )}
                    >
                    {Object.keys(DeployStatus).map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={filterParams.status.includes(name as DeployStatus)} />
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
