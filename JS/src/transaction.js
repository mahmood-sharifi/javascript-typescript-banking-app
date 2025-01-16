import { validateNumber, validateDate } from '../utils/validators.js';

class Transaction {
    type = 'Transaction';

    constructor(amount, date = new Date()) {
        validateNumber(amount, 'Amount');
        validateDate(date, 'Date');
        this.amount = amount;
        this.date = date;
    }
}

export default Transaction;