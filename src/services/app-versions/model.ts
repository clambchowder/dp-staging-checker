import { apiNames, separateReleaseBranch } from "../../constants/constants";
import { green, deepOrange, red, blue } from "@mui/material/colors";
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
    qa: IEnvironmentValue,
    stage: IEnvironmentValue,
    prod: IEnvironmentValue,
    deployStatus: deployStatus
    hasError: boolean;
}

export interface IFilterParams {
    name?: apiNames;
    status?: deployStatus;
    type?: appType;
    // vertical?: string;
    // team?: string;
}

export enum deployStatus {
    error = "error",
    pendingStaging = "pendingStaging",
    pendingRelease = "pendingRelease",
    upToDate = "upToDate"
}

export enum appType {
    App = 'App',
    Api = 'Api',
    v1 = 'v1'
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

export const getDeployStatusStage = (status: deployStatus): number => {
    switch (status) {
        case deployStatus.error: return 0;
        case deployStatus.pendingStaging: return 1;
        case deployStatus.pendingRelease: return 2;
        case deployStatus.upToDate: return 3;
    }
}



export const getDeployStatusColor = (status: deployStatus): string => {
    switch (status) {
        case deployStatus.error: return red[800];
        case deployStatus.pendingStaging: return deepOrange[800];
        case deployStatus.pendingRelease: return blue[800];
        case deployStatus.upToDate: return green[800];
    }
}
