import styles from "./page.module.css";
import { Button } from "@/components/mantine.helper";

export default function Home() {
  return (
    <main className={styles.main}>
      <Button size="md">This Is Test Button</Button>
    </main>
  );
}
