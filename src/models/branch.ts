import { IBranch, ICustomer } from '../interfaces/interfaces';

class Branch implements IBranch {
    private _customers: ICustomer[];

    constructor(private _name: string) {
        this._customers = [];
    }

    getName(): string {
        return this._name;
    }

    getCustomers(): ICustomer[] {
        return this._customers;
    }

    addCustomer(newCustomer: ICustomer): boolean {
        if (this._customers.find(customer => customer.getId() === newCustomer.getId())) {
            return false;
        }
        this._customers.push(newCustomer);
        return true;
    }

    addCustomerTransaction(customerId: number, amount: number): boolean {
        const customer = this._customers.find(customer => customer.getId() === customerId);
        return customer ? customer.addTransactions(amount) : false;
    }

    searchCustomerById(id: number): ICustomer | null {
        return this._customers.find(customer => customer.getId() === id) || null;
    }

    searchCustomerByName(name: string): ICustomer[] {
        return this._customers.filter(customer => customer.getName().toLowerCase().includes(name.toLowerCase()));
    }

    searchCustomersByBalance(minBalance: number): ICustomer[] {
        return this._customers.filter(customer => customer.getBalance() > minBalance);
    }
}

export default Branch;
