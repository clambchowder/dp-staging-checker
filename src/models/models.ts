import { AppNames } from "../config/config";
import { AppType, DeployStatus, EnvironmentType, TeamType, TldType, VerticalType } from "./enums";

export interface IApplicationOptions {
    type: AppType;
    team: TeamType;
    pipelineUrl: string;
    displayName?: string;
    tld?: TldType;
    separateReleaseBranch?: boolean
}

export interface IApplicationInfo extends IApplicationOptions {
    name: AppNames;
    vertical: VerticalType;
}

export interface IEnvironmentData extends Record<EnvironmentType, IEnvironmentValue> {}

export interface IEnvironmentValue {
    url: string;
    version?: string;
    error?: any
}

export interface IApplicationData extends IApplicationInfo {
    environments: IEnvironmentData,
}

export interface IApplicationInfoRow extends IApplicationInfo, IEnvironmentData {
    id: string;
    deployStatus: DeployStatus
}

export interface IFilterParams {
    name?: AppNames;
    status?: DeployStatus;
    type?: AppType;
    // vertical?: string;
    // team?: string;
}
