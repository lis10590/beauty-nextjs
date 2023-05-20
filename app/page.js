"use client";
import styles from "./page.module.css";
import { useEffect } from "react";
import axios from "axios";
import image from "../public/tools.png";

export default function Welcome() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/clients/getClients");
        const jsonData = response.data;
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`${styles.welcomeDiv} d-flex flex-column align-items-center mt-3`}
    >
      <h1 className={styles.welcomeApp}>My Beauty Scheduler</h1>
      <h2 className={styles.welcomeHeading}>Welcome</h2>
      <img className={styles.welcomeImg} src={image.src}></img>
    </div>
  );
}
