///<reference path="_referencias.d.ts"/>
namespace fn {
    /**
     * Function to execute a post petition
     * @param url web service url
     * @param params Json object
     * @param success Function to success callback
     * @param error  Function to error callback
     */
    export var post: Function = (url: string, params: any, onsuccess: Function, onerror: Function, token: string = null) => {
        log("URL: " + url);
        log("PARAMS: " + JSON.stringify(params));
        log("TOKEN: " + token);
        $.ajax({
            url: url,
            async: true,
            contentType: "application/json; charset=utf-8",
            type: "POST",
            dataType: "json",
            data: params != null ? JSON.stringify(params) : null,
            headers: { 'Authorization': token },
            // beforeSend: function (xhr) {
            //     /* Authorization header */
            //     xhr.setRequestHeader("Authorization", token);
            // },
            success: function (response) {
                onsuccess(response);
            },
            error: function (response) {
                onerror(response);
            }
        });
    }
}
namespace html {
    /**
     * Function to find element in the dom.
     * @param id Id to search
     */
    export function find(id): HTMLElement {
        return document.getElementById(id);
    }
    /**
     * 
     * @param id Id to create
     * @param type Element type (div, span, table, row, td, tr, etc...)
     */
    export function create(id: string, type): HTMLElement {
        let result = document.createElement(type);
        result.setAttribute("id", id);
        return result;
    }
    /**
     * Function to search an element, if doesn't exists create it
     * @param id .
     */
    export function exist(id, type): HTMLElement {
        let result = find(id);
        if (result == null)
            create(id, type);
        return result;
    }
}

