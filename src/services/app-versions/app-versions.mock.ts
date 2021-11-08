
import { IAppVersionInfo } from './model';
import data from './sample-data.json';

export const getAppVersions = async (): Promise<IAppVersionInfo[]> => {
    return data as IAppVersionInfo[]
}
