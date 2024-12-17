import React, { useState } from "react";
import Header from "../../components/header.tsx";
import Footer from "../../components/footer.tsx";
import words from "./words.ts";

export default function AdminBoard() {

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredWords, setFilteredWords] = useState<string[]>([]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        if(value === "all"){
            setFilteredWords(words);
            return;
        }
        if (value) {
            setFilteredWords(words.filter(word => word.toLowerCase().startsWith(value.toLowerCase())));
        } else {
            setFilteredWords([]);
        }
    };

    return (
        <div>
            <Header />
            <div className="text-center">
                <h1 className="text-4xl font-bold text-center mt-4">Admin Board</h1>
                <h2 className="text-2xl mt-3">search for the game to delete / modify</h2>
                <h3 className="text-l mt-1">write all to view all</h3>
                <div className="flex justify-center my-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-1/2 p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />

                    <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg w-1/2 mt-16 max-h-96 overflow-y-auto">

                        {filteredWords.length > 0 && (
                            <div>
                                <ul>
                                    {filteredWords.map((word, index) => (
                                        <li key={index} className="p-3 hover:bg-gray-200 cursor-pointer">
                                            {word}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                </div>


            </div>

            <div className="fixed bottom-0 w-full">
                <Footer />
            </div>


        </div>
    );
}