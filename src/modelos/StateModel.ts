///<reference path = "../_referencias.d.ts"/>
namespace credicer.models {
    export class StateModel {
        constructor(){}
        
        private _id : number;
        private _capital : string;
        private _iso : string;
        private _municipios : Array<credicer.models.MunicipalityModel>;
        private __mapMunicipios : d3.Map<credicer.models.MunicipalityModel>;
        private _nombre : string;
        public get capital() : string {
            return this._capital;
        }
        public set capital(v : string) {
            this._capital = v;
        }
        public get id() : number {
            return this._id;
        }
        public set id(v : number) {
            this._id = v;
        }
        public get iso() : string {
            return this._iso;
        }
        public set iso(v : string) {
            this._iso = v;
        }
        public get municipios() : Array<credicer.models.MunicipalityModel> {
            return this._municipios;
        }
        public set municipios(v : Array<credicer.models.MunicipalityModel>) {
            this._municipios = v;
        }
        public get _mapMunicipios() : d3.Map<credicer.models.MunicipalityModel> {
            return this.__mapMunicipios;
        }
        public set _mapMunicipios(v : d3.Map<credicer.models.MunicipalityModel>) {
            this.__mapMunicipios = v;
        }
        public get nombre() : string {
            return this._nombre;
        }
        public set nombre(v : string) {
            this._nombre = v;
        }
        
    }
}