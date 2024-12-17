import apiClient from "../http-common.ts"


export default class GraphProxy {
    public static async getPlatformsWhereGamesReleaseFirst(): Promise<any> {
        try{
            const result = await apiClient.get("/aggregations/getPlatformsWhereGamesReleaseFirst");
            return result.data;
        }catch(error){
            return error.response.data.message;
        }
    }
}
