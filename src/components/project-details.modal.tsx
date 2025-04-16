
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
                className="dark"
                show={isOpen}

                position={"center"}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>{project.projectName} Payment Details</Modal.Header>
                <Modal.Body>
                    <Table className="mt-5  dark:bg-gray-800">
                        <Table.Head>
                            <Table.HeadCell>Date</Table.HeadCell>
                            <Table.HeadCell>Txn Hash</Table.HeadCell>
                            <Table.HeadCell>Amount </Table.HeadCell>

                        </Table.Head>
                        <Table.Body className="divide-y">

                            {

                                project.txns.map((txn, index) => {
                                    return <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className=" font-medium text-gray-900 dark:text-white">
                                            {moment(txn.createdAt).format('DD/MM/YYYY')}

                                        </Table.Cell>



                                        <Table.Cell className=" font-medium text-gray-900 dark:text-white">


                                            <a href={txn.txnHash}
                                                target="_blank"

                                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                {txn.txnHash.split('/tx/')[1]}
                                            </a>
                                        </Table.Cell>


                                        <Table.Cell className=" font-medium text-gray-900 dark:text-white">
                                            ${txn.amountInUSD} | {txn.amountInTaiko} TAIKO

                                        </Table.Cell>

                                    </Table.Row>
                                })






                            }






                        </Table.Body>


                    </Table>

                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
