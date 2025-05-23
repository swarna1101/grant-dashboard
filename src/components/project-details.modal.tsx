"use client";

import { Button, Modal, Table, Tabs } from "flowbite-react";
import { ProjectType } from "../types";
import moment from "moment";
import dynamic from 'next/dynamic';
import { Suspense } from "react";
import { Transaction } from "./project-dashboards/BaseProjectDashboard";
import NetworkAnalytics from "./project-dashboards/NetworkAnalytics";
import BlockMediaAnalytics from "./project-dashboards/BlockMediaAnalytics";
import IntraverseAnalytics from "./project-dashboards/IntraverseAnalytics";
import FourPillarsAnalytics from "./project-dashboards/FourPillarsAnalytics";
import DefiAnalytics from "./project-dashboards/DefiAnalytics";

// Dynamic imports for project dashboards
const loadProjectDashboard = (projectName: string) => {
  const formattedName = projectName.replace(/\s+/g, '');
  return dynamic<{
    projectName: string;
    transactions: Transaction[];
  }>(
    () => import(`./project-dashboards/${formattedName}Dashboard`).catch(() => {
      // If specific dashboard doesn't exist, return the base dashboard
      console.warn(`No specific dashboard found for ${projectName}`);
      return import('./project-dashboards/BaseProjectDashboard');
    }),
    {
      loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-lg"></div>,
      ssr: false
    }
  );
};

// List of DeFi projects
const DEFI_PROJECTS = [
    "Curve", "Solv", "Panko", "Tako Tako", "Avalon", 
    "Dodo", "KiloEx", "Henjin DEX", "iZUMi", "Magpie", "Sushi",
    "Symbiosis", "Swapsicle | Robinos"
];

export function ProjectDetailsModel({ project, isOpen, setOpenModal }: { project?: ProjectType, isOpen: boolean, setOpenModal: (isOpen: boolean) => void }) {
    if (!project) {
        return <div></div>
    }

    const ProjectDashboard = loadProjectDashboard(project.projectName);
    const isBlockMedia = project.projectName === "Block Media";
    const isIntraverse = project.projectName === "Intraverse";
    const isNethermind = project.projectName === "Nethermind";
    const isDefi = DEFI_PROJECTS.includes(project.projectName);

    const transactions: Transaction[] = project.txns.map(txn => {
        // Handle different possible formats of transaction hash
        let hash = txn.txnHash || '';
        if (hash.includes('/tx/')) {
            const parts = hash.split('/tx/');
            hash = parts[1] || hash;
        } else if (hash.includes('0x')) {
            // Already in the correct format
        }
        
        return {
            date: moment(txn.createdAt).format('YYYY-MM-DD'),
            txnHash: hash,
            amount: `$${txn.amountInUSD}`,
            taikoAmount: txn.amountInTaiko.toString()
        };
    });

    return (
        <>
            <Modal
                size={"7xl"}
                show={isOpen}
                position={"center"}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                    {project.projectName} Details
                </Modal.Header>
                <Modal.Body className="bg-white dark:bg-gray-800">
                    <Tabs>
                        {/* Show DeFi Analytics tab for DeFi projects */}
                        {isDefi && (
                            <Tabs.Item active title="DeFi Analytics">
                                <DefiAnalytics projectName={project.projectName} />
                            </Tabs.Item>
                        )}
                        
                        {/* Only show Network Analytics or Block Media Analytics for specific projects */}
                        {project.projectName === "Block Media" ? (
                            <Tabs.Item active={!isDefi} title="Content Analytics">
                                <BlockMediaAnalytics />
                            </Tabs.Item>
                        ) : project.projectName === "Taco Studios" ? (
                            <Tabs.Item active={!isDefi} title="Network Analytics">
                                <NetworkAnalytics />
                            </Tabs.Item>
                        ) : project.projectName === "Intraverse" ? (
                            <Tabs.Item active={!isDefi} title="Game Analytics">
                                <IntraverseAnalytics />
                            </Tabs.Item>
                        ) : project.projectName === "Four Pillars" ? (
                            <Tabs.Item active={!isDefi} title="Content Analytics">
                                <FourPillarsAnalytics />
                            </Tabs.Item>
                        ) : null}
                        
                        {/* Project Analytics tab is available for all projects */}
                        <Tabs.Item active={!["Block Media", "Taco Studios", "Intraverse", "Four Pillars"].includes(project.projectName)} title="Project Analytics">
                            <Table>
                                <Table.Head>
                                    <Table.HeadCell className="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                        Date
                                    </Table.HeadCell>
                                    <Table.HeadCell className="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                        Txn Hash
                                    </Table.HeadCell>
                                    <Table.HeadCell className="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                        Amount
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {project.txns.map((txn, index) => {
                                        // Handle different possible formats of transaction hash for display
                                        let displayHash = txn.txnHash || '';
                                        if (displayHash.includes('/tx/')) {
                                            const parts = displayHash.split('/tx/');
                                            displayHash = parts[1] || displayHash;
                                        }

                                        return (
                                            <Table.Row
                                                key={index}
                                                className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                                            >
                                                <Table.Cell className="font-medium text-gray-900 dark:text-white">
                                                    {moment(txn.createdAt).format('DD/MM/YYYY')}
                                                </Table.Cell>
                                                <Table.Cell className="font-medium text-gray-900 dark:text-white">
                                                    <a
                                                        href={txn.txnHash}
                                                        target="_blank"
                                                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline dark:text-cyan-500 dark:hover:text-cyan-400"
                                                    >
                                                        {displayHash}
                                                    </a>
                                                </Table.Cell>
                                                <Table.Cell className="font-medium text-gray-900 dark:text-white">
                                                    ${txn.amountInUSD} | {txn.amountInTaiko} TAIKO
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table>
                        </Tabs.Item>
                        <Tabs.Item title="Project Analytics">
                            <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-96 rounded-lg"></div>}>
                                <ProjectDashboard
                                    projectName={project.projectName}
                                    transactions={transactions}
                                />
                            </Suspense>
                        </Tabs.Item>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer className="bg-gray-50 dark:bg-gray-800">
                    <Button 
                        color="gray" 
                        onClick={() => setOpenModal(false)}
                        className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
