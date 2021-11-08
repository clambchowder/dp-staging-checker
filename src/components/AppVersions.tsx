import { useEffect, useState } from "react";
import { getAppVersions, IAppVersionInfo } from "../services/app-versions";

const AppVersions = () => {
    const [appVersions, setAppVersions] = useState<IAppVersionInfo[]>([])

    const hydrateData = async () => {
        const resp = await getAppVersions()
        setAppVersions(resp as any)
    }

    useEffect(() => {
        hydrateData()
    }, [])

    return <div>
        <h2>Staging Checker</h2>
        {appVersions.map(app => (
            <div>
                {app.name}
            </div>
        ))}
    </div>
}

export default AppVersions;
