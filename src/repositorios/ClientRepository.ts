///<reference path = "../_referencias.d.ts"/>
namespace credicer.repository {
    export class ClientRepository {
        mapClients: d3.Map<credicer.models.ClientModel> = d3.map([], function(d:credicer.models.ClientModel){
            return d.Id.toString();
        });
        callbacks: Array<ClientRepositoryCallback> = [];
        constructor(callback: ClientRepositoryCallback){
            this.callbacks.push(callback);
        }
        SetCallback(callback: ClientRepositoryCallback) {
            app.clientRepository.callbacks.push(callback);
        }
        GetClients(maxDate:Date, maxId: number): void {
            fn.post(credicer.ws.clients.get(), {"maxUpdate":dateToString(maxDate), "maxId":maxId},
            function(response) {
                if (response.Code == 0) {
                    let clients: Array<credicer.models.ClientModel> = response.clientes;
                    clients.forEach(d => {
                        if(d.Active) {
                            app.clientRepository.mapClients.set(d.Id.toString(),d);
                        } else {
                            app.userRepository.mapUsers.remove(d.Id.toString());
                        }
                    });
                } else {
                    app.OnError(response.Message)
                }
            }, app.OnError, app.token);
            app.clientRepository.callbacks.forEach(callback => {
                callback.GetClientsCallback();
            });
        }
    }
    export interface ClientRepositoryCallback {
        GetClientsCallback(): void;
    }
}