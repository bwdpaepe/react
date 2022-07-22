import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext
} from 'react';
import * as transactionsApi from '../api/transactions';
import { useSession } from './AuthProvider';

export const TransactionsContext = createContext();
export const useTransactions = () => useContext(TransactionsContext);

export const TransactionsProvider = ({
  children
}) => {
  const { ready: authReady } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({});

  const refreshTransactions = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await transactionsApi.getAllTransactions();
      setTransactions(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authReady && !initialLoad) {
      refreshTransactions();
      setInitialLoad(true);
    }
  }, [authReady, initialLoad, refreshTransactions]);

  const createOrUpdateTransaction = useCallback(async ({
    id,
    placeId,
    amount,
    date
  }) => {
    setError();
    setLoading(true);
    try {
      const changedTransaction = await transactionsApi.saveTransaction({
        id,
        placeId,
        amount,
        date
      });
      await refreshTransactions();
      return changedTransaction;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshTransactions]);

  const deleteTransaction = useCallback(async (id) => {
    try {
      setError();
      setLoading(true);
      await transactionsApi.deleteTransaction(id);
      refreshTransactions();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [refreshTransactions]);

  const setTransactionToUpdate = useCallback((id) => {
    setCurrentTransaction(id === null ? {} : transactions.find((t) => t.id === id));
  }, [transactions]);

  const value = useMemo(() => ({
    transactions,
    error,
    loading,
    currentTransaction,
    createOrUpdateTransaction,
    deleteTransaction,
    setTransactionToUpdate,
  }), [transactions, error, loading, currentTransaction, createOrUpdateTransaction,
    deleteTransaction,
    setTransactionToUpdate
  ]);

  return (
    <TransactionsContext.Provider value={value} >
      {children}
    </TransactionsContext.Provider>
  );
};
