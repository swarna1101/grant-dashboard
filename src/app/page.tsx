"use client";
import { useEffect, useCallback, useState } from "react";
import { DataTable } from "~/components/datatable";
import TaikoPieChart, { PieDataType } from "~/components/taikopiechart";
import { useData } from "~/hooks/useData";
import { useProjectStore } from "~/store/projectdata.store";
import { ProjectType } from "~/types";

function App() {
  const { projects, isLoading } = useProjectStore();
  const { loadData, isLoading: isDataLoading } = useData();

  const [searchTerm,setSearchTerm] = useState("")
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
    const formattedAmount = formatter.format(
      filteredPieData.reduce((acc, i) => {
        return acc + i.value;
      }, 0),
    );

    const subtitle = `Total Distribution ${formattedAmount}`;
    return (
      <TaikoPieChart data={filteredPieData} title={title} subtitle={subtitle} />
    );
  }, [projects]);



  const getProjects = useCallback(() => {
    if (projects) {
        
      if (searchTerm) {
        return  projects.filter(item => {
          return  item.projectName.toLowerCase().includes(searchTerm.toLowerCase())
        });
      
      } else {
        return projects
      }
    }
    return []
  }, [projects,searchTerm])
  return (
    <main>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
        </div>
      ) : (
        <div className="min-w-screen flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
          <div className="flex w-full flex-wrap gap-2 md:ml-10 md:flex-nowrap">
            {taikoPieChart()}
            <DataTable data={getProjects()} onSearch={setSearchTerm} />
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
