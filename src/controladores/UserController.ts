///<reference path = "../_referencias.d.ts"/>
/**
 * Clase controladora de usuarios.
 * Esta clase es usada para manejar todas las reglas de negocio respecto al
 * modulo de usuarios
 */
namespace credicer.controllers {
    export class UserController implements credicer.repository.UserRepositoryCallback {
        getUsersInterval;
        maxDate: Date;
        maxId: number = 0;
        viewOperations: credicer.views.IViewOperations;
        constructor(viewOperations: credicer.views.IViewOperations){
            let time_to_update = 1000 * 60 * 5;
            this.viewOperations = viewOperations;
            this.getUsersInterval = setInterval( function(){
                app.userRepository.GetUsers(this.maxDate, this.maxId);
            }, time_to_update);
        }
        init(): void {
            app.userRepository.GetUsers(app.userController.maxDate, app.userController.maxId);
        }
        GetUser(idUser: number): credicer.models.UserModel {
            if (idUser == 0 || !app.userRepository.mapUsers.has(idUser.toString())) {
                app.dashboardView.ShowError("Usuario no existe");
                return null;
            }
            return app.userRepository.mapUsers.get(idUser.toString());
        }
        GetUserCallback(): void {
        }
        GetUsersCallback(): void {
            log(app.userRepository.mapUsers);
            app.userController.maxDate = d3.max(app.userRepository.mapUsers.values(),
                function(d: credicer.models.UserModel, i){
                    let dt = new Date(d.UpdateDate + " UTC");
                    return dt;
                });
                if (app.userRepository.mapUsers.size() > 0)
                    app.userController.maxId = app.userRepository.mapUsers.values()[0].Id;
            app.userController.viewOperations.OnUpdateTable();
        }
        AddUser(username:string, name: string, lastname: string, email: string, idState: number, idMunicipality: number,
                    address: string, phone: string, password: string, userType: string){
                if (name == null || lastname == null || email == null || idState == 0 || idMunicipality == 0
                    || address == null || phone == null || userType == null){
                        app.dashboardView.ShowWarning("Algunos campos se encuentran vacios");
                        return;
                }
            app.userRepository.AddUser(username,name,lastname,email,idState,idMunicipality,address,phone,password,userType);
        }
        EditUser(idUser:number, username:string, name: string, lastname: string, email: string, idState: number, idMunicipality: number,
                    address: string, phone: string, password: string, userType: string){
                if (idUser==0 || name == null || lastname == null || email == null || idState == 0 || idMunicipality == 0
                    || address == null || phone == null || userType == null){
                        app.dashboardView.ShowWarning("Algunos campos se encuentran vacios");
                        return;
                }
            app.userRepository.EditUser(idUser, username,name,lastname,email,idState,idMunicipality,address,phone,password,userType);
        }
        AddUserCallback(): void {
            app.userController.GetUsersCallback();
            app.dashboardView.ShowConfirmation("Usuario actualizado exitosamente.");
            app.dashboardView.idCurrentUser = 0;
            (<any>$('#mdlUser')).modal('hide');
        }
        EditUserCallback(): void {
            app.userController.GetUsersCallback();
            app.dashboardView.ShowConfirmation("Usuario actualizado exitosamente.");
            app.dashboardView.idCurrentUser = 0;
            (<any>$('#mdlUser')).modal('hide');
        }
        DeleteUser(idUser: number): void {
            if (idUser == 0) {
                app.dashboardView.ShowError("Ocurrio un problema con el usuario seleccionado.");
                return;
            }
            if (!app.userRepository.mapUsers.has(idUser.toString())) {
                app.dashboardView.ShowError("El usuario seleccionado no se encuentra dentro del listado.");
                return;
            }
            app.dashboardView.idCurrentUser = idUser;
            app.userRepository.DeleteUser(idUser);
        }
        DeleteUserCallback(): void {
            app.userRepository.mapUsers.remove(app.dashboardView.idCurrentUser.toString());
            app.userController.GetUsersCallback();
            app.dashboardView.ShowConfirmation("Usuario eliminado exitosamente.");
            app.dashboardView.idCurrentUser = 0;
            (<any>$("#mdlConfirmation")).modal('hide');
        }
    }
}