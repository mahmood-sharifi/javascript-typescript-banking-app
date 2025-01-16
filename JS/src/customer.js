import Transaction from './transaction.js';
import { validateNonEmptyString, validateNumber } from '../utils/validators.js';

class Customer {
    #name
    #id
    #transactions
    type = 'Customer';

    constructor(name, id) {
        validateNonEmptyString(name, 'Name');
        validateNumber(id, 'ID');
        this.#name = name;
        this.#id = id;
        this.#transactions = [];
    }

    getName() {
        return this.#name;
    }

    getId() {
        return this.#id;
    }

    getTransactions() {
        return this.#transactions;
    }

    getBalance() {
        const totalBalance = this.#transactions.reduce((totalBalance, transaction) => totalBalance + transaction.amount, 0); 
        return totalBalance
    }

    addTransactions(amount) {
        validateNumber(amount, 'Amount');
        if (this.getBalance() >= -1 * amount) {
            const transaction = new Transaction(amount)
            this.#transactions.push(transaction);
            return true;
        }
        return false;
    }
}

export default Customer;
