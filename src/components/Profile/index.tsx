import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

type User = {
  firstName: string;
  age: string;
  image: string;
};

async function fetchData() {
  const response = await fetch("https://dummyjson.com/users/1");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

function useFetchData() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setStatus("loading");

      try {
        const result = await fetchData();
        setStatus("success");
        setData(result);
      } catch (error) {
        setStatus("error");
      }
    };

    fetchDataAsync();
  }, []);

  return {
    status,
    data,
  };
}

export const Profile: React.FC = () => {
  const { status, data } = useFetchData();

  if (status === "loading" || status === "idle") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className={styles.wrapper}>
      <img src={data!.image} className={styles.image} />
      <div>{data!.firstName}</div>
      <div>{data!.age}</div>
    </div>
  );
};
