import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    async validate(username: string, password: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    constructor() {
        super({
            usernameField: 'username',
            passwordField: 'password'
        });
    }
}