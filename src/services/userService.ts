import { mapUserDtoToUser, type User, type UserDto } from "../models/user";
import { verisafeLoggedInApi } from "./api";

class UserService {
    async getUserData(): Promise<User> {
        const response = await verisafeLoggedInApi.get<UserDto>("/accounts/me");

        return mapUserDtoToUser(response.data);
    }
}

export default new UserService();