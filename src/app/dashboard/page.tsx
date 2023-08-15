"use client";

import DataList from "@/components/dashboard/DataList";
import { Button, Flex, Skeleton, Title } from "@mantine/core";
import React from "react";
import styles from "./page.module.css";
import { useUser } from "@/hooks/user.swr";

function Page() {
  const { userData, errorFetchingUserData, isUserDataLoading } = useUser();

  return (
    <Flex direction="column" gap="lg">
      {isUserDataLoading || errorFetchingUserData || !userData ? (
        <Skeleton height={100} />
      ) : (
        <>
          <Flex
            className={styles.header}
            justify="space-between"
            align="center"
          >
            <Title order={3}> Activity</Title>
            {userData.role === "doctor" && (
              <Button size="md">Add New Case</Button>
            )}
          </Flex>
          <DataList />
        </>
      )}
    </Flex>
  );
}

export default Page;
