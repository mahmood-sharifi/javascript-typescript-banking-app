import { IBank, IBranch, ICustomer } from '../interfaces/interfaces';
import { printCustomerDetails } from '../utils/helper';

class Bank implements IBank {
    private _branches: IBranch[];

    constructor(private name: string) {
        this._branches = [];
    }

    addBranch(branch: IBranch): boolean {
        if (this._branches.find(b => b.getName() === branch.getName())) {
            return false;
        }
        this._branches.push(branch);
        return true;
    }

    addCustomer(branch: IBranch, customer: ICustomer): boolean {
        if (!this.checkBranch(branch)) {
            return false;
        }
        return branch.addCustomer(customer);
    }

    addCustomerTransaction(branch: IBranch, customerId: number, amount: number): boolean {
        if (!this.checkBranch(branch)) {
            return false;
        }
        return branch.addCustomerTransaction(customerId, amount);
    }

    findBranchByName(branchName: string): IBranch[] | null {
        const branches = this._branches.filter(branch => branch.getName() === branchName);
        return branches.length > 0 ? branches : null;
    }

    checkBranch(branch: IBranch): boolean {
        return this._branches.includes(branch);
    }

    listCustomers(branch: IBranch, includeTransactions: boolean): void {
        if (!this.checkBranch(branch)) {
            return;
        }
        printCustomerDetails(branch, includeTransactions);
    }

    searchCustomersByIdAcrossBank(id: number): ICustomer | null {
        const customerSet: Set<ICustomer> = new Set();
        for (const branch of this._branches) {
            const customer = branch.searchCustomerById(id);
            if (customer) {
                customerSet.add(customer);
            }
        }
        return customerSet.size > 0 ? [...customerSet][0] : null;
    }

    searchCustomersByNameAcrossBank(name: string): ICustomer[] {
        const customerSet: Set<ICustomer> = new Set();
        this._branches.forEach(branch => {
            const customers = branch.searchCustomerByName(name);
            customers.forEach(customer => customerSet.add(customer));
        });
        return Array.from(customerSet);
    }

    searchCustomersByBalanceAcrossBank(minBalance: number): ICustomer[] {
        const customerSet: Set<ICustomer> = new Set();
        this._branches.forEach(branch => {
            const customers = branch.searchCustomersByBalance(minBalance);
            customers.forEach(customer => customerSet.add(customer));
        });
        return Array.from(customerSet);
    }
}

export default Bank;
