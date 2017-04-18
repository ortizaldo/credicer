///<reference path = "../_referencias.d.ts"/>
/**
 * Modelo correspondiente a Plazas
 */
namespace credicer.models {
    export class PlaceModel {
        constructor(){

        }
        
        private _id : string;
        private _placeName : string;
        private _name : string;

        public get Id() : string {
            return this._id;
        }
        public set Id(v : string) {
            this._id = v;
        }
        public get PlaceName() : string {
            return this._placeName;
        }
        public set PlaceName(v : string) {
            this._placeName = v;
        }
        public get Name() : string {
            return this._name;
        }
        public set Name(v : string) {
            this._name = v;
        }
    }
}