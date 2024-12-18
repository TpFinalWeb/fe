import { removeToken, setToken, getToken } from "../http-common.ts";
import { User } from "../models/user.model";
import UserProxy from "../proxy/userProxy.ts";


export class UserService {
    public static async registerUser(user: User): Promise<any> {
        try {
            const result = await UserProxy.register(user);

            return { code: result.code, message: result.message };
        }
        catch (err) {
            return { success: false, message: err };
        }
    }

    public static async loginUser(email: string, password: string): Promise<number> {
        try {
            const token = await UserProxy.login(email, password);
            if (token.success === true) {
                setToken(token['token']);
            }

            return token.code;
        } catch (error) {
            return error;
        }
    }

    public static async logoutUser(): Promise<boolean> {
        try {
            const isDeleted = await removeToken();
            return isDeleted;
        } catch (error) {
            return false;
        }
    }

    public static async getToken(): Promise<string> {
        try {
            const token = await getToken();
            return token;
        } catch (error) {
            return "error in file user.service.ts function getToken";
        }
    }
}