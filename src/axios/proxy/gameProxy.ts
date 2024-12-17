import apiClient from "../http-common.ts"



export default class GameProxy {
    
    public static async getGames() {
        try{
            const allGames = await apiClient.get("/games/")
            return allGames.data;
        }catch(error){
            console.log(error)
        }
    }
}