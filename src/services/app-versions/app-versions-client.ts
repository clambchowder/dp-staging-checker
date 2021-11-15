import { AppConfig, AppNames } from "../../config"
import { IApplicationData, IApplicationOptions, EnvironmentType, IApplicationInfoRow, IEnvironmentValue, IEnvironmentData } from "../../models"
import { getDeployStatus, getStatusUrl, sanitizeVersion, TeamTypeVertical } from "../../utils"


export const getAppVersions = async (): Promise<IApplicationInfoRow[]> => {

    const appConfigEntires = Object.entries<AppNames, IApplicationOptions>(AppConfig)

    const appData: IApplicationData[] = appConfigEntires.map(([name, info]) => {
        const appName = name as AppNames;
        return {
            ...info,
            name: appName,
            vertical: TeamTypeVertical[info.team],
            environments: {
                qa: { url: getStatusUrl(appName, info, EnvironmentType.qa) },
                staging: { url: getStatusUrl(appName, info, EnvironmentType.staging) },
                prod: { url: getStatusUrl(appName, info, EnvironmentType.prod) }
            }
        }
    })

    const appStatusPromises = appData.map(async (app) => {

        const envEntriesPromises = Object.entries(app.environments).map(async ([env, {url}]) => {
            try {
                const resp = await fetch(url)
                const data = await resp.json()
                const version = sanitizeVersion(data.Message || data.message)
                return [env, {url, version} as IEnvironmentValue]
            } catch (error) {
                console.log(error);
                return [env, {url, error} as IEnvironmentValue]
            }

        })

		const envEntries = await Promise.all(envEntriesPromises)
        const envValues: IEnvironmentData = Object.fromEntries(envEntries)

        return {
            ...app,
            environments: envValues,
        }
    })

	const appStatuses = await Promise.all(appStatusPromises)

    const appRows: IApplicationInfoRow[] = appStatuses.map(app => ({
        ...app,
        ...app.environments,
        id: app.name,
        deployStatus: getDeployStatus(app),
    }))

    return appRows;
}

