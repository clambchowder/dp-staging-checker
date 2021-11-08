import { Chip, CircularProgress } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { DataGrid, GridColumns, GridEnrichedColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAppVersions, IAppVersionInfo, IAppVersionInfoRow } from "../services/app-versions";
import { nameof } from "../utils";


type IRenderCellProps = GridRenderCellParams<any, IAppVersionInfoRow, any>

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
            flex: 1
        },
        {
            field: nameof<IAppVersionInfoRow>("name"),
            headerName: 'Name',
            width: 300
        },
        {
            ...chipCol,
            field: nameof<IAppVersionInfoRow>("stageVersion"),
            headerName: 'Staging',
            renderCell: ({ row, value }: IRenderCellProps ) => (
                <Chip
                    label={value}
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
            renderCell: ({ row, value }: IRenderCellProps) => (
                <Chip
                    label={value}
                    sx={chipSx}
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
                density={"standard"}
                hideFooter={true}
                disableColumnMenu={true}
            />
        )}

    </div>
}

export default AppVersions;
