declare namespace toastr {
    export function success(message: string, title: string);
    export function warning(message: string, title: string);
    export function error(message: string, title: string);
    export function success(message: string, title: string);
    export var options;
}
declare module 'toastr' {
    export = toastr;
}