import apiClient from "../http-common.ts"
import { User } from "../models/user.model.ts";


export default class UserProxy {

    public static async register(user: User): Promise<any> {
        try{
            const response = await apiClient.post("/register", user)
            return {success: true, code: response.status, message: response.data.message};
        }catch(error){
            const err = error as any;
            return {success: false, code: err.status, message: err.response.data.error};
        }
    }

    public static async login(email: string, password: string): Promise<any> {
        try{
            const result = await apiClient.post("/login", {email, password});
            return {success: true, code: result.status, token: result.data.token};
        }catch(error){
            const err = error as any;
            return {success: false, code: err.status, message: err.data};
        }
    }
}
