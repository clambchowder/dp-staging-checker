import { apis } from "../../constants/constants"
import { IAppInfo, IAppVersionInfo, IEnvironmentValue, IEnvironmentValues } from "./model"


export const applications: IAppInfo[] = [
    {
        name: 'v1',
        environments: {
            qa: 'https://app.qa.dealerpolicy.com/status.php',
            stage: 'https://app.staging.dealerpolicy.com/status.php',
            prod: 'https://app.dealerpolicy.com/status.php'
        }
    },
    ...apis.map(api => ({
        name: api,
        environments: {
            qa: `https://api-${api}.qa.dealerpolicy.cloud/status`,
            stage: `https://api-${api}.staging.dealerpolicy.cloud/status`,
            prod: `https://api-${api}.dealerpolicy.cloud/status`
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
        }
    })

	const applicationStatuses = await Promise.all(applicationStatusesPromises)

    return applicationStatuses;
}
