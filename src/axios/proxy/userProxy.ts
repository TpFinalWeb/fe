import apiClient from "../http-common.ts"
import { User } from "../models/user.model.ts";


export default class UserProxy {

    public static async register(user: User): Promise<any> {
        try{
            const response = await apiClient.post("/register", user)

            return response.data.message;
        }catch(error){
            return error.response.data.error;
        }
    }

    public static async login(email: string, password: string): Promise<any> {
        try{
            const result = await apiClient.post("/login", {email, password});
            return {success: true, code: result.status, token: result.data.token};
        }catch(error){
            return {success: false, code: error.status, message: error.data};
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
