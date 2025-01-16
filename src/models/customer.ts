import { ICustomer, ITransaction } from '../interfaces/interfaces';
import Transaction from './transaction';
import { getCustomerBalance } from '../utils/helper';

class Customer implements ICustomer {
    private _transactions: ITransaction[];

    constructor(private _name: string, private _id: number) {
        this._transactions = [];
    }

    getName(): string {
        return this._name;
    }

    getId(): number {
        return this._id;
    }

    getTransactions(): ITransaction[] {
        return this._transactions;
    }

    getBalance(): number {
        return getCustomerBalance(this._transactions);
    }

    addTransactions(amount: number): boolean {
        if (this.getBalance() >= -1 * amount) {
            const transaction = new Transaction(amount);
            this._transactions.push(transaction);
            return true;
        }
        return false;
    }
}

export default Customer;
