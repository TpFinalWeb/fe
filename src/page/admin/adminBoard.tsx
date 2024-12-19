import React, { useEffect, useState } from "react";
import Header from "../../components/header.tsx";
import Footer from "../../components/footer.tsx";
import noImage from "../../assets/noImageFound.png";
import GameProxy from "../../axios/proxy/gameProxy.ts";
import { GameI } from "../../axios/models/game.model.ts";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function AdminBoard() {

    const [searchGame, setSearchGame] = useState("");
    //const [lastSearchGame, setlastSearchGame] = useState("");
    const [gamesSearched, setgamesSearched] = useState<GameI[] | undefined>();
    const [enterPressed, setEnterPressed] = useState(false);
    const [currentGame, setCurrentGame] = useState<GameI | undefined>();

    const eraseDialogId = "deleteVerificationDialog";

    const getGamesCall = async (value: string) => {
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

    const handleEnterPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !enterPressed) {
            setEnterPressed(true);
        }
    }
    const handleEnterRelease = async (event: KeyboardEvent) => {
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

    const openDialog = (game: GameI) => {
        setCurrentGame(game);
        const dialog = document.getElementById("dialog") as HTMLDialogElement;
        dialog.showModal();
    }

    const closeDialog = () => {
        setCurrentGame(undefined);
        const dialog = document.getElementById("dialog") as HTMLDialogElement;
        dialog.close();
    }

    const openEraseDialog = (dialogId: string) => {
        const dialog = document.getElementById(dialogId) as HTMLDialogElement;
        dialog.showModal();
    }

    const closeEraseDialog = (dialogId: string) => {
        const dialog = document.getElementById(dialogId) as HTMLDialogElement;
        dialog.close();
    }

    const deleteGame = async () => {
        try {
            const response = await GameProxy.deleteGame(currentGame?._id!);
            setgamesSearched(gamesSearched?.filter(game => game._id !== currentGame?._id));
            closeDialog();
            closeEraseDialog(eraseDialogId);
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="font-mono bg-teal-50 min-h-screen">
            <Header />
            <div className="text-center bg-teal-50">
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
                <div className="flex justify-center my-4 ">


                    <div className="w-1/2 flex flex-row items-center justify-center bg-teal-50">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 "
                            value={searchGame}
                            onChange={handleSearchChange}   
                        />
                    </div>
                    <div>

                    </div>

                    <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg w-1/2 mt-16 max-h-[29rem] overflow-y-auto bg-teal-50">
                        <ul>
                            {gamesSearched && gamesSearched.length > 0 && (
                                gamesSearched.map((game, index) => (
                                    <li key={index} className="p-3 hover:bg-gray-200 cursor-pointer flex flex-row items-center"
                                        onClick={() => openDialog(game)}>
                                        <img src={game.sample_cover?.image || noImage} alt="game_cover" className="w-60 h-40 mt-2 rounded-2xl max-h-60 mr-auto ml-5" />

                                        <h1 className="text-2xl text-decoration-line: underline w-2/3 ">{game.name}</h1>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>

            </div>

            <div className="fixed bottom-0 w-full bg-teal-50">
                <Footer />
            </div>

            <dialog id="dialog" className="modal rounded-2xl h-2/3 w-1/2 " onClick={(e) => { if (e.target === e.currentTarget) closeDialog(); }}>
                <div className="relative modal-box h-full pt-4">
                    <div className="fixed ml-5">
                        <button className="px-4 py-2 bg-teal-600 text-white cursor-pointer rounded hover:bg-teal-700" onClick={() => { closeDialog() }}>Exit</button>
                    </div>

                    <div className="flex flex-row justify-center">
                        <div className="flex justify-center">
                            <h1 className="text-3xl font-bold text-decoration-line: underline text-center w-fit ">{currentGame?.name}</h1>
                        </div>
                    </div>

                    <div>
                        <img src={currentGame?.sample_cover?.image || noImage} alt="game_cover" className="w-100 h-80 mt-2 rounded-2xl max-h-60 mx-auto" />
                    </div>

                    <div className="flex flex-row mt-5 justify-center">
                        {/* <p className="mx-3 font-bold italic text-decoration-line: underline">Description: </p> */}
                        <div className="w-2/3 text-center" dangerouslySetInnerHTML={{ __html: currentGame?.detailed_description || "" }} />
                    </div>

                    <div className="grid grid-cols-2 mt-8">
                        <div className="flex flex-row justify-center">
                            <p className="mr-3 ml-10 font-bold italic text-decoration-line: underline">Available on: </p>
                            <div className="flex flex-col ml-5 ">
                                {
                                    currentGame?.platforms.map((platform, index) => {
                                        return (
                                            <div key={index}>
                                                <p className="">{platform.platform_name}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="flex flex-row justify-center ">
                            <p className="mx-3 font-bold italic text-decoration-line: underline">Genres: </p>
                            <div className="flex flex-col ml-5">
                                {
                                    currentGame?.genres.map((genre, index) => {
                                        return (
                                            <div key={index}>
                                                <p className="">{genre.genre_name}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center mt-10 pb-10">
                        <button className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded hover:bg-red-800" onClick={() => { openEraseDialog(eraseDialogId) }}>Delete</button>
                        <button className="px-4 py-2 ml-20 cursor-pointer bg-yellow-600 text-white rounded hover:bg-yellow-400">Modify</button>
                    </div>

                </div>
            </dialog>

            <dialog id={eraseDialogId} className="modal rounded-2xl h-1/6 w-1/4 border-2 border-black" onClick={(e) => { if (e.target === e.currentTarget) closeEraseDialog(eraseDialogId); }}>
                <div>
                    <h1 className="text-center mt-4 text-lg font-extrabold">Are you sure you want to delete this game?</h1>
                    <div className="flex flex-row justify-center mt-10">
                        <button className="px-10 py-2 bg-red-600 cursor-pointer text-white rounded hover:bg-red-800" onClick={() => { deleteGame() }}>Yes</button>
                        <button className="px-10 py-2 ml-10 cursor-pointer bg-green-600 text-white rounded hover:bg-green-800" onClick={() => { closeEraseDialog(eraseDialogId) }}>No</button>
                    </div>
                </div>
            </dialog>

        </div>
    );
}