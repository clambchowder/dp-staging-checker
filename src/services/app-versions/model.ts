import { apiNames, separateReleaseBranch } from "../../constants/constants";

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
    name: apiNames;
    type: appType;
    environments: IEnvironments,
}

export interface IAppVersionInfo {
    name: apiNames;
    type: appType;
    environments: IEnvironmentValues,
}

export interface IAppVersionInfoRow {
    id: string;
    name: apiNames;
    status: string;
    type: appType;
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
    error = 0,
    pendingStaging = 1,
    pendingRelease = 2,
    upToDate = 3
}

export enum appType {
    App = 'App',
    Api = 'Api',
    v1 = 'V1'
}

export const getDeployStatus = (app: IAppVersionInfo): deployStatus => {
    const {qa, stage, prod} = app.environments;
    const hasError = Object.values(app.environments).some((x: IEnvironmentValue) => x.error)
    if (hasError) return deployStatus.error

    const hasSeparateReleaseBranch = separateReleaseBranch[app.name];
    if (qa.version !== stage.version && !hasSeparateReleaseBranch) return deployStatus.pendingStaging;
    if (stage.version !== prod.version) return deployStatus.pendingRelease;
    return deployStatus.upToDate;
}

export const getDeployStatusMessage = (status: deployStatus): string => {
    switch (status) {
        case deployStatus.error: return 'Error';
        case deployStatus.pendingStaging: return 'Pending Staging';
        case deployStatus.pendingRelease: return 'Pending Release';
        case deployStatus.upToDate: return 'Up To Date';
    }
}
