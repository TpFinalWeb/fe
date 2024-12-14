import { setToken } from "../http-common.ts";
import { User } from "../models/user.model";
import UserProxy from "../proxy/userProxy.ts";


export class UserService {
    public static async registerUser(user: User): Promise<{success: boolean, message: string}>{
        try{
            const result = await UserProxy.register(user);
            return {success: true, message: result};
            //return "test";
        }
        catch(err){
            return {success: false, message: err};
        }
    }

    public static async loginUser(email: string, password: string): Promise<string>{
        try{
            const token = await UserProxy.login(email, password);
            setToken(token);
            return token;
        }catch(error){
            //console.log(error);
            return "error in file user.service.ts function loginUser";
        }
    }
}