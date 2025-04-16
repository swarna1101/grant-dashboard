export type ProjectType = {
    projectName: string,
    vertial: string,
    verticalColor:string,
    txns :TxnType[]
}


export type TxnType = {
    createdAt:string,
    txnHash: string,
    amountInUSD: number,
    amountInTaiko: number,
    paidInUSD : boolean
    
}