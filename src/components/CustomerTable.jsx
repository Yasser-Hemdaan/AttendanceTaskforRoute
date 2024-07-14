/******************************************/
/******************************************/
/*** Read text file named Important.txt ***/
/******************************************/
/******************************************/

import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001";

const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

const CustomerTable = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({ name: "", amount: "" });

  useEffect(() => {
    const fetchData = async () => {
      const customerData = await getCustomers();
      const transactionData = await getTransactions();
      setCustomers(customerData);
      setTransactions(transactionData);
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const customer = customers.find((c) => c.id === transaction.customer_id);
    const matchesName =
      !filter.name ||
      (customer &&
        customer.name.toLowerCase().includes(filter.name.toLowerCase()));
    const matchesAmount =
      !filter.amount || transaction.amount.toString().includes(filter.amount);
    return matchesName && matchesAmount;
  });

  return (
    <div className="wrapper w-100 mx-auto row container">
      <h2 className="text-white text-center py-3">Customer Table Dashboard</h2>
      <input
        className="col-6 p-2"
        type="text"
        placeholder="Filter by name"
        value={filter.name}
        onChange={(e) => setFilter({ ...filter, name: e.target.value })}
      />
      <input
        className="col-6 p-2"
        placeholder="Filter by amount"
        name="amount"
        value={filter.amount}
        onChange={handleFilterChange}
        type="number"
      />
      <table className="table table-hover table-dark table-responsive">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Transaction Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => {
            const customer = customers.find(
              (c) => c.id === transaction.customer_id
            );
            if (!customer) return null;
            return (
              <tr key={transaction.id}>
                <td>{customer.name}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
