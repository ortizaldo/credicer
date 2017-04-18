///<reference path = "../_referencias.d.ts"/>
namespace credicer.repository {
    export class UserTypeRepository {
        mapUserTypes: d3.Map<credicer.models.UserTypeModel> = d3.map([], function(d:credicer.models.UserTypeModel) {
            return d.Name.toString();
        });;
        constructor(){

        }
        Get(): void{
            fn.post(credicer.ws.usertypes.get(), null, (response)=>{
                if (response == null) {
                    app.OnError("Response is null")
                } else {
                    if (response.Code == 0){
                        let userTypes: Array<credicer.models.UserTypeModel> = response.userTypes;
                        userTypes.forEach(d => {
                           app.userTypeRepository.mapUserTypes.set(d.Name, d) ;
                        });
                        app.GetUserTypesSuccess(response.Code)
                    } else {
                        app.OnError(response.Message)
                    }
                }
            }, app.OnError, app.token);
        }
    }
}