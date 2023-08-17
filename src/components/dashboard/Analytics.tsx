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
const QUICK_STATS_DATA = [
  {
    lable: "Total Cases",
    key: "cases",
  },
  {
    lable: "Total Recovered",
    key: "recovered",
  },
  {
    lable: "Total Ongoing",
    key: "ongoing",
  },
  {
    lable: "Medication Provided",
    key: "medicationProvided",
  },
  {
    lable: "Medication Not Provided",
    key: "medicationNotProvided",
  },
];

function Analytics() {
  const { ref, width } = useElementSize();
  const [timeframe, setTimeframe] = React.useState<TimeframeOptions>("week");
  const [type, setType] = React.useState<string>("ongoing");
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
              data={["ongoing", "complete", "ALL"]}
              color="primary"
              value={type}
              required
              onChange={(value) => value && setType(value)}
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
            <XAxis dataKey="label" fontSize={14} />
            <YAxis fontSize={14} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              strokeWidth={2}
              stroke="#0E9CFF"
            />
          </LineChart>
        )}
      </Flex>
      <Flex direction="column" gap="lg" mt={16}>
        <Title order={4}>Quick Stats (Last 7 Days)</Title>
        {isQuickStatsDataLoading ||
        errorFetchingQuickStatsData ||
        !quickStatsData ? (
          <Skeleton height={200} />
        ) : (
          <div className={styles.quickStatsContainer}>
            {QUICK_STATS_DATA.map((item, index) => {
              return (
                <Flex
                  key={index}
                  direction="column"
                  justify="space-between"
                  className={styles.quickStatItem}
                >
                  <Title color="black.6" order={6}>
                    {item.lable}
                  </Title>
                  <Title order={3} color="primary">
                    {quickStatsData[item.key as string]}
                  </Title>
                </Flex>
              );
            })}
          </div>
        )}
      </Flex>
    </Flex>
  );
}

export default Analytics;
