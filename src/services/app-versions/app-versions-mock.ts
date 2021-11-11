
import { IApplicationInfoRow } from '../../models';
import data from './app-versions-mock-data.json';

export const getAppVersions = async (): Promise<IApplicationInfoRow[]> => {
    return data as IApplicationInfoRow[]
}