function toBase64(id_input, callback: Function) {
    let p: any = document.getElementById(id_input);
    var fReader = new FileReader();
    fReader.readAsDataURL(p.files[0]);
    fReader.onloadend = function (event: any) {
        let canvas = document.createElement("canvas");
        let img = document.createElement("img");
        img.src = event.target.result;
        callback(event.target.result)
    }
}
function toImg(id_img, base64) {
    let image: any = document.getElementById(id_img);
    image.src = base64;
}
function toCapitalize(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
}
function getHeadersDateTable(headers: string, actions: string) {
    let _headers = "";
    let _columns = headers.split(",");
    _headers += "<THEAD>\n";
    _headers += "<TR>\n";
    _columns.forEach(header => {
        _headers += "<TD>";
        _headers += toCapitalize(header.replace("_", " ").replace("_", " ").replace("_", " "));
        _headers += "</TD>";
    });
    if (actions != null && actions != "null") {
        let _actions: Array<string> = actions.split(',');
        _actions.forEach(column => {
            _headers += "<TD>";
            _headers += "";
            _headers += "</TD>";
        });
    }
    _headers += "</TR> ";
    _headers += "</THEAD>\n <!-- HEADER -->\n";
    return _headers;
}
function getBodyDateTable(list: Array<any>, columnId: string, headers: string, actions: string) {
    let _body = "<TBODY>\n";
    let _headers: any = headers.split(",");
    list.forEach(item => {
        //item is the object in the array
        _body += "<TR>\n";
        let props: any = Object.keys(item);
        _headers.forEach(header => {
            if (props.find(function (p) { return p == header }) != undefined) {
                let val = item[header];
                let contador = 0;
                if (header.toLowerCase().indexOf("telefono") !== -1) {
                    let res = "";
                    if (val === Array) {
                        val.forEach(v => {
                            if (contador > 0) {
                                res += "/";
                            }
                            res += v.telefono;
                            if (contador == 2) {
                                res += "<br/>";
                            }

                            contador += 1;
                        });
                        val = res;
                    }
                }
                //console.log('val', val);
                switch (val)
                {
                    case "SOL" :
                        val = '<span class="label lbl-sol">'+val+'</span>';
                        break;
                    case "AVAL" :
                        val = '<span class="label lbl-a">'+val+'</span>';
                        break;
                    case "VG" :
                        val = '<span class="label lbl-vg">'+val+'</span>';
                        break;
                    case "JR" :
                        val = '<span class="label lbl-jr">'+val+'</span>';
                        break;
                    case "MP" :
                        val = '<span class="label lbl-mp">'+val+'</span>';
                        break;
                    default : val;
                }
                _body += "<TD>";
                _body += val;
                _body += "</TD>";
            }
        });
        if (actions != null && actions != "null") {
            let columnsActions: Array<string> = actions.split(',');
            columnsActions.forEach(column => {
                let action = column.split(':');
                let default_column: string = "";
                if (action[0].toLowerCase().indexOf("eliminar") != -1) {
                    default_column = "btn-delete";
                }
                if(action[1] != undefined && action[1] != "undefined"){
                    _body += "<TD>";
                    _body += "<input type='button'class='btn " + default_column + "' value='" + toCapitalize(action[0]) + "'  onclick='" + action[1] + "(" + item[columnId] + ")' /> ";
                    _body += "</TD>";
                }else{
                    _body += "<TD>";
                    _body += "&nbsp;";
                    _body += "</TD>";
                }
            });
        }
        _body += "</TR>\n";
    });

    _body += "</TBODY>\n";
    return _body
}
function toDataTable(divContainer: string, list: Array<any>, columnId: string, columns: string, actions: string) {
    let sb: string = "";
    sb += "<TABLE id='" + divContainer.replace("dv", "tbl") + "' class='table table - bordered table - striped'>";
    sb += getHeadersDateTable(columns, actions);
    //console.log('getHeadersDateTable', sb);
    sb += getBodyDateTable(list, columnId, columns, actions);
    //console.log('getBodyDateTable', sb);
    sb += "</TABLE>\n";
    addTable(divContainer, sb);
    return sb;
}
function toDataTableClnts(divContainer: string, list: Array<any>, columnId: string, columns: string, actions: string) {
    let _headers: any = columns.split(",");
    let sb: string = "";
    sb += "<TABLE id='" + divContainer.replace("dv", "tbl") + "' class='table table - bordered table - striped'>";
    sb += getHeadersDateTable(columns, actions);
    sb += "<TBODY id='tbodyClntes'></TBODY>\n";
    sb += "</TABLE>\n";
    let arr = [];
    for (let entry of list) {
        switch (entry.Type)
        {
            case "SOL" :
                entry.Type = '<span class="label lbl-sol">'+entry.Type+'</span>';
                break;
            case "AVAL" :
                entry.Type = '<span class="label lbl-a">'+entry.Type+'</span>';
                break;
        }

        switch(entry.ClientStatus)
        {
            case "VG" :
                entry.ClientStatus = '<span class="label lbl-vg">'+entry.ClientStatus+'</span>';
                break;
            case "JR" :
                entry.ClientStatus = '<span class="label lbl-jr">'+entry.ClientStatus+'</span>';
                break;
            case "MP" :
                entry.ClientStatus = '<span class="label lbl-mp">'+entry.ClientStatus+'</span>';
                break;
            case "NP" :
                entry.ClientStatus = '<span class="label lbl-np">'+entry.ClientStatus+'</span>';
                break;
            default : entry.ClientStatus;
        }
        arr.push([
            entry.Curp,
            entry.Name,
            entry.Address,
            entry.Estado,
            entry.Municipio,
            entry.Group,
            entry.Amount,
            entry.LastUpdateDate,
            entry.LastCreditDate,
            entry.Type,
            entry.ClientStatus,
            ""
        ]);
    }
    addTableClnte(divContainer, arr, sb);
    return sb;
}
function addTableClnte(divContainer: string, list: Array<any>, html)
{
    $("#" + divContainer).html(html);
    (<any>$('#' + divContainer.replace("dv", "tbl"))).DataTable({
        "data":list,
        "searching": true,
        "ordering": true,
        "sScrollY": '100%',
        "deferRender": true,
        "autoWidth": true,
        // "pagingType": "full_numbers",
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        "oLanguage": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
}
function addTable(divContainer: string, html) {
    $("#" + divContainer).html(html);
    (<any>$('#' + divContainer.replace("dv", "tbl"))).DataTable({
        "searching": true,
        "ordering": true,
        "sScrollY": '100%',
        "deferRender": true,
        //"autoWidth": true,
        // "pagingType": "full_numbers",
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        "oLanguage": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
}
function utcDateToString(date: Date): string {
    if (date == null)
        return null;
    date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    let day = date.getDate();
    let monthIndex = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    //2017-03-13 22:53:58
    //El mes se le aumenta un 1 por que el indice del mes empieza en 0 por default
    return year + "-" + (monthIndex.valueOf() < 10 ? "0" + monthIndex : monthIndex) + "-" + (day.valueOf() < 10 ? "0" + day : day) + " " + hour + ":" + minutes + ":" + seconds;
}
function dateToString(date: Date): string {
    if (date == null)
        return null;
    let day = date.getDate();
    let monthIndex = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    //2017-03-13 22:53:58
    //El mes se le aumenta un 1 por que el indice del mes empieza en 0 por default
    return year + "-" + (monthIndex.valueOf() < 10 ? "0" + monthIndex : monthIndex) + "-" + (day.valueOf() < 10 ? "0" + day : day) + " " + hour + ":" + minutes + ":" + seconds;
}
function log(obj: any) {
    console.log(obj);
}
function toCombo(list, columnValue: string, columnText: string) {
    let sb: string = "<option value='0' selected>Seleccionar</option>";
    list.forEach(item => {
        sb += "<option value='" + item[columnValue] + "'>" + item[columnText] + "</option>"
    });
    return sb;
}