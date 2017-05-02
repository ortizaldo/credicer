///<reference path = "../_referencias.d.ts"/>
/**
 * Modelo correspondiente a Clientes
 */
namespace credicer.models {
    export class ClientModel {
        constructor(){
            
        }
        private _id : string;
        private _name : string;
        private _curp : string;
        private _address : string;
        private _lastCreditDate : string;
        private _lastGroupCredit : string;
        private _type : string;
        private _clientStatus : string;
        private _currentDebit : string;
        private _creditDate : string;
        private _amount : string;
        private _group : string;
        private _creditNumber : string;
        private _lastUpdateDate : string;
        private _estado : string;
        private _municipio : string;
        private _active : boolean;
        
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
        public get Curp() : string {
            return this._curp;
        }
        public set Curp(v : string) {
            this._curp = v;
        }
        public get Address() : string {
            return this._address;
        }
        public set Address(v : string) {
            this._address = v;
        }
        public get LastCreditDate() : string {
            return this._lastCreditDate;
        }
        public set LastCreditDate(v : string) {
            this._lastCreditDate = v;
        }
        public get LastGroupCredit() : string {
            return this._lastGroupCredit;
        }
        public set LastGroupCredit(v : string) {
            this._lastGroupCredit = v;
        }
        public get Type() : string {
            return this._type;
        }
        public set Type(v : string) {
            this._type = v;
        }
        public get ClientStatus() : string {
            return this._clientStatus;
        }
        public set ClientStatus(v : string) {
            this._clientStatus = v;
        }
        public get CurrentDebit() : string {
            return this._currentDebit;
        }
        public set CurrentDebit(v : string) {
            this._currentDebit = v;
        }
        public get CreditDate() : string {
            return this._creditDate;
        }
        public set CreditDate(v : string) {
            this._creditDate = v;
        }
        public get Amount() : string {
            return this._amount;
        }
        public set Amount(v : string) {
            this._amount = v;
        }
        public get Group() : string {
            return this._group;
        }
        public set Group(v : string) {
            this._group = v;
        }
        public get CreditNumber() : string {
            return this._creditNumber;
        }
        public set CreditNumber(v : string) {
            this._creditNumber = v;
        }
        public get LastUpdateDate() : string {
            return this._lastUpdateDate;
        }
        public set LastUpdateDate(v : string) {
            this._lastUpdateDate = v;
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

        public get Active() : boolean {
            return this._active;
        }
        public set Active(v : boolean) {
            this._active = v;
        }
    }
}