"use client";
import styles from "./page.module.css";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
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
}
