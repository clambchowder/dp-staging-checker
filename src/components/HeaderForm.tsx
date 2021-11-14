import { SelectChangeEvent, Typography } from "@mui/material"
import useFilterParams, { IFilterParams } from "../hooks/useFilterParams";
import { DeployStatus, IKeyValuePair } from "../models";
import { DeployStatusDisplay, nameof } from "../utils";
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

    const statusOptions: IKeyValuePair[] = Object.keys(DeployStatus).map((name) => ({
        key: name,
        value: DeployStatusDisplay[name]
    }))
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
                    options={statusOptions}
                    handleChange={handleChange}
                />
            </form>
        </header>
    )
}

export default HeaderForms
