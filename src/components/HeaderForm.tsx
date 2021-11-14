import { SelectChangeEvent, Typography } from "@mui/material"
import useFilterParams, { IFilterParams } from "../hooks/useFilterParams";
import { DeployStatus, TeamType, VerticalType } from "../models";
import { DeployStatusDisplay, getKeyValuePairs, nameof, TeamTypeDisplay } from "../utils";
import MultiSelect from "./MultiSelect";

const HeaderForms = () => {
    const [filterParams, setFilterParams] = useFilterParams();

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const { target: { value, name } } = event;
        setFilterParams({
            ...filterParams,
            [name]: value as string[]
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
                <MultiSelect
                    name={String(nameof<IFilterParams>("status"))}
                    displayName={"Status"}
                    filterParams={filterParams}
                    options={getKeyValuePairs(DeployStatus, DeployStatusDisplay)}
                    handleChange={handleChange}
                />
                <MultiSelect
                    name={String(nameof<IFilterParams>("team"))}
                    displayName={"Team"}
                    filterParams={filterParams}
                    options={getKeyValuePairs(TeamType, TeamTypeDisplay)}
                    handleChange={handleChange}
                />
                 <MultiSelect
                    name={String(nameof<IFilterParams>("vertical"))}
                    displayName={"Vertical"}
                    filterParams={filterParams}
                    options={getKeyValuePairs(VerticalType)}
                    handleChange={handleChange}
                />
            </form>
        </header>
    )
}

export default HeaderForms
