import { Button } from "@repo/ui/button";
import { HealthCheck } from "../components/HealthCheck";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome to Wishper</h1>
        <p>A modern full-stack application with Next.js and NestJS</p>

        <HealthCheck />

        <div className={styles.ctas}>
          <Button className={styles.primary}>Get Started</Button>
        </div>
      </main>
    </div>
  );
}
