///<reference path = "../_referencias.d.ts"/>
/**
 * Clase controladora de clientes
 * Esta clase maneja todas las reglas de negocio del
 * modulo de clientes.
 */
namespace credicer.controllers {
    export class ClientController implements credicer.repository.ClientRepositoryCallback {
        getClientsInterval;
        maxDate: Date;
        madId: number = 0;
        viewOperations: credicer.views.IViewOperations;
        constructor(viewOperations: credicer.views.IViewOperations){
            let time_to_update = 1000 * 60 * 5;
            this.viewOperations = viewOperations;
            this.getClientsInterval = setInterval( function(){
                app.clientRepository.GetClients();
            }, time_to_update);
        }
        init(): void {
            app.clientRepository.GetClients();
        }
        GetClientsCallback(): void {
            log(app.userRepository.mapUsers);
        }
        UploadClientsCallback(): void {
            app.dashboardView.ShowConfirmation("Datos importados correctamente.");
        }
    }
}