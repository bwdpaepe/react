import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import config from '../config.json';

export const TransactionContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentTransaction, setCurrentTransaction] = useState();

  const refreshTransactions = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.get(`${config.base_url}/transactions`);
      setTransactions(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }

  }, []);

  const createOrUpdateTransaction = useCallback(async ({ id, placeId, amount, date, user }) => {
    try {
      setError('');
      setLoading(true);
      const data = { amount, date, user, placeId };
      const method = id ? 'put' : 'post';
      const url = `${config.base_url}/transactions/${id ?? ''}`;
      const { data: changedTransaction } = await axios({ method, url, data });
      await refreshTransactions();
      return changedTransaction;
    } catch (error) {
      setError(error);
    }
    finally {
      setLoading(false);
    }
  }, [refreshTransactions]);

  const deleteTransaction = useCallback(async (id) => {
    try {
      setError('');
      setLoading(true);
      await axios.delete(`${config.base_url}/api/transactions/${id}`)
      await refreshTransactions();
    } catch (error) {
      setError(error);

    }
    finally {
      setLoading(false);
    }
  }, [refreshTransactions]);

  const setTransactionToUpdate = useCallback((id) => {
    setCurrentTransaction(id === null ? {} : transactions.find((t) => t.id === id));
  }, [transactions]);

  useEffect(() => {
    refreshTransactions();
  }, [refreshTransactions]);

  const value = useMemo(() => ({
    transactions,
    loading,
    error,
    createOrUpdateTransaction,
    deleteTransaction,
    currentTransaction,
    setTransactionToUpdate
  }), [transactions, loading, error,
    createOrUpdateTransaction, deleteTransaction,
    currentTransaction, setTransactionToUpdate]);

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider >
  );
};