import { IApplicationOptions, TeamType, TldType, AppType } from "../models";

export const AppConfig: Array<IApplicationOptions> = [
    { name: 'Agency', type: AppType.Api, team: TeamType.Agent, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=130&branchFilter=624', },
    { name: 'Audit', type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=146&branchFilter=5471' },
    { name: 'Auth', type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=124&branchFilter=3214' },
    { name: 'Bind', type: AppType.Api, team: TeamType.InsureAnts, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=117&branchFilter=4613' },
    { name: 'Communication', type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=123&branchFilter=777' },
    { name: 'Consumerid', type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=126&branchFilter=384' },
    { name: 'Content', type: AppType.Api, team: TeamType.GhostBusters, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=115&branchFilter=53' },
    { name: 'Externalid', type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=162&branchFilter=6852' },
    { name: 'FastPass', type: AppType.Api, team: TeamType.GhostBusters, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=159&branchFilter=6753', displayName: 'FastPass Func' },
    { name: 'Jdpower', type: AppType.Api, team: TeamType.InsureAnts, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=122&branchFilter=3909' },
    { name: 'Links', type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=121&branchFilter=3188' },
    { name: 'Location', type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=120&branchFilter=55' },
    { name: 'Org', type: AppType.Api, team: TeamType.SqueakyWheel, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=169&branchFilter=7435' },
    { name: 'Partners-SaaS', type: AppType.Api, team: TeamType.SqueakyWheel, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=119&branchFilter=4385', limitsCors: true },
    { name: 'Partners-SaasPlus', type: AppType.Api, team: TeamType.SqueakyWheel, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=119&branchFilter=4385', limitsCors: true },
    { name: 'Partners-Cox', type: AppType.Api, team: TeamType.SqueakyWheel, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=119&branchFilter=4385', limitsCors: true },
    { name: 'Partners-1677', type: AppType.Api, team: TeamType.SqueakyWheel, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=119&branchFilter=4385', limitsCors: true },
    { name: 'Partners-2147', type: AppType.Api, team: TeamType.SqueakyWheel, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=119&branchFilter=4385', limitsCors: true },
    { name: 'Partners-3742', type: AppType.Api, team: TeamType.SqueakyWheel, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=119&branchFilter=4385', limitsCors: true },
    { name: 'Partners-8783', type: AppType.Api, team: TeamType.SqueakyWheel, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=119&branchFilter=4385', limitsCors: true },

    { name: 'Payments', type: AppType.Api, team: TeamType.Wheat, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=127&branchFilter=176' },
    { name: 'Rating', type: AppType.Api, team: TeamType.InsureAnts, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?view=mine&_a=releases&definitionId=22' },
    { name: 'Reporting', type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=172&branchFilter=7863' },
    { name: 'Search', type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=151&branchFilter=5609' },
    { name: 'Surehits', type: AppType.Api, team: TeamType.InsureAnts, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=116&branchFilter=4858' },
    { name: 'Travelers', type: AppType.Api, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=170&branchFilter=7445' },
    { name: 'Vehicleid', type: AppType.Api, team: TeamType.Wheat, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=128&branchFilter=56' },

    { name: 'Cot', type: AppType.App, team: TeamType.InsureAnts, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=135&branchFilter=2108', tld: TldType.cloud },
    { name: 'FastPass', type: AppType.App, team: TeamType.GhostBusters, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=137&branchFilter=500' },
    { name: 'Marketplace-Reports', type: AppType.App, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=157&branchFilter=6292' },
    { name: 'Marketplace', type: AppType.App, team: TeamType.Wheat, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?definitionId=145&branchFilter=5416' },
    { name: 'Secure-Checkout', type: AppType.App, team: TeamType.InsureAnts, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_release?_a=releases&view=mine&definitionId=73' },

    { name: 'v1', type: AppType.v1, team: TeamType.Shared, pipelineUrl: 'https://dev.azure.com/dealerpolicy/DealerPolicy/_build?_a=releases&view=mine&definitionId=20', separateReleaseBranch: true }
];
