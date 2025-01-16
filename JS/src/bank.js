import { validateNonEmptyString, validateInstance, validateNumber } from '../utils/validators.js';

class Bank {
    #name
    #branches
    type = 'Bank';

    constructor(name) {
        validateNonEmptyString(name, 'Bank name');
        this.#name = name;
        this.#branches = [];
    }

    addBranch(addingBranch) {
        validateInstance(addingBranch, 'Branch' );
        if (this.#branches.find(branch => branch.getName() === addingBranch.getName())) {
            return false;
        }
        this.#branches.push(addingBranch);
        return true;
    }

    addCustomer(branch, customer) {
        validateInstance(branch, 'Branch');
        validateInstance(customer, 'Customer');
        if (!this.checkBranch(branch)) {
            return false;
        }
        return branch.addCustomer(customer);
    }

    addCustomerTransaction(branch, customerId, amount) {
        validateInstance(branch, 'Branch');
        validateNumber(customerId, 'Customer ID');
        validateNumber(amount, 'Amount');
        if (!this.checkBranch(branch)) {
            return false;
        }
        return branch.addCustomerTransaction(customerId, amount);
    }

    findBranchByName(branchName) {
        const branches = this.#branches.filter(branch => branch.getName() === branchName);
        return branches.length > 0 ? branches : null;
    }

    checkBranch(branch) {
        return this.#branches.includes(branch);
    }

    listCustomers(branch, includeTransactions) {
        console.log(`The customers to branch named ${branch.getName()}:`)
        console.log(`\n`)
        if (!this.checkBranch(branch)) {
            return;
        }
        branch.getCustomers().forEach(customer => {
            console.log(` -- name of customer: ${customer.getName()}  - ID of customer: ${customer.getId()}`);
            if (includeTransactions) {
                console.log(` ------ List of ${customer.getName()} transactions`)
                customer.getTransactions().forEach(transaction => {
                    console.log(` ---------- Transaction: ${transaction.amount} on ${transaction.date}`);
                });
                console.log(`\n`)
            }
        });
    }

    searchCustomersByIdAcrossBank(id) {
        validateNumber(id, 'ID');
        for (const branch of this.#branches) {
            const customer = branch.searchCustomerById(id);
            if (customer) {
                return customer;
            }
        }
        return null;
    }

    searchCustomersByNameAcrossBank(name) {
        validateNonEmptyString(name, 'Name');
        let matchingCustomers = [];
        this.#branches.forEach(branch => {
            matchingCustomers = matchingCustomers.concat(branch.searchCustomerByName(name));
        });
        return matchingCustomers;
    }

    searchCustomersByBalanceAcrossBank(minBalance) {
        validateNumber(minBalance, 'Minimum Balance');
        let matchingCustomers = [];
        this.#branches.forEach(branch => {
            matchingCustomers = matchingCustomers.concat(branch.searchCustomersByBalance(minBalance));
        });
        return matchingCustomers;
    }
}

export default Bank;
