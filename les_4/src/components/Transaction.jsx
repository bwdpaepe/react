import React, { useContext, useMemo, useState } from 'react';
import { set } from 'react-hook-form';
import { IoPencil, IoTrashOutline } from 'react-icons/io5';
import { useCallback } from 'react/cjs/react.development';
import { TransactionContext } from '../context/TransactionsProvider';

const Transaction = React.memo(({ id, date, amount, user, place }) => {
  const { setTransactionToUpdate, deleteTransaction } = useContext(TransactionContext);
  const handleUpdate = useCallback(() => {
    setTransactionToUpdate(id);
  }, [setTransactionToUpdate]);

  const handleDelete = useCallback(async () => {
    await deleteTransaction(id);
  }, [deleteTransaction]);

  return (
    <tr>
      <td className="border w-1/4 px-4 py-2">
        {new Date(date).toLocaleDateString()}
      </td>
      <td className="border w-1/4 px-4 py-2">
        {user.name}
      </td>
      <td className="border w-1/4 px-4 py-2">
        {place.name}
      </td>
      <td className="border w-1/4 px-4 py-2">
        {amount}
      </td>
      <td className="border w-1/4 px-4 py-2">
        <button onClick={handleUpdate}>
          <IoPencil />
        </button>
      </td>
      <td className="border w-1/4 px-4 py-2">
        <button onClick={handleDelete}>
          <IoTrashOutline />
        </button>
      </td>
    </tr>
  );
});

export default function Transactions() {
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const { transactions, loading, error } = useContext(TransactionContext);
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      console.log('filtering...');
      return t.place.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [transactions, search]);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return (
      <p className="text-red-500">{JSON.stringify(error, null, 2)}</p>
    );
  }
  return (
    <>
      <div className='m-5 flex'>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='flex-1'
          placeholder='search'
        />
        <button type='button' onClick={() => setSearch(text)}>
          Search
        </button>
      </div>
      <table className="table-fixed m-auto">
        <thead>
          <tr>
            <th className="border w-1/4 px-4 py-2">Date</th>
            <th className="border w-1/4 px-4 py-2">User</th>
            <th className="border w-1/4 px-4 py-2">What?</th>
            <th className="border w-1/4 px-4 py-2">Amount</th>
            <th className="border w-1/4 px-4 py-2">Date</th>
            <th className="border w-1/4 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredTransactions.map((trans) => (
              <Transaction {...trans} key={trans.id} />
            ))
          };
        </tbody>
      </table>
    </>
  )

}
