"use client";
import { useEffect, useCallback, useState } from "react";
import { DataTable } from "~/components/datatable";
import TaikoPieChart, { PieDataType } from "~/components/taikopiechart";
import { useData } from "~/hooks/useData";
import { useProjectStore } from "~/store/projectdata.store";
import { ProjectType } from "~/types";
import { LoadingState } from "~/components/LoadingState";
import BudgetStats from "~/components/BudgetStats";
import TaikoGrantDashboard from "~/components/TaikoGrantDashboard";

function App() {
  const { projects, isLoading } = useProjectStore();
  const { loadData, isLoading: isDataLoading } = useData();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log({ projects, isLoading });
  }, [projects, isLoading]);

  useEffect(() => {
    loadData();
  }, []);

  const taikoPieChart = useCallback(() => {
    if (projects.length === 0) {
      return <div />;
    }

    const groupedByVertical = projects.reduce(
      (acc, project) => {
        const key = project.vertial;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(project);
        return acc;
      },
      {} as Record<string, ProjectType[]>,
    );

    const pieData: PieDataType[] = Object.keys(groupedByVertical).map((key) => {
      const projects = groupedByVertical[key];
      const total = projects!.reduce((acc, project) => {
        return (
          acc +
          project.txns.reduce((acc, txn) => {
            return acc + txn.amountInUSD;
          }, 0)
        );
      }, 0);
      return {
        name: key,
        value: total,
        color: projects![0]!.verticalColor,
      };
    });

    const filteredPieData = pieData.filter((i) => {
      return i.value > 0;
    });
    const title = `Grants Distribution Chart`;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    // Calculate total USD
    const totalUSD = filteredPieData.reduce((acc, i) => {
      return acc + i.value;
    }, 0);
    const formattedUSD = formatter.format(totalUSD);

    // Calculate total TAIKO
    const totalTAIKO = projects.reduce((acc, project) => {
      return acc + project.txns.reduce((acc, txn) => {
        return acc + (txn.amountInTaiko || 0);
      }, 0);
    }, 0);
    const formattedTAIKO = new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(totalTAIKO);

    const subtitle = `Total Distribution: ${formattedUSD} / ${formattedTAIKO} TAIKO`;
    return (
      <TaikoPieChart data={filteredPieData} title={title} subtitle={subtitle} />
    );
  }, [projects]);

  const getProjects = useCallback(() => {
    if (projects) {
      if (searchTerm) {
        return projects.filter(item => {
          return item.projectName.toLowerCase().includes(searchTerm.toLowerCase())
        });
      } else {
        return projects
      }
    }
    return []
  }, [projects, searchTerm]);

  return (
    <main>
      {isLoading || isDataLoading ? (
        <LoadingState />
      ) : (
        <div className="min-w-screen flex min-h-screen flex-col items-center justify-center gap-4 p-4 dark:bg-gray-800">
          <BudgetStats />
          <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              {taikoPieChart()}
              <TaikoGrantDashboard />
            </div>
            <div className="w-full">
              <DataTable data={getProjects()} onSearch={setSearchTerm} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;