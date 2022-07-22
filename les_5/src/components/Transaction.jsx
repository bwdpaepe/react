import React, { useCallback, useContext, useMemo } from 'react';
import { IoTrashOutline, IoPencil } from 'react-icons/io5';
import { TransactionsContext } from '../contexts/TransactionsProvider';

function Transaction({ id, date, amount, user, place }) {
	const { setTransactionToUpdate, deleteTransaction } =
		useContext(TransactionsContext);

	const handleUpdate = useCallback(() => {
		setTransactionToUpdate(id);
	}, [setTransactionToUpdate, id]);

	const handleRemove = useCallback(() => {
		deleteTransaction(id);
	}, [deleteTransaction, id]);

	return (
		<tr data-cy="transaction">
			<td className="border w-1/4 px-4 py-2">
				{new Date(date).toLocaleDateString()}
			</td>
			<td className="border w-1/4 px-4 py-2">{user.name}</td>
			<td className="border w-1/4 px-4 py-2">{place.name}</td>
			<td className="border w-1/4 px-4 py-2">{amount} &euro;</td>
			<td className="border w-1/4 px-4 py-2">
				<button>
					<IoPencil onClick={handleUpdate} />
				</button>
			</td>
			<td className="border w-1/4 px-4 py-2">
				<button>
					<IoTrashOutline onClick={handleRemove} />
				</button>
			</td>
		</tr>
	);
}

const MemoizedTransaction = React.memo(Transaction);

export default function Transactions({ search }) {
	const { transactions, error, loading } = useContext(TransactionsContext);

	const filteredTransactions = useMemo(() => {
		return transactions.filter((t) => {
			return t.place.name.toLowerCase().includes(search.toLowerCase());
		});
	}, [transactions, search]);

	if (loading) return <h1>Loading...</h1>;
	if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
	if (!transactions) return null;
	return (
		<table className="table-fixed m-auto">
			<tbody>
				{filteredTransactions.map((trans) => {
					return <MemoizedTransaction key={trans.id} {...trans} />;
				})}
			</tbody>
		</table>
	);
}
