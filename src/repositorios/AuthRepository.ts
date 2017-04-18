///<reference path = "../_referencias.d.ts"/>
namespace credicer.repository {
    export class AuthRepository {
        constructor(){

        }
        LogOut(): void {
            fn.post(credicer.ws.auth.logout(), null, app.LogOutSuccess, app.OnError, app.token);
        }
    }
}