import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user:any) => void) {
    done(null as unknown as Error, user)
  }
  deserializeUser(payload: any, done: (err: Error, payload:any) => void) {
    done(null as unknown as Error, payload)
  }

}
