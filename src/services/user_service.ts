import { mapUserDtoToUser, type User, type UserDto } from "../models/user";
import { verisafeApi } from "./api";

class UserService {
    async getUserData(): Promise<User> {
        const response = await verisafeApi.get<UserDto>("/accounts/me");

        return mapUserDtoToUser(response.data);
    }
}

export default new UserService();