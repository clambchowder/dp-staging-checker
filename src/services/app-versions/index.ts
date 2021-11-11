import * as AppVersionApi from './app-versions'
import * as AppVersionMock from './app-versions-mock'

const appVersion = Boolean(process.env.REACT_APP_USE_MOCK_DATA) ? AppVersionMock : AppVersionApi;

export const { getAppVersions } = appVersion

