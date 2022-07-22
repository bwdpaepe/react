import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const TransactionContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [currentTransaction, setCurrentTransaction] = useState({});

  const refreshTransactions = useCallback(async () => {
    try {
      setError();
      setLoading(true)
      const {
        data
      } = await axios.get(`http://localhost:9000/api/transactions?limit=25&offset=0`);
      setTransactions(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTransactions();
  }, [refreshTransactions]);

  const createTransaction = async ({
    placeId,
    amount,
    date,
    user
  }) => {
    setError();
    try {
      const { newTransaction } = await axios.post('http://localhost:9000/api/transactions/',
        { placeId, amount, date, user });
      await refreshTransactions();
      return newTransaction;
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const setTransactionToUpdate = useCallback((id) => {
    setCurrentTransaction(id === null ? {} : transactions.find((t) => t.id === id));
  }, [transactions]);

  return (
    <TransactionContext.Provider value={{ transactions, error, loading, createTransaction, setTransactionToUpdate, currentTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};