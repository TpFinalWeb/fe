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

    public static async loginUser(email: string, password: string): Promise<string>{
        try{
            const test =  await UserProxy.login(email, password);
            console.log(test)
            return test;
        }catch(error){
            //console.log(error);
            return "error in file user.service.ts function loginUser";
        }
    }
}