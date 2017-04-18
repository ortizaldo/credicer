///<reference path = "../_referencias.d.ts"/>
/**
 * Modelo correspondiente a Usuario
 */
namespace credicer.models {
    export class UserModel {
        constructor(){    
        }
        
        private _id : number;
        private _username : string;
        private _name : string;
        private _lastName : string;
        private _lastLoginDate : string;
        private _address : string;
        private _email : string;
        private _phone : string;
        private _idMunicipality : string;
        private _estado : string;
        private _municipio : string;
        private _idState : string;
        private _userType : string;
        private _registrationDate : string;
        private _updateDate : string;
        private _photo : string;
        
        private _active : boolean;
        public get Id() : number {
            return this._id;
        }
        public set Id(v : number) {
            this._id = v;
        }
        public get Username() : string {
            return this._username;
        }
        public set Username(v : string) {
            this._username = v;
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
        public get Address() : string {
            return this._address;
        }
        public set Address(v : string) {
            this._address = v;
        }
        public get Email() : string {
            return this._email;
        }
        public set Email(v : string) {
            this._email = v;
        }
        public get Phone() : string {
            return this._phone;
        }
        public set Phone(v : string) {
            this._phone = v;
        }
        public get IdState() : string {
            return this._idState;
        }
        public set IdState(v : string) {
            this._idState = v;
        }
        public get IdMunicipality() : string {
            return this._idMunicipality;
        }
        public set IdMunicipality(v : string) {
            this._idMunicipality = v;
        }
        public get RegistrationDate() : string {
            return this._registrationDate;
        }
        public set RegistrationDate(v : string) {
            this._registrationDate = v;
        }
        public get UpdateDate() : string {
            return this._updateDate;
        }
        public set UpdateDate(v : string) {
            this._updateDate = v;
        }
        public get LastLoginDate() : string {
            return this._lastLoginDate;
        }
        public set LastLoginDate(v : string) {
            this._lastLoginDate = v;
        }
        public get Photo() : string {
            return this._photo;
        }
        public set Photo(v : string) {
            this._photo = v;
        }
        public get Active() : boolean {
            return this._active;
        }
        public set Active(v : boolean) {
            this._active = v;
        }
        public get UserType() : string {
            return this._userType;
        }
        public set UserType(v : string) {
            this._userType = v;
        }
        public get Estado() : string {
            return this._estado;
        }
        public set Estado(v : string) {
            this._estado = v;
        }
        public get Municipio() : string {
            return this._municipio;
        }
        public set Municipio(v : string) {
            this._municipio = v;
        }
    }
}