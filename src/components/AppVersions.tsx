import { Chip, CircularProgress, Link, useMediaQuery, useTheme } from "@mui/material";
import { green, deepOrange, red } from "@mui/material/colors";
import { SxProps, Theme } from "@mui/system";
import { DataGrid, GridColumns, GridEnrichedColDef, GridRenderCellParams, GridSortModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { apiNames, pipelines } from "../constants/constants";
import { deployStatus, getAppVersions, getDeployStatus, getDeployStatusMessage, IAppVersionInfo, IAppVersionInfoRow, IEnvironmentValue } from "../services/app-versions";
import { nameof } from "../utils";


type IRenderCellProps = GridRenderCellParams<any, IAppVersionInfoRow, any>
type IRenderEnvCellProps = GridRenderCellParams<IEnvironmentValue, IAppVersionInfoRow, any>

const getDeployStatusColor = (status: deployStatus): string => {
    switch (status) {
        case deployStatus.pendingStaging: return red[800];
        case deployStatus.pendingRelease: return deepOrange[800];
        case deployStatus.upToDate: return green[800];
    }
}

const AppVersions = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [appVersions, setAppVersions] = useState<IAppVersionInfo[]>([])
    const theme = useTheme();
    const isPhoneScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

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
            field: nameof<IAppVersionInfoRow>("type"),
            headerName: 'Type',
            headerAlign: 'center',
            align: 'center',
            width: 80,
            hide: isMediumScreen
        },
        {
            field: nameof<IAppVersionInfoRow>("deployStatus"),
            headerName: 'Status',
            minWidth: 150,
            flex: 1,
            renderCell: ({ value, row }: IRenderCellProps ) => (
                <Link
                    href={pipelines[row.id as apiNames]}
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
                    label={value.version}
                    sx={chipSx}
                    color={"default"}
                    variant={row.deployStatus >= deployStatus.pendingStaging ? 'filled' : 'outlined'}
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
                    label={value.version}
                    sx={chipSx}
                    color={"default"}
                    variant={row.deployStatus >= deployStatus.pendingRelease ? 'filled' : 'outlined'}
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
                    label={value.version}
                    sx={chipSx}
                    color={"default"}
                    variant={row.deployStatus >= deployStatus.upToDate ? 'filled' : 'outlined'}
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

    return <div>
        {isLoading ? (
            <CircularProgress />
        ) : (
            <DataGrid
                style={{border: 'none'}}
                rows={rows}
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
