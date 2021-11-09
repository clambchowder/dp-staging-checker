import { Chip, CircularProgress } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { DataGrid, GridColumns, GridEnrichedColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAppVersions, IAppVersionInfo, IAppVersionInfoRow, IEnvironmentValue } from "../services/app-versions";
import { nameof } from "../utils";


type IRenderCellProps = GridRenderCellParams<any, IAppVersionInfoRow, any>
type IRenderEnvCellProps = GridRenderCellParams<IEnvironmentValue, IAppVersionInfoRow, any>

const AppVersions = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [appVersions, setAppVersions] = useState<IAppVersionInfo[]>([])

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
            />
        )}

    </div>
}

export default AppVersions;
