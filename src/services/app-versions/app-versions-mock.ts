
import { IApplicationInfoRow } from '../../models';
import { sleep } from '../../utils';
import data from './app-versions-mock-data.json';

export const getAppVersions = async (): Promise<IApplicationInfoRow[]> => {
    await sleep(50)
    return data as IApplicationInfoRow[]
}
