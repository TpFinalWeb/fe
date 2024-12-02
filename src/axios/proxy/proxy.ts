import http from "../http-common.ts"
import { User } from "../models/user.model.ts";


export default class UserProxy {
    // this is a test function to see if the connection is working
    public async getTestings() {
        try {
            return await http.get("/v2/products/").then(
                res => {
                    console.log(res.data);
                    return res.data;
                }
            )
        }catch(error){
            console.log(error);
        }
    }


    public static async register(user: User): Promise<any> {
        try{
            return await http.post("/register", user).then(
                res => {
                    console.log(res?.data);
                    return res?.data;
                }
            )
        }catch(error){
            console.log(error);
        }
    }
}
