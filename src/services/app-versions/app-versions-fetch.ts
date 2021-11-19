import { AppConfig } from "../../config"
import { IApplicationData, EnvironmentType, IApplicationInfoRow, IEnvironmentValue, IEnvironmentData } from "../../models"
import { getDeployStatus, getStatusUrl, sanitizeVersion, TeamTypeVertical } from "../../utils"
import { isoFetchJson } from "../../utils/node-fetch"



export const getAppVersions = async (): Promise<IApplicationInfoRow[]> => {

    const appData: IApplicationData[] = AppConfig.map((config) => ({
        ...config,
        vertical: TeamTypeVertical[config.team],
        environments: {
            qa: { url: getStatusUrl(config.name, config, EnvironmentType.qa) },
            staging: { url: getStatusUrl(config.name, config, EnvironmentType.staging) },
            prod: { url: getStatusUrl(config.name, config, EnvironmentType.prod) }
        }
    }))

    const appStatusPromises = appData.map(async (app) => {

        const envEntriesPromises = Object.entries(app.environments).map(async ([env, {url}]) => {
            try {
                const data = await isoFetchJson(url)
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
        id: app.displayName ?? app.name.replace('-', ' '),
        deployStatus: getDeployStatus(app),
    }))

    return appRows;
}

