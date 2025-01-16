import { ITransaction } from '../interfaces/interfaces';

class Transaction implements ITransaction {
    constructor(public amount: number, public date: Date = new Date()) {}
}

export default Transaction;
