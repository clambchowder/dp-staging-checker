import { apis, ERROR_MSG } from "../constants/constants"


const applications = [
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

export interface IEnvironmentValues {
    prod: string;
    stage: string;
}

export interface IAppVersionInfo {
    name: string;
    environments: IEnvironmentValues,
    hasError: boolean;
    stageMatchesProd: boolean;
}

export interface IAppVersionInfoRow {
    id: string;
    name: string;
    // status: string;
    // type: string;
    // vertical: string;
    // team: string;
    // qaVersion: string;
    stageVersion: string;
    prodVersion: string;
    // hasError: boolean;
    // stageMatchesProd: boolean;
}

export const getAppVersions = async (): Promise<IAppVersionInfo[]> => {

    const applicationStatusesPromises = applications.map(async ({name, environments}) => {

        const envEntriesPromises = Object.entries(environments).map(async ([env, url]) => {
            try {
                const resp = await fetch(url)
                const data = await resp.json()
                return [env, data.Message || data.message]
            } catch (error) {
                return [env, ERROR_MSG]
            }

        })

		const envEntries = await Promise.all(envEntriesPromises)
        const envValues = Object.fromEntries(envEntries)

        return {
            name: name,
            environments: envValues,
            hasError: envValues.prod === ERROR_MSG || envValues.stage === ERROR_MSG,
            stageMatchesProd: envValues.prod === envValues.stage
        }
    })

	const applicationStatuses = await Promise.all(applicationStatusesPromises)

    console.log(applicationStatuses)

    return applicationStatuses;
}
