'use client'

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function Search() {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch("");
        router.push(`/${search}`);
    }

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={search}
                placeholder=" Search.."
                onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
                >Search</button>
        </form>
    )

}

export default Search