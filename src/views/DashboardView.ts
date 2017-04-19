///<reference path="../_referencias.d.ts"/>
namespace credicer.views {
    export class DashboardView implements credicer.views.IViewOperations {
        moduleSelected: number = 1;
        moduleUser: number = 1;
        moduleClient: number = 2;
        el_module_title: d3.Selection<any>;
        el_option_selected: d3.Selection<any>;
        optionSelected: number;
        mdlUser;
        mdlConfirmation;
        idCurrentUser: number = 0;
        currentUser: credicer.models.UserModel;
        constructor() {
            this.el_module_title = d3.select("#lbl_title_module");
            this.mdlUser = $('#mdlUser');
            this.mdlConfirmation = $('#mdlConfirmation');
            this.mdlUser.on('hidden.bs.modal', function () {
                //Accion a ejecutar cuando se cierra el modal de usuario
                app.dashboardView.idCurrentUser = 0;
                app.dashboardView.ClearForm();
            });
            this.mdlUser.on('shown.bs.modal', function () {
                //Accion a ejecutar cuando se abre el modal de usuario
                if (app.dashboardView.idCurrentUser != 0) {
                    //llenamos el formulario
                } else {
                    //mostramos el formulario limpio
                }
            });
            this.mdlConfirmation.on('hidden.bs.modal', function () {
                app.dashboardView.idCurrentUser = 0;
            });
        }
        setModuleTitle(title: string): void {
            app.dashboardView.el_module_title.text(title);
        }
        onUserSelected(node): void {
            app.dashboardView.setModuleTitle(credicer.constantes.userModuleTitle);
            app.dashboardView.moduleSelected = app.dashboardView.moduleUser;
            app.dashboardView.SetButtonAddUser();
            app.dashboardView.OnUpdateTable();
        }
        onClientSelected(node): void {
            app.dashboardView.setModuleTitle(credicer.constantes.clientModuleTitle);
            app.dashboardView.moduleSelected = app.dashboardView.moduleClient;
            app.dashboardView.OnUpdateTable();
            var BtnNuevo:number = $("#btn_nuevo_usuario").length;
            if(BtnNuevo === 1) {  
                // statement(s) will execute if the boolean expression is true
                document.getElementById("btn_nuevo_usuario").remove();
            }
        }
        FillProfile(): void {
            d3.selectAll("#lbl_fullname_user").text(app.profile.Name + " " + app.profile.LastName);
            d3.selectAll("#img_user_profile").attr("src", app.profile.PhotoFormat + app.profile.Photo);
            d3.selectAll("#lbl_email_user").text(app.profile.Email);
        }
        OnShowProfileModal(): void {
            (<any>$("#mdlProfilePreview")).modal("hide");
            (<any>$("#mdlProfile")).modal("show");
            app.dashboardView.setProfileInfo();
        }
        setProfileInfo(): void {
            $("#txt_name_user").val(app.profile.Name);
            $("#txt_lastname_user").val(app.profile.LastName);
            $("#txt_email_user").val(app.profile.Email);
        }
        onProfileImageUpdated(): void {
            toBase64("btn_update_profile_picture", app.dashboardView.onProfilePictureInB64);
        }
        onProfilePictureInB64(imageBase64): void {
            let profileWindow: d3.Selection<any> = d3.select("#mdlProfile");
            profileWindow.select("#img_user_profile").attr("src", imageBase64);
        }
        UpdateProfile(): void {
            let name = $("#txt_name_user").val();
            let lastname = $("#txt_lastname_user").val();
            let email = $("#txt_email_user").val();
            let oldPassword = $("#txt_password_old_user").val();
            let newPassword = $("#txt_password_user").val();
            let confirmPassword = $("#txt_password_confirm_user").val();
            let picture = d3.select("#mdlProfile").select("#img_user_profile").attr("src");
            app.profileController.UpdateProfile(name, lastname, email, newPassword, confirmPassword, oldPassword, picture);
        }
        OnUpdateTable(): void {
            console.log('app.dashboardView.moduleSelected', app.dashboardView.moduleSelected);
            console.log('app.dashboardView.moduleUser', app.dashboardView.moduleUser);
            if (app.dashboardView.moduleSelected == app.dashboardView.moduleUser) {
                toDataTable("dvTableContainer", app.userRepository.mapUsers.values(), "Id", "Name,LastName,Address,Estado,Municipio,Phone",
                    "editar:app.dashboardView.OnEditUser,eliminar:app.dashboardView.OnDeleteUser");
            } else {
                toDataTable("dvTableContainer", app.clientRepository.mapClients.values(), "Id", "Name,Address,Group,CreditNumber,CreditDate,ClientStatus,CurrentDebit",
                    "");
                console.log('entre a nada');
            }
            let node: any = d3.selectAll("#tblTableContainer_length").node();
            node.style.float = 'left';
            let parent: any = node.parentNode;
            parent.style.float = 'right';
            parent.className = 'col-sm-3';

            let node_filter: any = d3.selectAll("#tblTableContainer_filter").node();
            let parent_filter: any = node_filter.parentNode;
            parent_filter.className = 'col-sm-9';
            app.dashboardView.SetButtonAddUser();
        }
        SetButtonAddUser(): void {
            let node_filter: any = d3.selectAll("#tblTableContainer_filter").node();
            let parent_filter: any = node_filter.parentNode;
            if (document.getElementById("btn_nuevo_usuario") != null)
                return;
            if (app.dashboardView.moduleSelected == app.dashboardView.moduleUser) {
                let btn = document.createElement("button")
                btn.textContent = "Agregar nuevo usuario";
                btn.id = "btn_nuevo_usuario";
                btn.className = "btn btn-success btn_custom_success "
                btn.style.marginLeft = "git init2%";
                parent_filter.appendChild(btn);
                //data-toggle="modal" ="#mdlProfilePreview"
                d3.select(btn).attr("data-toggle", "modal");
                d3.select(btn).attr("data-target", "#mdlUser");
            }
        }
        FillUserTypesCombo(): void {
            $("#cmb_tipo_usuario").html(toCombo(app.userTypeRepository.mapUserTypes.values(), "Name", "Name"));
        }
        FillStatesCombo(): void {
            $("#cmb_estado").html(toCombo(app.locationRepository.mapLocations.values(), "id", "nombre"));
            d3.selectAll("#cmb_estado").on("change", function (d) {
                let sel: any = document.getElementById('cmb_estado');
                let val = sel.options[sel.selectedIndex].value;
                $("#cmb_municipio").html(toCombo(app.locationRepository.mapLocations.get(val).municipios, "id", "nombre"));
            });
        }
        OnSaveUser(): void {
            let name = $("#txt_name").val();
            let lastname = $("#txt_lastname").val();
            let email = $("#txt_email").val();
            let estado = $("#cmb_estado").val();
            let municipio = $("#cmb_municipio").val();
            let direccion = $("#txt_direccion").val();
            let telefono = $("#txt_telefono").val();
            let password = $("#txt_password").val();
            let tipo_usuario = $("#cmb_tipo_usuario").val();
            if (app.dashboardView.idCurrentUser == 0) {
                //editar
                app.userController.AddUser(email, name, lastname, email, estado,
                    municipio, direccion, telefono, password, tipo_usuario);
            } else {
                //agregar
                app.userController.EditUser(app.dashboardView.idCurrentUser, email, name, lastname, email, estado,
                    municipio, direccion, telefono, password, tipo_usuario);
            }
        }
        OnEditUser(idUser: number): void {
            let user = app.userController.GetUser(idUser);
            if (user != null) {
                $("#txt_name").val(user.Name);
                $("#txt_lastname").val(user.LastName);
                $("#txt_email").val(user.Email);
                $("#cmb_estado").val(user.IdState);
                $("#cmb_municipio").html(toCombo(app.locationRepository.mapLocations.get(user.IdState).municipios, "id", "nombre"));
                $("#cmb_municipio").val(user.IdMunicipality);
                $("#txt_direccion").val(user.Address);
                $("#txt_telefono").val(user.Phone);
                $("#txt_password").val();
                $("#cmb_tipo_usuario").html(toCombo(app.userTypeRepository.mapUserTypes.values(), "Name", "Name"));
                $("#cmb_tipo_usuario").val(user.UserType);
            }
            app.dashboardView.idCurrentUser = idUser;
            app.dashboardView.mdlUser.modal("show");
        }
        OnDeleteUser(idUser: number): void {
            app.dashboardView.idCurrentUser = idUser;
            let user = app.userRepository.mapUsers.get(idUser.toString());
            let msg = "Eliminar al usuario: " + user.Name + " " + user.LastName + " con Email: " + user.Email;
            d3.selectAll("#lbl_confirmation_msg").text(msg)
            app.dashboardView.mdlConfirmation.modal("show");
        }
        OnDeleteUserConfirmation(): void {
            app.userController.DeleteUser(app.dashboardView.idCurrentUser);
            app.dashboardView.mdlConfirmation.modal("hide");
        }
        OnDeleteUserCancelation(): void {
            app.dashboardView.idCurrentUser = 0;
            app.dashboardView.mdlConfirmation.modal("hide");
        }
        ShowError(message: string, titulo: string = null): void {
            if (titulo != null)
                toastr.error(message, titulo);
            else
                toastr.error(message, "Error.");
        }
        ShowConfirmation(message: string, titulo: string = null): void {
            if (titulo != null)
                toastr.success(message, titulo);
            else
                toastr.success(message, "Confirmacion.");
        }
        ShowWarning(message: string, titulo: string = null): void {
            if (titulo != null)
                toastr.warning(message, titulo);
            else
                toastr.warning(message, "Advertencia.");
        }
        ClearForm(): void {
            $(".input_text_form").val("");
            $(".input_select_form").val("0");
        }
    }
}