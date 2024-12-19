import apiClient from "../http-common.ts"


export default class GraphProxy {

    public static async getPlatformsWhereGamesReleaseFirst(): Promise<any> {
        try {
            const result = await apiClient.get("/aggregations/getPlatformsWhereGamesReleaseFirst");
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    }

    public static async getPlatformsPopularity(): Promise<any> {
        try {
            const result = await apiClient.get("/aggregations/getPlatformsPopularity");
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    }

    public static async getGamesPerPlatforms(): Promise<any> {
        try {
            const result = await apiClient.get("/aggregations/getGamesPerPlatforms");
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    }

    public static async getGenrePopularity(): Promise<any> {
        try {
            const result = await apiClient.get("/aggregations/getGenrePopularity");
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    }

    public static async getGenreYearlyPopularity(): Promise<any> {
        try {
            const result = await apiClient.get("/aggregations/getGenreYearlyPopularity");
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    }

    public static async getNumOfGameOfEachGenre(): Promise<any> {
        try {
            const result = await apiClient.get("/aggregations/getNumOfGameOfEachGenre");
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    }

    public static async getPlatPopularityBy2Months(startMonth:string, endMonth:string): Promise<any> {
        try {
            const result = await apiClient.get("/aggregations/getPlatPopularityBy2Months", {params: {startMonth, endMonth}});
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    }

    public static async getTop10GamesOfPlatform(platform_name: string): Promise<any> {
        try {
            const result = await apiClient.get("/aggregations/getTop10GamesOfPlatform", {params: {platform_name}});
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    }


    public static async getTop10GamesOfGenre(genre_name: string): Promise<any> {
        try {
          const result = await apiClient.get("/aggregations/getTop10GamesOfGenre", {
            params: { genre_name }
          });
          return result.data; // Ensure this is what your API returns (e.g., an object with `aggregation`)
        } catch (error) {
          console.error(error);
          return { success: false, message: error.message };  // Handle errors properly
        }
      }

    public static async getPlatformQualityByTime(platform_name: string): Promise<any> {
        try {
            const result = await apiClient.get("/aggregations/getPlatformQualityByTime", {params: {platform_name}});
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    }

    public static async getGenreQualityByTime(genre_name : string): Promise<any> {
        try {
            const result = await apiClient.get("/aggregations/getGenreQualityByTime", {params: {genre_name}});
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    }

    public static async getGOTY(): Promise<any> {
        try {
            const result = await apiClient.get("/aggregations/getGOTY");
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    }

    public static async getAllGenres(): Promise<any> {
        try {
            const result = await apiClient.get("/aggregations/getAllGenres");
            return result.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
    public static async getAllPlatforms(): Promise<any> {
        try {
            const result = await apiClient.get("/aggregations/getAllPlatforms");
            return result.data;
        } catch (error) {
            console.log(error.status);	
            //return error.response.data.message;
            return { success: false, status: error.status, message: error.message };
        }
    }
}
