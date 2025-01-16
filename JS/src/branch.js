import { validateNonEmptyString, validateInstance, validateNumber } from '../utils/validators.js';

class Branch {
    #name
    #customers
    type = 'Branch';

    constructor(name) {
        validateNonEmptyString(name, 'Branch name');
        this.#name = name;
        this.#customers = [];
    }

    getName() {
        return this.#name;
    }

    getCustomers() {
        return this.#customers;
    }

    addCustomer(newCustomer) {
        validateInstance(newCustomer, 'Customer');
        if (this.#customers.find(customer => customer.getId() === newCustomer.getId())) {
            return false;
        }
        this.#customers.push(newCustomer);
        return true;
    }

    addCustomerTransaction(customerId, amount) {
        validateNumber(customerId)
        validateNumber(amount)
        const customer = this.#customers.find(customer => customer.getId() === customerId);
        if (customer) {
            return customer.addTransactions(amount);
        }
        return false;
    }

    searchCustomerById(id) {
        validateNumber(id, 'ID');
        return this.#customers.find(customer => customer.getId() === id) || null;
    }

    searchCustomerByName(name) {
        validateNonEmptyString(name, 'Name');
        return this.#customers.filter(customer => customer.getName().toLowerCase().includes(name.toLowerCase()));
    }

    searchCustomersByBalance(minBalance) {
        validateNumber(minBalance, 'Minimum Balance');
        return this.#customers.filter(customer => customer.getBalance() > minBalance);
    }
}

export default Branch;
