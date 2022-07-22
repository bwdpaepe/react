import { memo, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { IoTrashOutline, IoPencil } from "react-icons/io5";
import { TransactionsContext } from "../contexts/TransactionsProvider";

const Transaction = memo(({ id, date, amount, user, place }) => {
  const { deleteTransaction } = useContext(TransactionsContext);

  const handleRemove = useCallback(() => {
    deleteTransaction(id);
  }, [deleteTransaction, id]);

  return (
    <tr data-cy="transaction">
      <td data-cy="transaction_date" className="border w-1/4 px-4 py-2">
        {new Date(date).toLocaleDateString("nl-BE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td data-cy="transaction_user" className="border w-1/4 px-4 py-2">
        {user.name}
      </td>
      <td data-cy="transaction_place" className="border w-1/4 px-4 py-2">
        {place.name}
      </td>
      <td data-cy="transaction_amount" className="border w-1/4 px-4 py-2">
        {amount} &euro;
      </td>
      <td className="border w-1/4 px-4 py-2">
        <div className="flex flex-row space-x-2">
          <Link
            className="button"
            data-cy="transaction_edit_btn"
            to={`/transactions/edit/${id}`}
          >
            <IoPencil />
          </Link>
          <button
            data-cy="transaction_remove_btn"
            onClick={handleRemove}
          >
            <IoTrashOutline />
          </button>
        </div>
      </td>
    </tr>
  );
});

export default Transaction;
