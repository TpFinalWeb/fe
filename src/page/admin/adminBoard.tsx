import React, { useEffect, useState } from "react";
import Header from "../../components/header.tsx";
import Footer from "../../components/footer.tsx";
import noImage from "../../assets/noImageFound.png";
import GameProxy from "../../axios/proxy/gameProxy.ts";
import { GameI } from "../../axios/models/game.model.ts";

export default function AdminBoard() {

    const [searchGame, setSearchGame] = useState("");
    const [lastSearchGame, setlastSearchGame] = useState("");
    const [gamesSearched, setgamesSearched] = useState<GameI[] | undefined>();
    const [enterPressed, setEnterPressed] = useState(false);

    const getGamesCall = async (value) => {
        try {
            const allGames = await GameProxy.getGames(value)
            console.log(allGames)
            return allGames;
        } catch (error) {
            console.log(error)
        }
    }

    const searchForGames = async (startString: string) => {
        try{
            const games = await getGamesCall(startString);
            setgamesSearched(games);
        }catch(error){
            console.log(error)
        }
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchGame(value);
        console.log(searchGame)
    }

    

    const handleEnterPress = (event) => {
        if(event.key === 'Enter' && !enterPressed){
            setEnterPressed(true);
        }
    }
    const handleEnterRelease = async (event) => {
        if(event.key === 'Enter'){
            setEnterPressed(false);
            await searchForGames(searchGame);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleEnterPress);
        window.addEventListener('keyup', handleEnterRelease);
        return () => { window.removeEventListener('keydown', handleEnterPress); window.removeEventListener('keyup', handleEnterRelease); };
    }, [searchGame])

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
                        value={searchGame}
                        onChange={handleSearchChange}
                    />

                    <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg w-1/2 mt-16 max-h-96 overflow-y-auto">
                        <ul>
                            {gamesSearched && gamesSearched.length > 0 && ( 
                                gamesSearched.map((game, index) => (
                                    <li key={index} className="p-3 hover:bg-gray-200 cursor-pointer flex flex-col items-center">
                                        <h1>{game.name}</h1>
                                        <img src={game.sample_cover?.image || noImage} className="w-60 mt-2" />
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                </div>


            </div>

            <div className="fixed bottom-0 w-full">
                <Footer />
            </div>


        </div>
    );
}