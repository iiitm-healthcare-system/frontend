"use client";

import DataList from "@/components/dashboard/DataList";
import { Button, Flex, Skeleton, Title } from "@mantine/core";
import React from "react";
import styles from "./page.module.css";
import { useUser } from "@/hooks/user.swr";
import Analytics from "@/components/dashboard/Analytics";
import Link from "next/link";

function Page() {
  const { userData, errorFetchingUserData, isUserDataLoading } = useUser();

  return (
    <Flex direction="column" gap="md" pb={30}>
      {isUserDataLoading || errorFetchingUserData || !userData ? (
        <Skeleton height={100} />
      ) : (
        <>
          {userData.role == "admin" ? (
            <>
              <Analytics />
              <Title order={4} px={24}>
                Cases
              </Title>
            </>
          ) : (
            <Flex
              className={styles.header}
              justify="space-between"
              align="center"
            >
              <Title order={3}> Activity</Title>
              {userData.role === "doctor" && (
                <Button
                  size="md"
                  component={Link}
                  href={"/dashboard/case/new"}
                >
                  Add New Case
                </Button>
              )}
            </Flex>
          )}
        </>
      )}
      <DataList />
    </Flex>
  );
}

export default Page;
