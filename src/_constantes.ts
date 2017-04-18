///<reference path = "_referencias.d.ts"/>
namespace credicer {
    export namespace constantes {
        export var userModuleTitle: string = "Usuarios";
        export var clientModuleTitle: string = "Clientes";
    }
    export namespace ws {
        export var base : Function = (): string =>{
            //return "http://apps.migesa.com.mx/CredicerWS/RestApi.svc/";
            //return "http://localhost/crediserws/RestApi.svc/";
            return "http://credicer.azurewebsites.net/RestApi.svc/";
        }

        export namespace token {
            let base = "index.aspx/";
            export var get: Function=(): string => {
                return base + "GetToken";
            }
            export var page: Function=(): string =>{
                return base+"GetPage";
            }
        }
        export namespace profile {
            let base = "index.aspx/";
            export var get: Function=(): string => {
                return base + "GetProfile";
            }
            export var update: Function=(): string => {
                return ws.base() + "users/profile";
            }
        }

        export namespace auth {
            let base = ws.base() + "auth/";
            export var login: Function =(): string =>{
                return base + "login"
            }
            export var logout: Function =(): string=>{
                return base + "logout"
            }
        }

        export namespace users {
            let base = ws.base() + "users/"
            export var get :Function = (): string =>{
                return base + "";
            }
            export var add :Function = (): string =>{
                return base + "add";
            }
            export var remove :Function = (): string =>{
                return base + "delete";
            }
            export var edit :Function = (): string =>{
                return base + "edit";
            }
        }

        export namespace clients {
            let base = ws.base() + "clients/list";
            export var get: Function = (): string=>{
                return base + "";
            }
        }
        
        export namespace groups {
            let base = ws.base() + "groups/";
            export var get: Function = (): string=>{
                return base + "";
            }
        }

        export namespace places {
            let base = ws.base() + "places/";
            export var get: Function = (): string=>{
                return base + "";
            }
        }
        
        export namespace usertypes {
            let base = ws.base() + "usertypes/";
            export var get: Function = (): string =>{
                return base+"";
            }
        }

        export namespace locations {
            let base = ws.base() + "locations/";
            export var get: Function = (): string =>{
                return base+"";
            }
        }
    }
}
function define(...params){

}