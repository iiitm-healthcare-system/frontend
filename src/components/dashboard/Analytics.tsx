import { useAnalytics, useQuickStats, useRecords } from "@/hooks/records.swr";
import {
  Flex,
  Pagination,
  Select,
  Skeleton,
  Table,
  Title,
} from "@mantine/core";
import React from "react";
import styles from "./Analytics.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from "recharts";
import { useElementSize, useViewportSize } from "@mantine/hooks";

const STATUS_COLOR = {
  admit: "red",
  ongoing: "yellow",
  completed: "teal",
};

type TimeframeOptions = "week" | "month" | "year";
type TypeOptions = "active" | "complete" | "admit" | "opened";

function Analytics() {
  const { ref, width } = useElementSize();
  const [timeframe, setTimeframe] = React.useState<TimeframeOptions>("week");
  const [type, setType] = React.useState<TypeOptions>("active");
  const { analytiicsData, errorFetchingAnalyticsData, isAnalyticsDataLoading } =
    useAnalytics(timeframe, type);
  const {
    quickStatsData,
    errorFetchingQuickStatsData,
    isQuickStatsDataLoading,
  } = useQuickStats();

  return (
    <Flex direction="column" gap={30} className={styles.container}>
      <Title order={3}>Dashboard</Title>
      <Flex
        direction="column"
        gap="xl"
        className={styles.analyticsContainer}
        ref={ref}
      >
        <Flex direction="row" justify="space-between" align="center">
          <Title order={4}>Cases</Title>
          <Flex direction="row" gap="sm" align="center">
            <Select
              data={["week", "month", "year"]}
              color="primary"
              value={timeframe}
              required
              onChange={(value) =>
                value && setTimeframe(value as TimeframeOptions)
              }
            />
            <Select
              data={["active", "complete", "admit", "opened"]}
              color="primary"
              value={type}
              required
              onChange={(value) => value && setType(value as TypeOptions)}
            />
          </Flex>
        </Flex>
        {errorFetchingAnalyticsData ||
        isAnalyticsDataLoading ||
        !analytiicsData ||
        !width ? (
          <Skeleton height={300} />
        ) : (
          <LineChart
            width={width}
            height={300}
            data={analytiicsData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={14} />
            <YAxis fontSize={14} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amt"
              strokeWidth={2}
              stroke="#0E9CFF"
            />
          </LineChart>
        )}
      </Flex>
    </Flex>
  );
}

export default Analytics;
