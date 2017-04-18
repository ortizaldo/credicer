///<reference path = "../_referencias.d.ts"/>
/**
 * Modelo correspondiente a Tipos de usuarios
 */
namespace credicer.models {
    export class UserTypeModel {
        constructor(){

        }
        
        private _idUserType : string;
        private _name : string;
        public get IdUserType() : string {
            return this._idUserType;
        }
        public set IdUserType(v : string) {
            this._idUserType = v;
        }
        public get Name() : string {
            return this._name;
        }
        public set Name(v : string) {
            this._name = v;
        }
        
    }
}