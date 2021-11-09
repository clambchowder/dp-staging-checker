import { Chip, CircularProgress, Link, useMediaQuery, useTheme } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { DataGrid, GridColumns, GridEnrichedColDef, GridRenderCellParams, GridSortModel } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiNames, pipelines, separateReleaseBranch } from "../constants/constants";
import { deployStatus, getAppVersions, getDeployStatus, getDeployStatusColor, getDeployStatusMessage, getDeployStatusStage, IAppVersionInfo, IAppVersionInfoRow, IEnvironmentValue, IFilterParams } from "../services/app-versions";
import { nameof } from "../utils";

type IRenderCellProps = GridRenderCellParams<any, IAppVersionInfoRow, any>
type IRenderEnvCellProps = GridRenderCellParams<IEnvironmentValue, IAppVersionInfoRow, any>


const AppVersions = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true)
    const [appVersions, setAppVersions] = useState<IAppVersionInfo[]>([])
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
        setAppVersions(resp as any)
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
            field: nameof<IAppVersionInfoRow>("id"),
            hide: true,
        },
        {
            field: nameof<IAppVersionInfoRow>("name"),
            headerName: 'Name',
            minWidth: 150,
            flex: 1
        },
        {
            field: nameof<IAppVersionInfoRow>("deployStatus"),
            headerName: 'Status',
            minWidth: 150,
            sortComparator: (v1, v2, _params1, _params2) => {
                return getDeployStatusStage(v1 as deployStatus) - getDeployStatusStage(v2 as deployStatus)
            },
            flex: 1,
            renderCell: ({ value, row }: IRenderCellProps ) => (
                <Link
                    href={pipelines[row.id as apiNames]}
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
            field: nameof<IAppVersionInfoRow>("qa"),
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
                        ...(separateReleaseBranch[row.name] && {
                            border: 'none',
                            background: 'none'
                        })
                    }}
                    color={value.error ? 'error' : 'default'}
                    variant={getDeployStatusStage(row.deployStatus) >= getDeployStatusStage(deployStatus.pendingStaging) ? 'filled' : 'outlined'}
                />
            ),
        },
        {
            ...chipCol,
            field: nameof<IAppVersionInfoRow>("stage"),
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
                    variant={getDeployStatusStage(row.deployStatus) >= getDeployStatusStage(deployStatus.pendingRelease) ? 'filled' : 'outlined'}
                />
            ),
        },
        {
            ...chipCol,
            field: nameof<IAppVersionInfoRow>("prod"),
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
                    variant={getDeployStatusStage(row.deployStatus) >= getDeployStatusStage(deployStatus.upToDate) ? 'filled' : 'outlined'}
                />
            ),
        }
    ]

    const rows: IAppVersionInfoRow[] = appVersions.map(app => {
        const {qa, stage, prod} = app.environments;
        const deployStatus = getDeployStatus(app)
        const hasError = Object.values(app.environments).some((x: IEnvironmentValue) => x.error)

        return ({
            id: app.name,
            name: app.name,
            type: app.type,
            qa: qa,
            stage: stage,
            prod: prod,
            status: getDeployStatusMessage(deployStatus),
            deployStatus: deployStatus,
            hasError: hasError
        });
    })

    const filteredRows = useMemo(()=> {
        const filters: IFilterParams = Object.fromEntries(new URLSearchParams(location.search));
        const filtered = rows.filter((row) => {
            return (typeof filters.status === 'undefined' || row.deployStatus === filters.status)
                && (typeof filters.name === 'undefined' || row.name.includes(filters.name))
        })
        return filtered;
    }, [rows, location])

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
