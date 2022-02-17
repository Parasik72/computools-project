import { Service } from "typedi";
import { v4 } from "uuid";
import { ProfilesService } from "../profiles/profiles.service";
import { TeamsService } from "../teams/teams.service";
import { User } from "../users/users.model";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./roles.model";

@Service()
export class RolesService {
    async generateRoleId(): Promise<string>{
        let role: Role | null, id: string;
        do {
            id = v4();
            role = await Role.findByPk(id);
        } while (role);
        return id;
    }

    async createRole(dto: CreateRoleDto): Promise<Role> {
        return await Role.create(dto);
    }

    async getRoleByValue(value: string): Promise<Role | null> {
        return await Role.findOne({where: {value}});
    }

    async getAllRoles(): Promise<Role[]> {
        return await Role.findAll({include: [User]});
    }

    async deleteRoleByValue(value: string): Promise<string | null> {
        const role = await Role.findOne({where: {value}});
        if(!role)
            return null;
        await role.destroy();
        return value;
    }

    async setRoleToUser(role: Role, user: User): Promise<User> {
        user.roleId = role.id;
        await user.save();
        return user;
    }
}