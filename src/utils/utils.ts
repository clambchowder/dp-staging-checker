import { red, deepOrange, blue, green } from "@mui/material/colors";
import { IApplicationData, IApplicationOptions, IEnvironmentValue,  AppType, DeployStatus, EnvironmentType, TeamType, TldType, VerticalType } from "../models";
import { AppNames } from "../config";


export const nameof = <T>(name: keyof T) => name;
export const DefineIdentity = <Constraint> () => <T extends Constraint> (definition: T) => definition;

export const toProperCase = (str: string) => str.length === 0 ? str : str[0].toUpperCase() + str.substr(1)
export const toTitleCase = (str: string) => str.split(' ').map(toProperCase).join(' ');

export const sanitizeVersion = (message: string): string => {
    return message.split(" ")[1]?.replace("alpha", "α")?.replace("v", "") ?? message
}

export const getVerticalByTeam = (team: TeamType): VerticalType => {
    switch (team) {
        case TeamType.Wheat:
        case TeamType.Artemis:
        case TeamType.SqueakyWheel:
            return VerticalType.Distribution
        case TeamType.GhostBusters:
        case TeamType.InsureAnts:
        case TeamType.Agent:
            return VerticalType.Insurance
        default:
            return VerticalType.Unknown
    }
}

export const getStatusUrl = (name: AppNames, appOptions: IApplicationOptions,env: EnvironmentType): string => {
    const envSubdomain = env === EnvironmentType.prod ? "" : `.${env}`
    if (appOptions.type === AppType.v1) return `https://app${envSubdomain}.dealerpolicy.com/status.php`
    if (appOptions.type === AppType.Api) return `https://api-${name}${envSubdomain}.dealerpolicy.cloud/status`
    if (appOptions.tld === TldType.cloud) return `https://${name}${envSubdomain}.dealerpolicy.cloud/status`
    return `https://${name}${envSubdomain}.dealerpolicy.com/status`
}


export const getDeployStatus = (app: IApplicationData): DeployStatus => {
    if (Object.values<IEnvironmentValue>(app.environments).some(e => e.error)) {
        return DeployStatus.error
    }

    const {qa, staging, prod} = app.environments;

    if (qa.version !== staging.version && !app.separateReleaseBranch) return DeployStatus.pendingStaging;
    if (staging.version !== prod.version) return DeployStatus.pendingRelease;
    return DeployStatus.upToDate;
}

export const getDeployStatusMessage = (status: DeployStatus): string => {
    switch (status) {
        case DeployStatus.error: return 'Error';
        case DeployStatus.pendingStaging: return 'Pending Staging';
        case DeployStatus.pendingRelease: return 'Pending Release';
        case DeployStatus.upToDate: return 'Up To Date';
        default: return '';
    }
}

export const getDeployStatusStage = (status: DeployStatus): number => {
    switch (status) {
        case DeployStatus.error: return 0;
        case DeployStatus.pendingStaging: return 1;
        case DeployStatus.pendingRelease: return 2;
        case DeployStatus.upToDate: return 3;
        default: return 0;
    }
}

export const getDeployStatusColor = (status: DeployStatus): string => {
    switch (status) {
        case DeployStatus.error: return red[800];
        case DeployStatus.pendingStaging: return deepOrange[800];
        case DeployStatus.pendingRelease: return blue[800];
        case DeployStatus.upToDate: return green[800];
        default: return '';
    }
}
