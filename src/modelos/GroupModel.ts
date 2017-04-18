///<reference path = "../_referencias.d.ts"/>
/**
 * Modelo correspondiente a Grupos
 */
namespace credicer.models {
    export class GroupModel {
        constructor(){

        }
        private _id : string;
        private _groupName : string;
        private _name : string;

        public get Id() : string {
            return this._id;
        }
        public set Id(v : string) {
            this._id = v;
        }
        public get GroupName() : string {
            return this._groupName;
        }
        public set GroupName(v : string) {
            this._groupName = v;
        }
        public get Name() : string {
            return this._name;
        }
        public set Name(v : string) {
            this._name = v;
        }
    }
}