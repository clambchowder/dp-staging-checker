import { Chip, CircularProgress } from "@mui/material";
import { DataGrid, GridColumns, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAppVersions, IAppVersionInfo, IAppVersionInfoRow } from "../services/app-versions";
import { nameof } from "../utils";

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


    const cols: GridColumns = [
        {
            field: nameof<IAppVersionInfoRow>("id"),
            hide: true,
            flex: 1
        },
        {
            field: nameof<IAppVersionInfoRow>("name"),
            headerName: 'Name',
            width: 300
        },
        {
            field: nameof<IAppVersionInfoRow>("stageVersion"),
            headerName: 'Staging',
            width: 150,
            renderCell: ({ row, value }: GridRenderCellParams<any, IAppVersionInfoRow, any>) => (
                <Chip
                    label={value}
                    color={row.stageMatchesProd ? 'success' : 'warning'}
                    variant={row.stageMatchesProd ? 'filled' : 'outlined'}
                />
            ),
        },
        {
            field: nameof<IAppVersionInfoRow>("prodVersion"),
            headerName: 'Prod',
            width: 150,
            renderCell: ({ row, value }: GridRenderCellParams<any, IAppVersionInfoRow, any>) => (
                <Chip
                    label={value}
                    color={'success'}
                    variant={row.stageMatchesProd ? 'filled' : 'outlined'}
                />
            ),
        }
    ]

    const rows: IAppVersionInfoRow[] = appVersions.map(x => ({
        id: x.name,
        name: x.name,
        stageVersion: x.environments.stage,
        prodVersion: x.environments.prod,
        stageMatchesProd: x.stageMatchesProd
    }))

    return <div>
        {isLoading ? (
            <CircularProgress />
        ) : (
            <DataGrid
                rows={rows}
                columns={cols}
                hideFooter={true}
            />
        )}

    </div>
}

export default AppVersions;
