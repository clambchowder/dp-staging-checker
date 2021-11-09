import { Chip, CircularProgress, Link } from "@mui/material";
import { deepOrange, green } from "@mui/material/colors";
import { SxProps, Theme } from "@mui/system";
import { DataGrid, GridColumns, GridEnrichedColDef, GridRenderCellParams, GridSortModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { apiNames, pipelines } from "../constants/constants";
import { getAppVersions, IAppVersionInfo, IAppVersionInfoRow, IEnvironmentValue } from "../services/app-versions";
import { nameof } from "../utils";


type IRenderCellProps = GridRenderCellParams<any, IAppVersionInfoRow, any>
type IRenderEnvCellProps = GridRenderCellParams<IEnvironmentValue, IAppVersionInfoRow, any>

const AppVersions = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [appVersions, setAppVersions] = useState<IAppVersionInfo[]>([])

    const [sortModel, setSortModel] = useState<GridSortModel>([
        {
          field: 'status',
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
        width: 150,
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
            flex: 1
        },
        {
            field: nameof<IAppVersionInfoRow>("status"),
            headerName: 'Status',
            flex: 1,
            renderCell: ({ value, row }: IRenderCellProps ) => (
                <Link
                    href={pipelines[row.id as apiNames]}
                    color={row.stageMatchesProd ? green[800] : deepOrange[800]}
                    underline={"hover"}
                >
                   {value}
                </Link>
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
                    color={row.stageMatchesProd ? 'success' : 'warning'}
                    variant={row.stageMatchesProd ? 'filled' : 'outlined'}
                />
            ),
        },
        {
            ...chipCol,
            field: nameof<IAppVersionInfoRow>("prodVersion"),
            headerName: 'Prod',
            renderCell: ({ value, row }: IRenderCellProps) => (
                <Chip
                    clickable={true}
                    component={'a'}
                    href={value.url}
                    label={value}
                    sx={chipSx}
                    color={'success'}
                    variant={row.stageMatchesProd ? 'filled' : 'outlined'}
                />
            ),
        }
    ]

    const rows: IAppVersionInfoRow[] = appVersions.map(x => ({
        ...x.environments,
        id: x.name,
        name: x.name,
        status: x.stageMatchesProd ? 'Up To Date' : 'Pending Deploy',
        stageVersion: x.environments.stage.version ?? '',
        prodVersion: x.environments.prod.version ?? '',
        stageMatchesProd: x.stageMatchesProd
    }))

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
