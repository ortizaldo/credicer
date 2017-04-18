///<reference path = "../_referencias.d.ts"/>
/**
 * Modelo correspondiente al perfil del usuario
 */
namespace credicer.models {
    export class ProfileModel {
        constructor(){
        }
        
        private _id : string;
        private _name : string;
        private _lastName : string;
        private _username : string;
        private _email : string;
        private _photo : string;
        private _photoFormat : string;

        public get Id() : string {
            return this._id;
        }
        public set Id(v : string) {
            this._id = v;
        }
        public get Name() : string {
            return this._name;
        }
        public set Name(v : string) {
            this._name = v;
        }
        public get LastName() : string {
            return this._lastName;
        }
        public set LastName(v : string) {
            this._lastName = v;
        }
        public get Username() : string {
            return this._username;
        }
        public set Username(v : string) {
            this._username = v;
        }
        public get Email() : string {
            return this._email;
        }
        public set Email(v : string) {
            this._email = v;
        }
        public get Photo() : string {
            return this._photo;
        }
        public set Photo(v : string) {
            this._photo = v;
        }
        public get PhotoFormat() : string {
            return this._photoFormat;
        }
        public set PhotoFormat(v : string) {
            this._photoFormat = v;
        }
    }
}