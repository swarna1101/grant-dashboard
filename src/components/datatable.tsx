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
  const [selectedVertical, setSelectedVertical] = useState<string>('');

  // Get unique verticals from data
  const verticals = Array.from(new Set(data.map(project => project.vertial)));

  // Filter data based on selected vertical
  const filteredData = selectedVertical 
    ? data.filter(project => project.vertial === selectedVertical)
    : data;

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // Get the data for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageData = filteredData.slice(startIndex, endIndex);

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
    <div className="m-4 w-full overflow-x-auto">
      <span className="block w-full text-center text-2xl font-bold text-gray-900 dark:text-white">
        Grant Details
      </span>
      <div className="mt-5 flex gap-4">
        <div className="w-1/2">
          <TextInput 
            placeholder="search project" 
            onChange={(t) => {
              onSearch(t.target.value)
            }}
            className="bg-white dark:bg-gray-700"
          />
        </div>
        <div className="w-1/2">
          <select
            className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={selectedVertical}
            onChange={(e) => {
              setSelectedVertical(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Verticals</option>
            {verticals.map((vertical) => (
              <option key={vertical} value={vertical}>
                {vertical}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Table className="mt-5">
        <Table.Head>
          <Table.HeadCell className="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
            Project name
          </Table.HeadCell>
          <Table.HeadCell className="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
            Vertical
          </Table.HeadCell>
          <Table.HeadCell className="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
            Total Amount Paid ($)
          </Table.HeadCell>
          <Table.HeadCell className="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
          {currentPageData.map((project: ProjectType, index: number) => {
            return (
              <Table.Row
                key={index}
                className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <Table.Cell className="font-medium text-gray-900 dark:text-white">
                  {project.projectName}
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    className="text-white"
                    style={{ background: project.verticalColor }}
                  >
                    {project.vertial}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-gray-700 dark:text-white">
                  {getUSDValue(project)}
                </Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    onClick={() => {
                      setSelectedProject(project);
                      setModelOpen(true);
                    }}
                    className="font-medium text-blue-600 hover:text-blue-800 hover:underline dark:text-cyan-500 dark:hover:text-cyan-400"
                  >
                    Details
                  </a>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <div className="mt-5 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          className="text-gray-700 dark:text-gray-200"
        />
      </div>

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
