import { CircularProgress } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
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
            flex: 1,
        },
        {
            field: nameof<IAppVersionInfoRow>("stageVersion"),
            headerName: 'Staging',
            flex: 1,
        },
        {
            field: nameof<IAppVersionInfoRow>("prodVersion"),
            headerName: 'Prod',
            flex: 1,
        }
    ]

    const rows: IAppVersionInfoRow[] = appVersions.map(x => ({
        id: x.name,
        name: x.name,
        stageVersion: x.environments.stage,
        prodVersion: x.environments.prod
    }))

    return <div>
        {isLoading ? (
            <CircularProgress />
        ) : (
            <DataGrid
                rows={rows}
                columns={cols}

            />
        )}

    </div>
}

export default AppVersions;
