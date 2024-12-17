import apiClient from "../http-common.ts"



export default class GameProxy {
    
    public static async getGames(startingWith: string): Promise<any> {
        try{
            const allGames = await apiClient.get(`/games?containsName=${startingWith}`)
            return allGames.data;
        }catch(error){
            console.log(error)
        }
    }
}