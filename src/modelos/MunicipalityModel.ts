///<reference path = "../_referencias.d.ts"/>
namespace credicer.models {
    export class MunicipalityModel {
        constructor(){}
        private _id : string;
        private _nombre : string;
        public get id() : string {
            return this._id;
        }
        public set id(v : string) {
            this._id = v;
        }
        public get nombre() : string {
            return this._nombre;
        }
        public set nombre(v : string) {
            this._nombre = v;
        }
        
    }
}