"use client";

import { Badge, Label, Pagination, Table, TextInput } from "flowbite-react";
import { ProjectType } from "../types";
import { useState } from "react";
import { ProjectDetailsModel } from "./project-details.modal";

interface DataTableProps {
  data: ProjectType[];
  onSearch:(term:string)=>void
}

export function DataTable({ data,onSearch }: DataTableProps) {
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  // Get the data for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageData = data.slice(startIndex, endIndex);

  const [isOpen, setModelOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    ProjectType | undefined
  >(undefined);
  // Handle page change
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getUSDValue = (project: ProjectType) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(
      project.txns.reduce((acc, txn) => {
        return acc + txn.amountInUSD;
      }, 0),
    );
  };

  return (
    <div className="dark m-4 w-full overflow-x-auto">
      <span className="w-full text-center text-2xl font-bold">
        Grant Details
      </span>
      <div  className="mt-5">
   
        <TextInput placeholder="search project" onChange={(t) => {
          onSearch(t.target.value)
        }}/>
      </div>

      <Table className="mt-5">
        <Table.Head>
          <Table.HeadCell>Project name</Table.HeadCell>
          <Table.HeadCell>Vertical</Table.HeadCell>
          <Table.HeadCell>Total Amount Paid ($)</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentPageData.map((project: ProjectType, index: number) => {
            return (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="font-medium text-gray-900 dark:text-white">
                  {project.projectName}
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    className=""
                    style={{ background: project.verticalColor, color: "#fff" }}
                  >
                    {project.vertial}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{getUSDValue(project)}</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    onClick={() => {
                      setSelectedProject(project);
                      setModelOpen(true);
                    }}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Details
                  </a>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Pagination
        className="mt-5"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => {
          goToPage(page);
        }}
      />

      <ProjectDetailsModel
        isOpen={isOpen}
        project={selectedProject}
        setOpenModal={(isOpened: boolean) => {
          setModelOpen(isOpened);
          if (!isOpened) {
            setSelectedProject(undefined);
          }
        }}
      />
    </div>
  );
}
