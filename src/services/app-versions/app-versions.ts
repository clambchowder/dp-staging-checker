import { AppConfig, AppNames } from "../../config"
import { IApplicationData, IApplicationOptions, EnvironmentType, IApplicationInfoRow, IEnvironmentValue, IEnvironmentData } from "../../models"
import { getDeployStatus, getDeployStatusMessage, getStatusUrl, getVerticalByTeam, sanitizeVersion } from "../../utils"


export const getAppVersions = async (): Promise<IApplicationInfoRow[]> => {

    const appConfigEntires = Object.entries<AppNames, IApplicationOptions>(AppConfig)

    const appData: IApplicationData[] = appConfigEntires.map(([name, info]) => {
        const appName = name as AppNames;
        return {
            ...info,
            name: appName,
            vertical: getVerticalByTeam(info.team),
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

    const appRows: IApplicationInfoRow[] = appStatuses.map(app => {
        const deployStatus = getDeployStatus(app)

        return ({
            ...app,
            ...app.environments,
            id: app.name,
            deployStatus: deployStatus,
            deployStatusDisplay: getDeployStatusMessage(deployStatus),
        });
    })

    console.log(appRows);

    return appRows;
}

