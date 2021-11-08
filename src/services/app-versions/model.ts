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
    stageMatchesProd: boolean;
}
