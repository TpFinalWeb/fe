import AggregationProxy from "../proxy/aggregationProxy.ts";

export class AggregationService {
    public static async getPlatformsWhereGamesReleaseFirst(){
        try{
            const data = await AggregationProxy.getPlatformsWhereGamesReleaseFirst();

            const modifiedData = data.map((item: any) => ({
                platform: item['platformName'],
                gameCount: item['gameCount']
            }));

            console.log("from service:")
            console.log(modifiedData[1]);
            return modifiedData;
        }catch(error){
            console.log(error);
        }
    }
}