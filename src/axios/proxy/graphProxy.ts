import apiClient from "../http-common.ts"
import { User } from "../models/user.model.ts";


export default class GraphProxy {
    public static async getPlatformsWhereGamesReleaseFirst(): Promise<any> {
        try{
            const result = await apiClient.get("/getPlatformsWhereGamesReleaseFirst");
            return result.data;
        }catch(error){
            return error.response.data.message;
        }
    }
}
