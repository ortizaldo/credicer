///<reference path="../_referencias.d.ts"/>
namespace credicer.controllers {
    export class ProfileController {
        constructor(){

        }
        UpdateProfile(name: string, lastname: string, email: string, newPassword: string,
            confirmPassword:string, oldPassword: string, picture: string): void {
            if (name.length == 0 || lastname.length == 0 || email.length == 0) {
                app.dashboardView.ShowWarning("Alguno de los campos se encuentran vac&#237;os.", "Validaci&#243;n.");
                return;
            }
            if (newPassword.length != 0){
                if (newPassword != confirmPassword){
                    app.dashboardView.ShowWarning("Las Contrase&#241;as no coinciden.", "Validaci&#243;n.");
                    return;
                }
            }
            if (confirmPassword.length != 0){
                if (newPassword != confirmPassword){
                    app.dashboardView.ShowWarning("Las Contrase&#241;as no coinciden.", "Validaci&#243;n.");
                    return;
                }
            }
            if (oldPassword.length == 0) {
                app.dashboardView.ShowWarning("Contrase&#241;a anterior no puede estar vac&#237;a.", "Validaci&#243;n.");
                return;
            }
            fn.post(credicer.ws.profile.update(),{
                "name":name, "lastname":lastname, "email":email,
                "oldPassword":oldPassword, "newPassword":newPassword, "profilePicture":picture
            },app.profileController.UpdateProfileSuccess,app.OnError,app.token);
        }
        UpdateProfileSuccess(response): void {
            if (response.Code == 0) {
                app.dashboardView.ShowConfirmation("Perfil actualizado.");
                (<any>$("#mdlProfile")).modal("hide");
                app.GetProfile();
            } else {
                app.dashboardView.ShowWarning(response.Message);
            }
        }
    }
} 