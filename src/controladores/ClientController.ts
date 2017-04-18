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
                app.clientRepository.GetClients(this.maxDate, this.maxId);
            }, time_to_update);
        }
        init(): void {
            app.clientRepository.GetClients(app.userController.maxDate, app.userController.maxId);
        }
        GetClientsCallback(): void {
            log(app.userRepository.mapUsers);
        }
    }
}