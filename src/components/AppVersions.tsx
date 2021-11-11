import { Chip, CircularProgress, Link, useMediaQuery, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { DataGrid, GridColumns, GridEnrichedColDef, GridRenderCellParams, GridSortModel } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { DeployStatus, EnvironmentType, IApplicationInfoRow, IEnvironmentValue, IFilterParams } from "../models";
import { getAppVersions } from "../services/app-versions";
import { getDeployStatusColor, getDeployStatusMessage, getDeployStatusStage, nameof } from "../utils";


type IRenderCellProps = GridRenderCellParams<any, IApplicationInfoRow, any>
type IRenderEnvCellProps = GridRenderCellParams<IEnvironmentValue, IApplicationInfoRow, any>


const AppVersions = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true)
    const [appVersions, setAppVersions] = useState<IApplicationInfoRow[]>([])
    const theme = useTheme();
    const isPhoneScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                return getDeployStatusStage(v1 as DeployStatus) - getDeployStatusStage(v2 as DeployStatus)
            },
            flex: 1,
            renderCell: ({ value, row }: IRenderCellProps ) => (
                <Link
                    href={row.pipelineUrl}
                    target={'_blank'}
                    color={getDeployStatusColor(row.deployStatus)}
                    underline={"hover"}
                >
                   {getDeployStatusMessage(value)}
                </Link>
            ),
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
                    variant={getDeployStatusStage(row.deployStatus) >= getDeployStatusStage(DeployStatus.pendingStaging) ? 'filled' : 'outlined'}
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
                    variant={getDeployStatusStage(row.deployStatus) >= getDeployStatusStage(DeployStatus.pendingRelease) ? 'filled' : 'outlined'}
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
                    variant={getDeployStatusStage(row.deployStatus) >= getDeployStatusStage(DeployStatus.upToDate) ? 'filled' : 'outlined'}
                />
            ),
        }
    ]


    const filteredRows = useMemo(()=> {
        const filters: IFilterParams = Object.fromEntries(new URLSearchParams(location.search));
        const filtered = appVersions.filter((row) => {
            return (typeof filters.status === 'undefined' || row.deployStatus === filters.status)
                && (typeof filters.name === 'undefined' || row.name.includes(filters.name))
        })
        return filtered;
    }, [appVersions, location])

    return <div>
        {isLoading ? (
            <CircularProgress />
        ) : (
            <DataGrid
                style={{border: 'none'}}
                rows={filteredRows}
                columns={cols}
                density={"standard"}
                hideFooter={true}
                disableColumnMenu={true}
                disableVirtualization={true}
                sortingOrder={['desc', 'asc']}
                sortModel={sortModel}
                onSortModelChange={(model) => setSortModel(model)}
            />
        )}

    </div>
}

export default AppVersions;
