export interface IEnvironmentValue {
    url: string;
    version?: string;
    error?: any
}

export interface IEnvironments {
    qa: string;
    stage: string;
    prod: string;
}

export interface IEnvironmentValues {
    qa: IEnvironmentValue;
    stage: IEnvironmentValue;
    prod: IEnvironmentValue;
}

export interface IAppInfo {
    name: string;
    environments: IEnvironments,
}

export interface IAppVersionInfo {
    name: string;
    environments: IEnvironmentValues,
}

export interface IAppVersionInfoRow {
    id: string;
    name: string;
    status: string;
    // type: string;
    // vertical: string;
    // team: string;
    // qaVersion: string;
    qa: IEnvironmentValue,
    stage: IEnvironmentValue,
    prod: IEnvironmentValue,
    deployStatus: deployStatus
    hasError: boolean;
}

export enum deployStatus {
    pendingStaging = 0,
    pendingRelease = 1,
    upToDate = 2
}

export const getDeployStatus = ({qa, stage, prod}: IEnvironmentValues): deployStatus => {
    if (qa.version !== stage.version) return deployStatus.pendingStaging;
    if (stage.version !== prod.version) return deployStatus.pendingRelease;
    return deployStatus.upToDate;
}

export const getDeployStatusMessage = (status: deployStatus): string => {
    switch (status) {
        case deployStatus.pendingStaging: return 'Pending Staging';
        case deployStatus.pendingRelease: return 'Pending Release';
        case deployStatus.upToDate: return 'Up To Date';
    }
}
