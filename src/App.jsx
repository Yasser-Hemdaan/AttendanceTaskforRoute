import { useState, useEffect } from "react";
import CustomerTable from "./components/CustomerTable";
import TransactionGraph from "./components/TransactionGraph";
import { getTransactions } from "./services/api"; // Example API service for fetching transactions

const App = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionData = await getTransactions(); // Fetch transactions data from API
        setTransactions(transactionData); // Update transactions state with fetched data
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions(); // Call fetchTransactions when component mounts
  }, []);

  return (
    <div className="container mt-4">
      <div className="row g-5">
        <div className="col-lg-6">
          <CustomerTable transactions={transactions} />
          {/* Pass transactions as prop */}
        </div>
        <div className="col-lg-6">
          <TransactionGraph transactions={transactions} />{" "}
          {/* Pass transactions as prop */}
        </div>
      </div>
    </div>
  );
};

export default App;
