import { Chip, CircularProgress, Link, Stack, useMediaQuery, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { DataGrid, GridColumns, GridEnrichedColDef, GridRenderCellParams, GridSortModel } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import useFilterParams from "../hooks/useFilterParams";
import { DeployStatus, EnvironmentType, IApplicationInfoRow, IEnvironmentValue, TeamType } from "../models";
import { getAppVersions } from "../services/app-versions";
import { DeployStatusDisplay, DeployStatusColor, DeployStatusStage, TeamTypeDisplay, nameof, isDeployedUpTo } from "../utils";


type IRenderCellProps = GridRenderCellParams<any, IApplicationInfoRow, any>
type IRenderTeamProps = GridRenderCellParams<TeamType, IApplicationInfoRow, any>
type IRenderStatusProps = GridRenderCellParams<DeployStatus, IApplicationInfoRow, any>
type IRenderEnvCellProps = GridRenderCellParams<IEnvironmentValue, IApplicationInfoRow, any>


const StatusGrid = () => {
    const [filterParams, setFilterParams] = useFilterParams();
    const [isLoading, setIsLoading] = useState(true)
    const [appVersions, setAppVersions] = useState<IApplicationInfoRow[]>([])
    const theme = useTheme();
    const isPhoneScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isBigScreen = useMediaQuery(theme.breakpoints.up('xl'));

    const [sortModel, setSortModel] = useState<GridSortModel>([
        {
          field: 'deployStatus',
          sort: 'asc',
        },
    ]);

    const hydrateData = async () => {
        const resp = await getAppVersions()
        setAppVersions(resp)
        setIsLoading(false)
    }

    useEffect(() => {
        hydrateData()
    }, [])

    const chipCol: Partial<GridEnrichedColDef> = {
        sortable: false,
        headerAlign: 'center',
        align: 'center',
        width: 116,
        hide: isPhoneScreen
    }
    const chipSx: SxProps<Theme> = {
        width: 100,
        borderRadius: 2
    }

    const cols: GridColumns = [
        {
            field: nameof<IApplicationInfoRow>("id"),
            hide: true,
        },
        {
            field: nameof<IApplicationInfoRow>("name"),
            headerName: 'Name',
            minWidth: 150,
            flex: 1
        },
        {
            field: nameof<IApplicationInfoRow>("deployStatus"),
            headerName: 'Status',
            minWidth: 150,
            sortComparator: (v1, v2, _params1, _params2) => {
                return DeployStatusStage[v1 as DeployStatus] - DeployStatusStage[v2 as DeployStatus]
            },
            flex: 1,
            renderCell: ({ value, row }: IRenderStatusProps ) => (
                <Link
                    href={row.pipelineUrl}
                    target={'_blank'}
                    color={DeployStatusColor[row.deployStatus]}
                    underline={"hover"}
                >
                   {DeployStatusDisplay[value]}
                </Link>
            ),
        },
        {
            field: nameof<IApplicationInfoRow>("team"),
            headerName: 'Team',
            minWidth: 150,
            flex: 1,
            renderCell: ({value}: IRenderTeamProps) => TeamTypeDisplay[value],
            hide: !isBigScreen
        },
        {
            field: nameof<IApplicationInfoRow>("vertical"),
            headerName: 'Vertical',
            minWidth: 150,
            flex: 1,
            hide: !isBigScreen
        },
        {
            field: nameof<IApplicationInfoRow>("type"),
            headerName: 'Type',
            minWidth: 80,
            flex: .5,
            hide: !isBigScreen
        },
        {
            ...chipCol,
            field: String(EnvironmentType.qa),
            headerName: 'QA',
            renderCell: ({ value, row }: IRenderEnvCellProps ) => (
                <Chip
                    clickable={true}
                    component={'a'}
                    href={value.url}
                    target={'_blank'}
                    label={value.version || "-"}
                    sx={{
                        ...chipSx,
                        ...(row.separateReleaseBranch && {
                            border: 'none',
                            background: 'none'
                        })
                    }}
                    color={value.error ? 'error' : 'default'}
                    variant={isDeployedUpTo(row.deployStatus, DeployStatus.pendingStaging) ? 'filled' : 'outlined'}
                />
            ),
        },
        {
            ...chipCol,
            field: String(EnvironmentType.staging),
            headerName: 'Staging',
            renderCell: ({ value, row }: IRenderEnvCellProps ) => (
                <Chip
                    clickable={true}
                    component={'a'}
                    href={value.url}
                    target={'_blank'}
                    label={value.version || "-"}
                    sx={chipSx}
                    color={value.error ? 'error' : 'default'}
                    variant={isDeployedUpTo(row.deployStatus, DeployStatus.pendingRelease) ? 'filled' : 'outlined'}
                />
            ),
        },
        {
            ...chipCol,
            field: String(EnvironmentType.prod),
            headerName: 'Prod',
            renderCell: ({ value, row }: IRenderCellProps) => (
                <Chip
                    clickable={true}
                    component={'a'}
                    href={value.url}
                    target={'_blank'}
                    label={value.version || "-"}
                    sx={chipSx}
                    color={value.error ? 'error' : 'default'}
                    variant={isDeployedUpTo(row.deployStatus, DeployStatus.upToDate) ? 'filled' : 'outlined'}
                />
            ),
        }
    ]


    const filteredRows = useMemo(()=> {
        const filtered = appVersions.filter((row) => {
            return (!filterParams.status?.length || filterParams.status.includes(row.deployStatus))
                && (!filterParams.team?.length || filterParams.team.includes(row.team))
                && (!filterParams.vertical?.length || filterParams.vertical.includes(row.vertical))


        })
        return filtered;
    }, [appVersions, filterParams])


    return <div>
        {isLoading ? (
            <CircularProgress />
        ) : (
            <DataGrid
                style={{border: 'none'}}
                rows={filteredRows}
                columns={cols}
                density={"standard"}
                autoHeight={true}
                hideFooter={true}
                disableColumnMenu={true}
                disableVirtualization={true}
                sortingOrder={['desc', 'asc']}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
                components={{
                    NoRowsOverlay: () => (
                      <Stack direction='row' alignItems="center" justifyContent="center" marginTop={12} columnGap={1}>
                        <span>No Results</span>
                        <span>-</span>
                        <Link component='button' onClick={() => setFilterParams({})} fontSize={'inherit'} >Clear Filters</Link>
                      </Stack>
                    )
                  }}
            />
        )}

    </div>
}

export default StatusGrid;
