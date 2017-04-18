///<reference path="_referencias.d.ts"/>
namespace credicer {
    export class App {
        userRepository: credicer.repository.UserRepository;
        clientRepository: credicer.repository.ClientRepository;
        groupRepository: credicer.repository.GroupRepository;
        placeRepository: credicer.repository.PlaceRepository;
        authRepository: credicer.repository.AuthRepository;
        userTypeRepository: credicer.repository.UserTypeRepository;
        locationRepository: credicer.repository.LocationRepository;
        userController: credicer.controllers.UserController;
        clientController: credicer.controllers.ClientController;
        dashboardView: credicer.views.DashboardView;
        token: string = null;
        profile: credicer.models.ProfileModel;
        profileController: credicer.controllers.ProfileController;
        constructor(){
            toastr.options.positionClass ="toast-bottom-right";
        }
        GetToken(): void {
            fn.post(credicer.ws.token.get(),null,app.GetTokenSuccess,app.OnError)
        }
        GetTokenSuccess(response): void {
            if (response.d != null) {
                app.token = response.d;
                app.dashboardView = new credicer.views.DashboardView();
                app.dashboardView.setModuleTitle(credicer.constantes.userModuleTitle);
                app.authRepository = new credicer.repository.AuthRepository();
                app.userTypeRepository = new credicer.repository.UserTypeRepository();
                app.profileController = new credicer.controllers.ProfileController();
                app.userController = new credicer.controllers.UserController(app.dashboardView);
                app.clientController = new credicer.controllers.ClientController(app.dashboardView);
                app.userRepository = new credicer.repository.UserRepository(app.userController);
                app.clientRepository = new credicer.repository.ClientRepository(app.clientController);
                app.groupRepository = new credicer.repository.GroupRepository();
                app.placeRepository = new credicer.repository.PlaceRepository();
                app.userTypeRepository = new credicer.repository.UserTypeRepository();
                app.locationRepository = new credicer.repository.LocationRepository();
                app.userTypeRepository.Get();
                app.locationRepository.Get();
                app.GetProfile();
            } else {
                window.location.href = "index.aspx"
            }
        }
        init(): void {
            if (app.userTypeRepository.mapUserTypes.size() > 0
                && app.locationRepository.mapLocations.size() > 0) {
                    app.userController.init();
                    app.clientController.init();
            }
        }
        GetProfile(): void {
            fn.post(credicer.ws.profile.get(),null,app.GetProfileSuccess,app.OnError);
        }
        GetProfileSuccess(response): void {
            app.profile = JSON.parse(response.d);
            app.dashboardView.FillProfile();
        }
        /**
         * Funcion a ejecutar para cuando ocurra cualquier error en el consumo del web service.
         */
        OnError(response): void {
            log("OnError");
            if(typeof response.status != "undefined") {
                if (response.status == 413) {
                    app.dashboardView.ShowError("Los datos exceden el limite.");
                }
            } else {
                app.dashboardView.ShowError(response);
            }
        }
        GetLogout(): void {
            app.authRepository.LogOut();
        }
        LogOutSuccess(response): void {
            app.token = null;
            window.location.href = "index.aspx"
        }
        GetUserTypesSuccess(response): void {
            app.dashboardView.FillUserTypesCombo();
            //app.init();
        }
        GetLocationsSuccess(response): void {
            app.dashboardView.FillStatesCombo();
            app.init();
        }
    }
}
var app : credicer.App = new credicer.App();
$( document ).ready(function() {
    app.GetToken();
});