export interface CreateUserDto {
    readonly id?: string;
    readonly email: string;
    readonly password?: string;
    readonly firstName: string;
    readonly lastName: string;
}