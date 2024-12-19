import apiClient from "../http-common.ts";

export default class AggregationProxy {
    public static async getPlatformsWhereGamesReleaseFirst(){
        try{
            const response = await apiClient.get("/aggregations/getPlatformsWhereGamesReleaseFirst")
            return response.data.aggregation;
        }catch(error){
            console.log(error);
        }
    }
}