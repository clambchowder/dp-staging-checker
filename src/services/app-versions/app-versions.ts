import { apis, ERROR_MSG } from "../../constants/constants"
import { IAppVersionInfo, IEnvironmentValue, IEnvironmentValues } from "./model"


export const applications = [
    {
        name: 'v1',
        environments: {
            prod: 'https://app.dealerpolicy.com/status.php',
            stage: 'https://app.staging.dealerpolicy.com/status.php'
        }
    },
    ...apis.map(api => ({
        name: api,
        environments: {
            prod: `https://api-${api}.dealerpolicy.cloud/status`,
            stage: `https://api-${api}.staging.dealerpolicy.cloud/status`
        }
    }))
]

export const getAppVersions = async (): Promise<IAppVersionInfo[]> => {

    const applicationStatusesPromises = applications.map(async ({name, environments}) => {

        const envEntriesPromises = Object.entries(environments).map(async ([env, url]) => {
            try {
                const resp = await fetch(url)
                const data = await resp.json()
                const message = data.Message || data.message
                const version = message.split(" ")[1] ?? message
                return [env, {url, version} as IEnvironmentValue]
            } catch (error) {
                return [env, {url, error} as IEnvironmentValue]
            }

        })

		const envEntries = await Promise.all(envEntriesPromises)
        const envValues: IEnvironmentValues = Object.fromEntries(envEntries)

        return {
            name: name,
            environments: envValues,
            hasError: Object.values(envValues).some((x: IEnvironmentValue) => x.error),
            stageMatchesProd: envValues.prod.version === envValues.stage.version
        }
    })

	const applicationStatuses = await Promise.all(applicationStatusesPromises)

    console.log(applicationStatuses)

    return applicationStatuses;
}
