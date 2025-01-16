export interface ITransaction {
    amount: number;
    date: Date;
}

export interface ICustomer {
    getName(): string;
    getId(): number;
    getTransactions(): ITransaction[];
    getBalance(): number;
    addTransactions(amount: number): boolean;
}

export interface IBranch {
    getName(): string;
    getCustomers(): ICustomer[];
    addCustomer(newCustomer: ICustomer): boolean;
    addCustomerTransaction(customerId: number, amount: number): boolean;
    searchCustomerById(id: number): ICustomer | null;
    searchCustomerByName(name: string): ICustomer[];
    searchCustomersByBalance(minBalance: number): ICustomer[];
}

export interface IBank {
    addBranch(branch: IBranch): boolean;
    addCustomer(branch: IBranch, customer: ICustomer): boolean;
    addCustomerTransaction(branch: IBranch, customerId: number, amount: number): boolean;
    findBranchByName(branchName: string): IBranch[] | null;
    searchCustomersByIdAcrossBank(id: number): ICustomer | null;
    searchCustomersByNameAcrossBank(name: string): ICustomer[];
    searchCustomersByBalanceAcrossBank(minBalance: number): ICustomer[];
}
