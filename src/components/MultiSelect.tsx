import { Checkbox, FormControl, ListItemText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { FC } from "react";
import { IFilterParams } from "../hooks/useFilterParams";
import { IKeyValuePair } from "../models";

interface IMultiSelectProps {
    name: string;
    displayName: string;
    filterParams: IFilterParams;
    options: IKeyValuePair[];
    handleChange: (event: SelectChangeEvent<string[]>) => void;

}

const MultiSelect: FC<IMultiSelectProps> = ({name, displayName, filterParams, options, handleChange}) => {
    const values = filterParams[name];
    const optionsHash = Object.fromEntries(options.map(p => [p.key, p.value]))
    const displayedValue = (selected: string[]) => selected.length <= 2
        ? selected.map((x) => optionsHash[x]).join(", ")
        : 'Multiple'

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id={`${name}-multiple-checkbox-label`}>{displayName}</InputLabel>
            <Select
                label={displayName}
                labelId={`${name}-multiple-checkbox-label`}
                multiple={true}
                onChange={handleChange}
                name={name}
                value={values}
                renderValue={displayedValue}
            >
            {options.map(({key, value}) => (
                <MenuItem key={key} value={key}>
                    <Checkbox checked={values.includes(key)} />
                    <ListItemText primary={value} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>

    )
}

export default MultiSelect
