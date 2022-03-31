import * as AppVersionFetch from './app-versions-fetch'
import * as AppVersionMock from './app-versions-mock'

const getAppVersionInstance = () => {
    if (Boolean(process.env.REACT_APP_USE_MOCK_DATA)) return AppVersionMock
    return AppVersionFetch
}

export const { getAppVersions } = getAppVersionInstance()
