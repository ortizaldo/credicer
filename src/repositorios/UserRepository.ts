///<reference path = "../_referencias.d.ts"/>
namespace credicer.repository {
    export class UserRepository {
        callbacks: Array<UserRepositoryCallback> = [];
        mapUsers: d3.Map<credicer.models.UserModel> = d3.map([], function(d: credicer.models.UserModel){
                        return d.Id.toString();});
        constructor(callback: UserRepositoryCallback){
            this.callbacks.push(callback);
        }
        SetCallback(callback: UserRepositoryCallback){
            app.userRepository.callbacks.push(callback);
        }
        GetUser(email: string) {

        }
        GetUsers(maxDate: Date, maxId: number): void {
            fn.post(credicer.ws.users.get(), {"maxUpdate":dateToString(maxDate), "maxId":maxId},
            function(response) {
                if (response.Code == 0) {
                    let users: Array<credicer.models.UserModel> = response.users;
                    users.forEach(d => {
                        if(d.Active) {
                            d.Municipio = app.locationRepository.mapLocations.get(d.IdState.toString())
                                    ._mapMunicipios.get(d.IdMunicipality.toString()).nombre;
                            d.Estado = app.locationRepository.mapLocations.get(d.IdState.toString()).nombre;
                            app.userRepository.mapUsers.set(d.Id.toString(),d);
                        } else {
                            app.userRepository.mapUsers.remove(d.Id.toString());
                        }
                    });
                    app.userRepository.callbacks.forEach(callback => {
                        callback.GetUsersCallback();
                    });
                } else {
                    app.OnError(response.Message)
                }
            }, app.OnError, app.token);
        }
        AddUser(username:string, name: string, lastname: string, email: string, idState: number, idMunicipality: number,
                    address: string, phone: string, password: string, userType: string): void {
            fn.post(credicer.ws.users.add(), {"username":username,"password":password,"name":name,"lastName":lastname,
                "idState":idState,"idMunicipality":idMunicipality,"address":address,"phone":phone,"email":email,
            "userType":userType},
            function(response){
                if (response.Code == 0) {
                    app.userRepository.callbacks.forEach(callback => {
                        callback.AddUserCallback();
                    });
                } else {
                    app.OnError(response.Message)
                }
            },app.OnError,app.token);
        }
        EditUser(idUser:number, username:string, name: string, lastname: string, email: string, idState: number, idMunicipality: number,
                    address: string, phone: string, password: string, userType: string): void {
            fn.post(credicer.ws.users.edit(), {"idUser":idUser, "username":username,"password":password,"name":name,"lastName":lastname,
                "idState":idState,"idMunicipality":idMunicipality,"address":address,"phone":phone,"email":email,
            "userType":userType},
            function(response){
                if (response.Code == 0) {
                    app.userRepository.callbacks.forEach(callback => {
                        callback.EditUserCallback();
                    });
                } else {
                    app.OnError(response.Message)
                }
            },app.OnError,app.token);
        }
        DeleteUser(idUser: number): void {
            fn.post(credicer.ws.users.remove(),{"idUser":idUser},
            function(response){
                if (response.Code == 0) {
                    app.userRepository.callbacks.forEach(d => {
                        d.DeleteUserCallback();
                    });
                } else {
                    app.OnError(response);
                }
            },
            function(response){
                log(response);
            },
            app.token);
        }
    }
    export interface UserRepositoryCallback {
        GetUserCallback(): void;
        GetUsersCallback(): void;
        AddUserCallback(): void;
        EditUserCallback(): void;
        DeleteUserCallback(): void;
    }
}