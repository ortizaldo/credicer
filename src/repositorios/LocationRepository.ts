///<reference path = "../_referencias.d.ts"/>
namespace credicer.repository {
    export class LocationRepository {
        mapLocations: d3.Map<credicer.models.StateModel>;
        constructor(){}
        Get(){
            fn.post(credicer.ws.locations.get(), null, (response)=>{
                if (response == null) {
                    app.OnError("Response is null")
                } else {
                    if (response.Code == 0){
                        log(response);
                        app.locationRepository.mapLocations = d3.map(response.locationModel.estados,
                            function(d:credicer.models.StateModel){
                                d._mapMunicipios= d3.map(response.locationModel.estados, function(d:credicer.models.MunicipalityModel) {
                                    return d.id.toString();
                                });
                                return d.id.toString();
                            });
                        app.GetLocationsSuccess(response);
                    } else {
                        app.OnError(response.Message)
                    }
                }
            }, app.OnError, app.token);
        }
    }
}