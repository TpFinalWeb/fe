import { setToken } from "../http-common.ts";
import { User } from "../models/user.model";
import GraphProxy from "../proxy/graphProxy.ts";

export class GraphService {
    public static async getPlatformsWhereGamesReleaseFirst(): Promise<any>{
        try{
            const result = await GraphProxy.getPlatformsWhereGamesReleaseFirst();
            console.log(result);
            return result;
        }
        catch(err){
            return {success: false, message: err};
        }
    }
}