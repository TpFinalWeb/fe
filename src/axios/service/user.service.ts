import { User } from "../models/user.model";
import UserProxy from "../proxy/proxy.ts";


export class UserService {
    public static async registerUser(user: User): Promise<string>{
        try{
            return await UserProxy.register(user);
        }
        catch(err){
            console.log(err)
            return "error in file user.service.ts function registerUser";
        }
    }
}