import { Refresh, GitHub } from "@mui/icons-material";
import {
  Chip,
  CircularProgress,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import {
  DataGrid,
  GridColumns,
  GridEnrichedColDef,
  GridRenderCellParams,
  GridSortModel,
} from "@mui/x-data-grid";
import { FC, useEffect, useMemo, useState } from "react";
import useFilterParams from "../hooks/useFilterParams";
import {
  DeployStatus,
  EnvironmentType,
  IApplicationInfoRow,
  IEnvironmentValue,
  TeamType,
} from "../models";
import { getAppVersions } from "../services/app-versions";
import {
  DeployStatusDisplay,
  DeployStatusColor,
  DeployStatusStage,
  TeamTypeDisplay,
  nameof,
  isDeployedUpTo,
} from "../utils";

type IRenderCellProps = GridRenderCellParams<any, IApplicationInfoRow, any>;
type IRenderTeamProps = GridRenderCellParams<
  TeamType,
  IApplicationInfoRow,
  any
>;
type IRenderStatusProps = GridRenderCellParams<
  DeployStatus,
  IApplicationInfoRow,
  any
>;
type IRenderEnvCellProps = GridRenderCellParams<
  IEnvironmentValue,
  IApplicationInfoRow,
  any
>;

const StatusGrid: FC = () => {
  const [filterParams, setFilterParams] = useFilterParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [loadDateTime, setLoadDateTime] = useState<Date | null>(null);
  const [appVersions, setAppVersions] = useState<IApplicationInfoRow[]>([]);
  const theme = useTheme();
  const isPhoneScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isBigScreen = useMediaQuery(theme.breakpoints.up("xl"));

  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "deployStatus",
      sort: "asc",
    },
  ]);

  const hydrateData = async () => {
    const resp = await getAppVersions();
    setAppVersions(resp);
    setIsLoading(false);
    setIsRefreshing(false);
    setLoadDateTime(new Date());
  };

  useEffect(() => {
    hydrateData();
  }, []);

  const chipCol: Partial<GridEnrichedColDef> = {
    sortable: false,
    headerAlign: "center",
    align: "center",
    width: 116,
    hide: isPhoneScreen,
  };
  const chipSx: SxProps<Theme> = {
    width: 100,
    borderRadius: 2,
  };

  const cols: GridColumns = [
    {
      field: nameof<IApplicationInfoRow>("id"),
      headerName: "Name",
      minWidth: 150,
      flex: 1,
    },
    {
      field: nameof<IApplicationInfoRow>("deployStatus"),
      headerName: "Status",
      minWidth: 150,
      sortComparator: (v1, v2, _params1, _params2) => {
        return (
          DeployStatusStage[v1 as DeployStatus] -
          DeployStatusStage[v2 as DeployStatus]
        );
      },
      flex: 1,
      renderCell: ({ value, row }: IRenderStatusProps) => (
        <Link
          href={row.pipelineUrl}
          target={"_blank"}
          color={DeployStatusColor[row.deployStatus]}
          underline={"hover"}
        >
          {DeployStatusDisplay[value]}
        </Link>
      ),
    },
    {
      field: nameof<IApplicationInfoRow>("team"),
      headerName: "Team",
      minWidth: 150,
      flex: 1,
      renderCell: ({ value }: IRenderTeamProps) => TeamTypeDisplay[value],
      hide: !isBigScreen,
    },
    {
      field: nameof<IApplicationInfoRow>("vertical"),
      headerName: "Vertical",
      minWidth: 150,
      flex: 1,
      hide: !isBigScreen,
    },
    {
      field: nameof<IApplicationInfoRow>("type"),
      headerName: "Type",
      minWidth: 80,
      flex: 0.5,
      hide: !isBigScreen,
    },
    {
      ...chipCol,
      field: String(EnvironmentType.qa),
      headerName: "QA",
      renderCell: ({ value, row }: IRenderEnvCellProps) => (
        <Chip
          clickable={true}
          component={"a"}
          href={value.url}
          target={"_blank"}
          label={value.version || "-"}
          sx={{
            ...chipSx,
            ...(row.separateReleaseBranch && {
              border: "none",
              background: "none",
            }),
          }}
          color={value.error ? "error" : "default"}
          variant={
            isDeployedUpTo(row.deployStatus, DeployStatus.pendingStaging)
              ? "filled"
              : "outlined"
          }
        />
      ),
    },
    {
      ...chipCol,
      field: String(EnvironmentType.staging),
      headerName: "Staging",
      renderCell: ({ value, row }: IRenderEnvCellProps) => (
        <Chip
          clickable={true}
          component={"a"}
          href={value.url}
          target={"_blank"}
          label={value.version || "-"}
          sx={chipSx}
          color={value.error ? "error" : "default"}
          variant={
            isDeployedUpTo(row.deployStatus, DeployStatus.pendingRelease)
              ? "filled"
              : "outlined"
          }
        />
      ),
    },
    {
      ...chipCol,
      field: String(EnvironmentType.prod),
      headerName: "Prod",
      renderCell: ({ value, row }: IRenderCellProps) => (
        <Chip
          clickable={true}
          component={"a"}
          href={value.url}
          target={"_blank"}
          label={value.version || "-"}
          sx={chipSx}
          color={value.error ? "error" : "default"}
          variant={
            isDeployedUpTo(row.deployStatus, DeployStatus.upToDate)
              ? "filled"
              : "outlined"
          }
        />
      ),
    },
  ];

  const filteredRows = useMemo(() => {
    const filtered = appVersions?.filter((row) => {
      return (
        (!filterParams.status?.length ||
          filterParams.status.includes(row.deployStatus)) &&
        (!filterParams.team?.length || filterParams.team.includes(row.team)) &&
        (!filterParams.vertical?.length ||
          filterParams.vertical.includes(row.vertical))
      );
    });
    return filtered;
  }, [appVersions, filterParams]);

  return (
    <>
      {isLoading ? (
        <Stack height={100} justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 8,
              right: 16,
            }}
          >
            <Typography variant="body2" paddingBottom={0.5}>
              {loadDateTime?.toLocaleTimeString([], {
                hour: "numeric",
                minute: "numeric",
              })}
            </Typography>
            <Tooltip title="Refresh Data">
              <IconButton
                aria-label="Refresh Data"
                disabled={isRefreshing}
                onClick={() => {
                  setIsRefreshing(true);
                  void hydrateData();
                }}
              >
                <Refresh />
              </IconButton>
            </Tooltip>
            <Tooltip title="GitHub Page">
              <IconButton
                aria-label="GitHub Page"
                onClick={() => {
                  window.open(
                    "https://github.com/TylorMayfield/dp-staging-checker",
                    "_blank"
                  );
                }}
              >
                <GitHub />
              </IconButton>
            </Tooltip>
          </Stack>
          <DataGrid
            style={{ border: "none" }}
            rows={filteredRows}
            columns={cols}
            density={"standard"}
            autoHeight={true}
            hideFooter={true}
            disableColumnMenu={true}
            disableVirtualization={true}
            sortingOrder={["desc", "asc"]}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            components={{
              NoRowsOverlay: () => (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  marginTop={12}
                  columnGap={1}
                >
                  <span>No Results</span>
                  <span>-</span>
                  <Link
                    component="button"
                    onClick={() => setFilterParams({})}
                    fontSize={"inherit"}
                  >
                    Clear Filters
                  </Link>
                </Stack>
              ),
            }}
          />
        </>
      )}
    </>
  );
};

export default StatusGrid;
