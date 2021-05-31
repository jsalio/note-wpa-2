import { transactionStatus } from "../enum/transaction-status";


export type Note = {
    id: string,
    name: string,
    text: string,
    author: string,
    date: string,
    transactionStatus: transactionStatus
}