import { IBranch, ITransaction } from '../interfaces/interfaces';

export function throwError(message: string): never {
    throw new Error(message);
}

export function getCustomerBalance(transactions: ITransaction[]): number {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

export function printCustomerDetails(branch: IBranch, includeTransactions: boolean): void {
    console.log(`The customers of branch named ${branch.getName()}:`);
    branch.getCustomers().forEach(customer => {
        console.log(` -- name of customer: ${customer.getName()}  - ID of customer: ${customer.getId()}`);
        if (includeTransactions) {
            console.log(` ------ List of ${customer.getName()} transactions`);
            customer.getTransactions().forEach(transaction => {
                console.log(` ---------- Transaction: ${transaction.amount} on ${transaction.date}`);
            });
        }
    });
}
