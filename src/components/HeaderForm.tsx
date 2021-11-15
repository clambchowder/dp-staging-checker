import { Stack, Box, IconButton, SelectChangeEvent, Tooltip, useMediaQuery } from "@mui/material"
import { FilterAlt, Clear} from '@mui/icons-material'
import { useTheme } from "@mui/system";
import { useMemo, useState } from "react";
import useFilterParams, { IFilterParams } from "../hooks/useFilterParams";
import { DeployStatus, TeamType, VerticalType } from "../models";
import { DeployStatusDisplay, getKeyValuePairs, nameof, TeamTypeDisplay } from "../utils";
import MultiSelect from "./MultiSelect";
import SlideAndGrow from "./SlideAndGrow"

const HeaderForms = () => {
    const [filterParams, setFilterParams] = useFilterParams();
    const hasFilters = useMemo(() => Object.values(filterParams).some(arr => arr.length), [filterParams])
    const [showFilters, setShowFilters] = useState(hasFilters)
    const theme = useTheme();
    const isBigScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const { target: { value, name } } = event;
        setFilterParams({
            ...filterParams,
            [name]: value as string[]
        })
    };

    return (
        <header>
            <form >
                <Stack
                    direction={isBigScreen ? 'row' : 'column-reverse'}
                    justifyContent="center"
                    alignItems="center"
                    minHeight={72}
                    spacing={2}
                    overflow="hidden"
                >
                    <SlideAndGrow
                        direction={isBigScreen ? 'left' : 'down'}
                        in={showFilters}
                        appear={false}
                        unmountOnExit={true}

                    >
                        <Stack
                            direction={isBigScreen ? 'row' : 'column'}
                            justifyContent="center"
                            alignItems="center"
                            width='100%'
                        >
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
                        </Stack>

                    </SlideAndGrow>
                    <Box flexGrow={1} />
                    <Stack
                        sx={{alignSelf: isBigScreen ? 'center' : 'self-end'}}
                        direction='row'
                        justifyContent="center"
                        alignItems="center"
                    >

                        <Tooltip title="Clear">
                            <IconButton
                                aria-label="clear"
                                size={'large'}
                                onClick={() => {
                                    setFilterParams({});
                                    setShowFilters(false);
                                }}
                                sx={{
                                    visibility: hasFilters ? 'visible' : 'hidden'
                                }}
                            >
                                <Clear />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter">
                            <IconButton
                                aria-label="filter"
                                size={'large'}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <FilterAlt />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </form>
        </header>
    )
}

export default HeaderForms
