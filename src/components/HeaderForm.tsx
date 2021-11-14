import { Stack, IconButton, SelectChangeEvent, Tooltip, Typography, Slide } from "@mui/material"
import { FilterAlt, Clear} from '@mui/icons-material'
import useFilterParams, { IFilterParams } from "../hooks/useFilterParams";
import { DeployStatus, TeamType, VerticalType } from "../models";
import { DeployStatusDisplay, getKeyValuePairs, nameof, TeamTypeDisplay } from "../utils";
import MultiSelect from "./MultiSelect";
import { useMemo, useRef, useState } from "react";
import { Box } from "@mui/system";

const HeaderForms = () => {
    const [filterParams, setFilterParams] = useFilterParams();

    const hasFilters = useMemo(() => {
        return Object.values(filterParams).some(arr => arr.length)
    }, [filterParams])

    const [showFilters, setShowFilters] = useState(hasFilters)
    const containerRef = useRef(null);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const { target: { value, name } } = event;
        setFilterParams({
            ...filterParams,
            [name]: value as string[]
        })
    };


    return (
        <header>
            <Typography variant={'h1'} sx={{marginTop: 0, textAlign: 'center'}}>
                DP Staging Checker
            </Typography>
            <form >
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={72}
                    spacing={2}
                    ref={containerRef}
                    overflow="hidden"
                >

                    <Slide
                        direction="left"
                        in={showFilters}
                        appear={false}
                        container={containerRef.current}
                        >
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
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
                    </Slide>
                    <Box flexGrow={1} />
                    {hasFilters && (
                        <Tooltip title="Clear">
                            <IconButton
                                aria-label="clear"
                                size={'large'}
                                onClick={() => {
                                    setFilterParams({});
                                    setShowFilters(false);
                                }}
                            >
                                <Clear />
                            </IconButton>
                        </Tooltip>
                    )}
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
            </form>
        </header>
    )
}

export default HeaderForms
