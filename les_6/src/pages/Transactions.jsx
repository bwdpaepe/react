import { useState, useCallback } from "react";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const handleInputChange = useCallback((e) => setText(e.target.value), []);
  const handleSearch = useCallback(() => setSearch(text), [text]);

  return (
    <>
      <h1>
        Transactions
      </h1>
      <div className="flex my-4">
        <input
          type="search"
          value={text}
          onChange={handleInputChange}
          className="flex-1"
          placeholder="Search for a transaction"
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="flex justify-end my-2">
        <Link className="button flex flex-row items-center" to="/transactions/add">
          <IoAdd /> New transaction
        </Link>
      </div>
      <TransactionList search={search} />
    </>
  );
}
