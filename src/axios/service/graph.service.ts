
import GraphProxy from "../proxy/graphProxy.ts";

export class GraphService {
    
    public static async getPlatformsWhereGamesReleaseFirst(): Promise<any>{
        try{
            const result = await GraphProxy.getPlatformsWhereGamesReleaseFirst();
            return result;
        }
        catch(err){
            return {success: false, message: err};
        }
    }
    public static async getPlatformPopularity(): Promise<any>{
        try{
            const result = await GraphProxy.getPlatformsPopularity();
            return result;
        }
        catch(err){
            return {success: false, message: err};
        }
    }
    public static async getGamesPerPlatforms(): Promise<any>{
        try{
            const result = await GraphProxy.getGamesPerPlatforms();
            console.log(result.aggregation);
            return result;
        }
        catch(err){
            return {success: false, message: err};
        }
    }

    public static async getAllPlatforms(): Promise<any>{
        try{
            const result = await GraphProxy.getAllPlatforms();
            console.log(result.aggregation);
            return result;
        }
        catch(err){
            return {success: false, message: err};
        }
    }
    public static async getTop10GamesOfPlatform(platform_name:string): Promise<any>{
        try{
            const result = await GraphProxy.getTop10GamesOfPlatform(platform_name);
            console.log(result.aggregation);
            return result;
        }
        catch(err){
            return {success: false, message: err};
        }
    }
    public static async getTop10GamesOfGenre(genre_name: string): Promise<any> {
        try {
            const result = await GraphProxy.getTop10GamesOfGenre(genre_name);
            console.log(result.aggregation);
            return result;
        } catch (err) {
            return { success: false, message: err };
        }
    }
    public static async getPlatPopularityBy2Months(startMonth:string, endMonth:string): Promise<any>{
        try{
            const result = await GraphProxy.getPlatPopularityBy2Months(startMonth, endMonth);
            console.log(result.aggregation);
            return result;
        }
        catch(err){
            return {success: false, message: err};
        }
    }
    public static async getAllGenres(): Promise<any>{
        try{
            const result = await GraphProxy.getAllGenres();
            console.log(result.aggregation);
            return result;
        }
        catch(err){
            return {success: false, message: err};
        }
    }

    public static async getGenrePopularity(): Promise<any>{
        try{
            const result = await GraphProxy.getGenrePopularity();
            console.log(result.aggregation);
            return result;
        }
        catch(err){
            return {success: false, message: err};
        }
    }
    

}