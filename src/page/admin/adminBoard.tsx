import React, { useEffect, useState } from "react";
import Header from "../../components/header.tsx";
import Footer from "../../components/footer.tsx";
import noImage from "../../assets/noImageFound.png";
import GameProxy from "../../axios/proxy/gameProxy.ts";
import { GameI } from "../../axios/models/game.model.ts";
import PacmanLoader from "react-spinners/PacmanLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function AdminBoard() {

    const [searchGame, setSearchGame] = useState("");
    const [lastSearchGame, setlastSearchGame] = useState("");
    const [gamesSearched, setgamesSearched] = useState<GameI[] | undefined>();
    const [enterPressed, setEnterPressed] = useState(false);
    const [currentGame, setCurrentGame] = useState<GameI | undefined>();

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
        try {
            const games = await getGamesCall(startString);
            setgamesSearched(games);
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchGame(value);
        console.log(searchGame)
    }

    const handleEnterPress = (event) => {
        if (event.key === 'Enter' && !enterPressed) {
            setEnterPressed(true);
        }
    }
    const handleEnterRelease = async (event) => {
        if (event.key === 'Enter') {
            setEnterPressed(false);
            await searchForGames(searchGame);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleEnterPress);
        window.addEventListener('keyup', handleEnterRelease);
        return () => { window.removeEventListener('keydown', handleEnterPress); window.removeEventListener('keyup', handleEnterRelease); };
    }, [searchGame])

    const openDialog = (game) => {
        setCurrentGame(game);
        console.log("clicked on game: " + currentGame?.name)
        const dialog = document.getElementById("dialog") as HTMLDialogElement;
        dialog.showModal();
    }

    const closeDialog = () => {
        setCurrentGame(undefined);
        const dialog = document.getElementById("dialog") as HTMLDialogElement;
        dialog.close();
    }
    return (
        <div>
            <Header />
            <div className="text-center">
                <h1 className="text-4xl font-bold text-center mt-4">Admin Board</h1>
                <h2 className="text-2xl mt-3">search for the game to delete / modify</h2>
                <h3 className="text-l mt-1">write all to view all</h3>
                <div className="flex justify-center mt-4">
                    {/* <PacmanLoader
                  color="#099191"
                  size={40}
                  speedMultiplier={1}
                /> */}
                </div>
                <div className="flex justify-center my-4">


                    <div className="w-1/2 flex flex-row items-center justify-center">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            value={searchGame}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div>

                    </div>

                    <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg w-1/2 mt-16 max-h-[29rem] overflow-y-auto">
                        <ul>
                            {gamesSearched && gamesSearched.length > 0 && (
                                gamesSearched.map((game, index) => (
                                    <li key={index} className="p-3 hover:bg-gray-200 cursor-pointer flex flex-row items-center"
                                        onClick={() => openDialog(game)}>
                                        <img src={game.sample_cover?.image || noImage} className="w-60 h-40 mt-2 rounded-2xl max-h-60 mr-auto ml-5" />

                                        <h1 className="text-2xl font-mono text-decoration-line: underline w-2/3">{game.name}</h1>
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

            <dialog id="dialog" className="modal rounded-2xl h-2/3 w-1/2 ">
                <div className="modal-box h-full pt-4">
                    <div className="flex justify-center">
                        <h1 className="font-mono text-3xl font-bold text-decoration-line: underline text-center w-fit ">{currentGame?.name}</h1>
                    </div>

                    <div>
                        <img src={currentGame?.sample_cover?.image || noImage} className="w-100 h-80 mt-2 rounded-2xl max-h-60 mx-auto" />
                    </div>

                    <div className="flex flex-row mt-8">
                        <p className="mx-3 font-bold italic text-decoration-line: underline">Description: </p>
                        <div className="w-2/3 text-justify" dangerouslySetInnerHTML={{ __html: currentGame?.detailed_description || "" }} />
                    </div>

                    <div className="flex flex-row mt-8">
                        <p className="mx-3 font-bold italic text-decoration-line: underline"> Availible on: </p>
                        <div>
                            {
                                currentGame?.platforms.map((platform, index) => {
                                    return (
                                        <div key={index} className="flex flex-row mt-2">
                                            <p className="w-2/3">{platform.platform_name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="">
                        <button className="bg-blue-500 h-10 w-20 rounded-lg ml-5 hover:bg-red-500 cursor-pointer" onClick={() => { closeDialog() }}>close</button>
                    </div>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </div>
            </dialog>

        </div>
    );
}