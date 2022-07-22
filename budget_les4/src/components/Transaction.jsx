import React, { useContext, useMemo } from 'react';
import { TransactionContext } from '../components/TransactionsProvider';
import { IoTrashOutline, IoPencil } from 'react-icons/io5';

function Transaction() {
  const { setTransactionToUpdate, deleteTransaction } = useContext(TransactionContext);
  return (
    <tr>
      <td className="border w-1/4 px-4 py-2">{new Date(date).toLocaleDateString()}</td>
      <td className="border w-1/4 px-4 py-2">{user.name}</td>
      <td className="border w-1/4 px-4 py-2">{place.name}</td>
      <td className="border w-1/4 px-4 py-2">{amount} €</td>
      <td className="border w-1/4 px-4 py-2">
        <button>
          <IoPencil />
        </button>
      </td>
      <td className="border w-1/4 px-4 py-2">
        <button>
          <IoTrashOutline />
        </button>
      </td>
    </tr>
  );
}

const MemoizedTransaction = React.memo(Transaction);

export default function Transactions(search) {
  const { transactions, error, loading } = useContext(TransactionContext);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      return t.place.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [transactions, search]);

  if (loading) return <h1>Loading...</h1>
  if (error) return <pre className="text-red-600">{error.message}</pre>
  if (!transactions) return null;
  return (
    <table className="table-fixed m-auto">
      <tbody>
        {filteredTransactions.map((trans, i) => {
          return <MemoizedTransaction key={i} {...trans} />;
        })}
      </tbody>
    </table>
  );
}
