"use client";

import { Button, Modal, Table } from "flowbite-react";
import { ProjectType } from "../types";
import moment from "moment";

export function ProjectDetailsModel({ project, isOpen, setOpenModal }: { project?: ProjectType, isOpen: boolean, setOpenModal: (isOpen: boolean) => void }) {
    if (!project) {
        return <div></div>
    }

    return (
        <>
            <Modal
                size={"5xl"}
                show={isOpen}
                position={"center"}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header className="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">
                    {project.projectName} Payment Details
                </Modal.Header>
                <Modal.Body className="bg-white dark:bg-gray-800">
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
                                                {txn.txnHash.split('/tx/')[1]}
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
