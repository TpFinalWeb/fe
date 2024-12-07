import apiClient from "../http-common.ts"
import { User } from "../models/user.model.ts";


export default class UserProxy {
    // this is a test function to see if the connection is working
    public async getTestings() {
        try {
            return await apiClient.get("/v2/products/").then(
                res => {
                    return res.data;
                }
            )
        }catch(error){
            console.log(error);
        }
    }


    public static async register(user: User): Promise<any> {
        try{
            return await apiClient.post("/register", user).then(
                res => {
                    return res?.data;
                }
            )
        }catch(error){
            console.log(error as string);
        }
    }

    public static async login(email: string, password: string): Promise<any> {
        try{
            const result = await apiClient.post("/login", {email, password});
            return result.data;
        }catch(error){
            return error.response.data.message;
        }
    }


    public static async testies(): Promise<any> {
        try{
            const result = await apiClient.post("/testies", {
                email: "testies pro max",
                test: "testies pro max again"
            });
            console.log(result.data);
        }catch(error){
            console.log(error.response.data.message);
            return error.response.data.message;
        }
    }
}
