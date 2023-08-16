"use client";

import React from "react";
import { Flex, Skeleton, Title, Text } from "@mantine/core";
import Image from "next/image";
import IIITMIcon from "@/assets/iiitm_icon.svg";
import AvaterIcon from "@/assets/general/avatar_icon.svg";
import { useUser } from "@/hooks/user.swr";
import { IconUser } from "@tabler/icons-react";
import styles from "./Header.module.css";
import Link from "next/link";

function Header() {
  const { userData, errorFetchingUserData, isUserDataLoading } = useUser();
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      className={styles.container}
      gap={24}
      p={0}
    >
      <Link href={"/dashboard"}>
        <Flex direction="row" align="center" gap={16}>
          <Image width={20.1} height={32} src={IIITMIcon} alt="IIITM Logo" />
          <Title order={2} size="md">
            Health Center
          </Title>
        </Flex>
      </Link>
      {isUserDataLoading || errorFetchingUserData || !userData ? (
        <Skeleton width={150} height={32.8} />
      ) : (
        <Flex direction="row" align="center" gap={16}>
          <Flex
            align="center"
            justify="center"
            className={styles.profileChip}
            px={10}
            py={4}
          >
            <Text color="primary" size="sm" transform="capitalize" weight={600}>
              {userData.role}
            </Text>
          </Flex>
          <Text weight={600}>{userData.name}</Text>
          <Image src={AvaterIcon} alt="avater" width={25} height={25} />
        </Flex>
      )}
    </Flex>
  );
}

export default Header;
