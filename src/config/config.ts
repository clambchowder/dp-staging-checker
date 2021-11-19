import { IApplicationOptions, TeamType, TldType, AppType } from "../models";
import { DefineIdentity } from "../utils";

const defineApps = DefineIdentity<Record<string, IApplicationOptions>>();

export const AppConfig = defineApps({
    Agency: { type: AppType.Api, team: TeamType.Agent, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=130&branchFilter=624', },
    Audit: { type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=146&branchFilter=5471' },
    Auth: { type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=124&branchFilter=3214' },
    Bind: { type: AppType.Api, team: TeamType.InsureAnts, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=117&branchFilter=4613' },
    Communication: { type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=123&branchFilter=777' },
    Consumerid: { type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=126&branchFilter=384' },
    Content: { type: AppType.Api, team: TeamType.GhostBusters, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=115&branchFilter=53' },
    Externalid: { type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=162&branchFilter=6852' },
    Jdpower: { type: AppType.Api, team: TeamType.InsureAnts, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=122&branchFilter=3909' },
    Links: { type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=121&branchFilter=3188' },
    Location: { type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=120&branchFilter=55' },

    Org: { type: AppType.Api, team: TeamType.SqueakyWheel, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=169&branchFilter=7435' },
    'Partners-SaaS': { type: AppType.Api, team: TeamType.SqueakyWheel, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=119&branchFilter=4385', displayName: 'Partners SaaS' },

    Payments: { type: AppType.Api, team: TeamType.Wheat, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=127&branchFilter=176' },
    Search: { type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=151&branchFilter=5609' },
    Reporting: { type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=172&branchFilter=7863' },
    Surehits: { type: AppType.Api, team: TeamType.InsureAnts, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=116&branchFilter=4858' },
    Travelers: { type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=170&branchFilter=7445' },
    Vehicleid: { type: AppType.Api, team: TeamType.Wheat, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=128&branchFilter=56' },
    Rating: { type: AppType.Api, team: TeamType.InsureAnts, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?view=mine&_a=releases&definitionId=22' },

    FastPass: { type: AppType.App, team: TeamType.GhostBusters, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=137&branchFilter=500' },
    'Secure-Checkout': { type: AppType.App, team: TeamType.InsureAnts, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_release?_a=releases&view=mine&definitionId=73' },
    Marketplace: { type: AppType.App, team: TeamType.Wheat, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=145&branchFilter=5416' },
    'Marketplace-Reports': { type: AppType.App, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=157&branchFilter=6292', displayName: 'Marketplace Reports' },

    Cot: { type: AppType.App, team: TeamType.InsureAnts, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=135&branchFilter=2108', tld: TldType.cloud },

    v1: { type: AppType.v1, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?_a=releases&view=mine&definitionId=20', separateReleaseBranch: true }
})

export type AppNames = keyof typeof AppConfig
