import Bank from "./src/bank.js"
import Branch from "./src/branch.js"
import Customer from "./src/customer.js"

const arizonaBank = new Bank("Arizona")
const westBranch = new Branch("West Branch")
const sunBranch = new Branch("Sun Branch")
const customer1 = new Customer("John", 1)
const customer2 = new Customer("Anna", 2)
const customer3 = new Customer("John", 3)

arizonaBank.addBranch(westBranch)
arizonaBank.addBranch(sunBranch)
arizonaBank.addBranch(westBranch)

arizonaBank.findBranchByName("bank")
arizonaBank.findBranchByName("sun")

arizonaBank.addCustomer(westBranch, customer1)
arizonaBank.addCustomer(westBranch, customer3)
arizonaBank.addCustomer(sunBranch, customer1)
arizonaBank.addCustomer(sunBranch, customer2)

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000)
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000)
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000)

customer1.addTransactions(-1000)
console.log(customer1.getBalance())
arizonaBank.listCustomers(westBranch, true)
arizonaBank.listCustomers(sunBranch,true)

function printCustomerDetails(customer) {
    console.log(`Customer Name: ${customer.getName()}, ID: ${customer.getId()}, Balance: ${customer.getBalance()}`);
}

console.log("Search by ID 1 in West Branch:");
printCustomerDetails(westBranch.searchCustomerById(1));

console.log("Search by name 'John' in West Branch:");
westBranch.searchCustomerByName("John").forEach(printCustomerDetails);

console.log("Search by balance > 1000 in West Branch:");
westBranch.searchCustomersByBalance(1000).forEach(printCustomerDetails);

console.log("Search by ID 1 across the bank:");
printCustomerDetails(arizonaBank.searchCustomersByIdAcrossBank(1));

console.log("Search by name 'Anna' across the bank:");
arizonaBank.searchCustomersByNameAcrossBank("Anna").forEach(printCustomerDetails);

console.log("Search by balance > 1000 across the bank:");
arizonaBank.searchCustomersByBalanceAcrossBank(1000).forEach(printCustomerDetails);