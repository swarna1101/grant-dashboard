import axios from "axios";
import { useProjectStore } from "../store/projectdata.store";
import { ProjectType, TxnType } from "../types";
import { getRandomHexColor, getTaikoPrice } from "../utils";

import csvtojsonV2 from "csvtojson";
import { useState } from "react";

export const useData = () => {
  const { setProjects } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    const dataUrl = process.env.NEXT_PUBLIC_DATA_URL || "";
    const resp = await axios.get(dataUrl);
    const rawdata = resp.data;
    const data = await csvtojsonV2({}).fromString(rawdata);


   



    return data;
  };

  const parseProjects = async (): Promise<ProjectType[]> => {
    const projects: ProjectType[] = [];

    const data = await fetchData();

    const taikoRates: { [key: string]: number } = {};

    for (const item of data) {
      if (
        item.Vertical &&
        item.Receiver &&
        (item["Amount Out (TAIKO)"] || item["Amount Out (USDT)"])
      ) {
        const amountOutTaiko = parseFloat(
          item["Amount Out (TAIKO)"].toString().replace(/,/g, ""),
        );
        const amountOutUSDT = parseFloat(
          item["Amount Out (USDT)"].toString().replace(/,/g, ""),
        );

        if (isNaN(amountOutTaiko) && isNaN(amountOutUSDT)) {
          continue;
        }
        let amountInUSD = isNaN(amountOutUSDT) ? 0 : amountOutUSDT;
        if (amountInUSD === 0) {
          const date = item["Date"] as string;
          if (taikoRates[date]) {
            amountInUSD = taikoRates[date] * amountOutTaiko;
          } else {
            if (date) {
              const rate = await getTaikoPrice(date);
              taikoRates[date] = rate;
              amountInUSD = rate * amountOutTaiko;
            } else {
              amountInUSD = 0;
            }
          }
        }

        const txn: TxnType = {
          createdAt: item["Date"],
          txnHash: item["Tx Hash"],
          paidInUSD: !isNaN(amountOutUSDT),
          amountInUSD: amountInUSD,
          amountInTaiko: isNaN(amountOutTaiko) ? 0 : amountOutTaiko,
        };

        const projectIndex = projects.findIndex(
          (project) => project.projectName === item.Receiver,
        );
        if (projectIndex === -1) {
          const existingVerticalProject = projects.find((i) => {
            return i.vertial === item.Vertical;
          });
          const verticalColor = existingVerticalProject
            ? existingVerticalProject.verticalColor
            : getRandomHexColor();
          const newProject: ProjectType = {
            projectName: item.Receiver,
            vertial: item.Vertical,
            verticalColor,
            txns: [txn],
          };
          projects.push(newProject);
        } else {
          projects[projectIndex]!.txns.push(txn);
        }
      }
    }

    return projects;
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const projects = await parseProjects();
      setProjects(projects);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loadData,
    isLoading,
  };
};
