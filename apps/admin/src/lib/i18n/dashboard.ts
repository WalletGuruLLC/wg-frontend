"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";

export const dashboardDict = {
  en: {
    "dashboard.home.title": "Welcome",
    "dashboard.layout.nav.home": "Home",
    "dashboard.layout.nav.wallet-management": "Wallet Management",
    "dashboard.layout.nav.service-providers": "Service Providers",
    "dashboard.layout.nav.users": "Users",
    "dashboard.layout.nav.roles": "Roles",
    "dashboard.layout.nav.settings": "Settings",
    "dashboard.layout.nav.reports": "Reports",
    "dashboard.layout.nav.wallet-users": "Wallet Users",
    "dashboard.layout.logout": "Logout",
    "dashboard.layout.profile-dialog.option.my-info": "My Info",
    "dashboard.layout.profile-dialog.option.change-password": "Change Password",
    "dashboard.layout.profile-dialog.option.logout": "Logout",
    "dashboard.layout.profile-dialog.my-info.title": "My Info",
    "dashboard.layout.profile-dialog.my-info.email.label": "Email",
    "dashboard.layout.profile-dialog.my-info.phone.label": "Phone No.",
    "dashboard.layout.profile-dialog.my-info.save": "Save",
    "dashboard.layout.profile-dialog.my-info.toast.success":
      "Phone has been changed succesfully",
    "dashboard.layout.profile-dialog.my-info.picture.label":
      "Drop or Upload your picture",
    "dashboard.layout.profile-dialog.my-info.picture.button": "Choose a file",
    "dashboard.roles.title": "Roles",
    "dashboard.roles.search.placeholder": "Search",
    "dashboard.roles.add-button": "Add Role",
    "dashboard.roles.add-dialog.title": "Add Role",
    "dashboard.roles.add-dialog.name.label": "Name",
    "dashboard.roles.add-dialog.name.placeholder": "Role Name",
    "dashboard.roles.add-dialog.name.error":
      "Role Name cannot contain numbers and must be less than 20 characters",
    "dashboard.roles.add-dialog.description.label": "Description",
    "dashboard.roles.add-dialog.description.placeholder": "",
    "dashboard.roles.add-dialog.description.error":
      "Role Description cannot contain numbers and must be less than 50 characters",
    "dashboard.roles.add-dialog.primary-button": "Create",
    "dashboard.roles.add-dialog.toast.success": "Role Added Successfully",
    "dashboard.roles.edit-dialog.title": "Edit Role",
    "dashboard.roles.edit-dialog.name.label": "Name",
    "dashboard.roles.edit-dialog.name.placeholder": "Role Name",
    "dashboard.roles.edit-dialog.name.error":
      "Role Name cannot contain numbers and must be less than 20 characters",
    "dashboard.roles.edit-dialog.description.label": "Description",
    "dashboard.roles.edit-dialog.description.placeholder": "",
    "dashboard.roles.edit-dialog.description.error":
      "Role Description cannot contain numbers and must be less than 50 characters",
    "dashboard.roles.edit-dialog.primary-button": "Save",
    "dashboard.roles.edit-dialog.toast.success":
      "The role has been edited successfully.",
    "dashboard.roles.inactive-dialog.title": "Deactivate Role",
    "dashboard.roles.inactive-dialog.description.first": "Deactiviting ",
    "dashboard.roles.inactive-dialog.description.second":
      " Role, will remove their access to all system resources. Proceed?",
    "dashboard.roles.inactive-dialog.primary-button": "Yes",
    "dashboard.roles.inactive-dialog.secondary-button": "No",
    "dashboard.roles.inactive-dialog.toast.success":
      "The role has been deactivated successfully.",
    "dashboard.roles.activate-dialog.title": "Activate Role",
    "dashboard.roles.activate-dialog.description.first": "By activating ",
    "dashboard.roles.activate-dialog.description.second":
      " Role, you are granting them system privileges. Proceed?",
    "dashboard.roles.activate-dialog.primary-button": "Yes",
    "dashboard.roles.activate-dialog.secondary-button": "No",
    "dashboard.roles.activate-dialog.toast.success":
      "The role has been activated successfully.",
    "dashboard.roles.table.header.role": "Role",
    "dashboard.roles.table.header.is-active": "Active",
    "dashboard.roles.table.header.actions": "Actions",
    "dashboard.roles.table.actions.edit": "Edit",
    "dashboard.roles.table.actions.access": "Access",
    "dashboard.roles.table.items-label": "Items per page:",
    "dashboard.roles.table.items-count-separator": " of ",
    "dashboard.roles.role.title": "Access ",
    "dashboard.roles.role.table.modules.header": "Modules",
    "dashboard.roles.role.table.view.header": "View",
    "dashboard.roles.role.table.add.header": "Add",
    "dashboard.roles.role.table.edit.header": "Edit",
    "dashboard.roles.role.table.inactive.header": "Deactivate",
    "dashboard.roles.role.table.all.header": "All",
    "dashboard.roles.role.table.action.header": "Action",
    "dashboard.roles.role.table.actions.save": "Save",
    "dashboard.roles.role.table.actions.details": "Details",
    "dashboard.roles.role.modules.users": "Users",
    "dashboard.roles.role.modules.wallets": "Wallets",
    "dashboard.roles.role.modules.serviceProviders": "Service/\nProviders",
    "dashboard.roles.role.modules.roles": "Roles",
    "dashboard.roles.role.modules.settings": "Settings",
    "dashboard.roles.role.modules.reports": "Reports",
    "dashboard.roles.role.modules.payments": "Payments",
    "dashboard.roles.role.modules.walletUsers": "Wallet Users",
    "dashboard.roles.role.modules.transactionsByUser": "Transactions by User",
    "dashboard.roles.role.modules.transactionsByProvider":
      "Transactions by Provider",
    "dashboard.roles.role.modules.revenue": "Revenue",
    "dashboard.roles.role.modules.clearPayments": "Clear Payments",
    "dashboard.roles.role.success-toast": "Role Access Levels Updated",
    "dashboard.roles.role.module.search.placeholder": "Search",
    "dashboard.roles.role.module.table.providers.header": "Providers",
    "dashboard.roles.role.module.table.view.header": "View",
    "dashboard.roles.role.module.table.add.header": "Add",
    "dashboard.roles.role.module.table.edit.header": "Edit",
    "dashboard.roles.role.module.table.inactive.header": "Deactivate",
    "dashboard.roles.role.module.table.all.header": "All",
    "dashboard.roles.role.module.table.action.header": "Action",
    "dashboard.roles.role.module.table.actions.save": "Save",
    "dashboard.roles.role.module.table.items-count-separator": " of ",
    "dashboard.users.title": "Users",
    "dashboard.users.search.placeholder": "Search",
    "dashboard.users.add-button": "Add User",
    "dashboard.users.add-dialog.title": "Add User",
    "dashboard.users.add-dialog.first-name.label": "First Name",
    "dashboard.users.add-dialog.first-name.placeholder": "Enter the name",
    "dashboard.users.add-dialog.first-name.error": "First Name is required",
    "dashboard.users.add-dialog.last-name.label": "Last Name",
    "dashboard.users.add-dialog.last-name.placeholder": "Enter the last name",
    "dashboard.users.add-dialog.last-name.error": "Last Name is required",
    "dashboard.users.add-dialog.email.label": "Email",
    "dashboard.users.add-dialog.email.placeholder": "Enter the email",
    "dashboard.users.add-dialog.email.error":
      "Email is required and must be a valid email",
    "dashboard.users.add-dialog.phone.label": "Phone Number",
    "dashboard.users.add-dialog.phone.code-placeholder": "+00",
    "dashboard.users.add-dialog.phone.phone-placeholder":
      "Enter your phone number",
    "dashboard.users.add-dialog.phone.error": "Phone Number is invalid",
    "dashboard.users.add-dialog.role.label": "Role",
    "dashboard.users.add-dialog.role.placeholder": "Select Role",
    "dashboard.users.add-dialog.role.error": "Role is required",
    "dashboard.users.add-dialog.primary-button": "Save",
    "dashboard.users.add-dialog.toast.success":
      "A confirmation email has been sent to the user with the assigned password.",
    "dashboard.users.edit-dialog.title": "Edit User",
    "dashboard.users.edit-dialog.first-name.label": "First Name",
    "dashboard.users.edit-dialog.first-name.placeholder": "Enter the name",
    "dashboard.users.edit-dialog.first-name.error": "First Name is required",
    "dashboard.users.edit-dialog.last-name.label": "Last Name",
    "dashboard.users.edit-dialog.last-name.placeholder": "Enter the last name",
    "dashboard.users.edit-dialog.last-name.error": "Last Name is required",
    "dashboard.users.edit-dialog.email.label": "Email",
    "dashboard.users.edit-dialog.email.placeholder": "Enter the email",
    "dashboard.users.edit-dialog.email.error":
      "Email is required and must be a valid email",
    "dashboard.users.edit-dialog.phone.label": "Phone Number",
    "dashboard.users.edit-dialog.phone.code-placeholder": "+00",
    "dashboard.users.edit-dialog.phone.phone-placeholder":
      "Enter your phone number",
    "dashboard.users.edit-dialog.phone.error": "Phone Number is invalid",
    "dashboard.users.edit-dialog.role.label": "Role",
    "dashboard.users.edit-dialog.role.placeholder": "Select Role",
    "dashboard.users.edit-dialog.role.error": "Role is required",
    "dashboard.users.edit-dialog.primary-button": "Save",
    "dashboard.users.edit-dialog.toast.success":
      "The User has been edited successfully.",
    "dashboard.users.inactive-dialog.title": "Deactivate user",
    "dashboard.users.inactive-dialog.description":
      "By inactivating this user, you will revoke the user's access to certain system privileges. Do you want to proceed?",
    "dashboard.users.inactive-dialog.primary-button": "Yes",
    "dashboard.users.inactive-dialog.secondary-button": "No",
    "dashboard.users.inactive-dialog.toast.success":
      "The user has been deactivated successfully.",
    "dashboard.users.activate-dialog.title": "Activate User",
    "dashboard.users.activate-dialog.description":
      "By activating this user, you are granting the user access to specific system privileges. Do you want to proceed?",
    "dashboard.users.activate-dialog.primary-button": "Yes",
    "dashboard.users.activate-dialog.secondary-button": "No",
    "dashboard.users.activate-dialog.toast.success":
      "The user has been activated successfully.",
    "dashboard.users.table.header.first-name": "First Name",
    "dashboard.users.table.header.last-name": "Last Name",
    "dashboard.users.table.header.email": "Mail",
    "dashboard.users.table.header.phone": "Phone",
    "dashboard.users.table.header.role": "Role",
    "dashboard.users.table.header.is-active": "Active",
    "dashboard.users.table.header.actions": "Actions",
    "dashboard.users.table.actions.edit": "Edit",
    "dashboard.users.table.items-label": "Items per page:",
    "dashboard.users.table.items-count-separator": " of ",
    "dashboard.wallet-management.title": "Registered Wallets",
    "dashboard.wallet-management.search.placeholder": "Search",
    "dashboard.wallet-management.add-button": "Add new wallet",
    "dashboard.wallet-management.add-dialog.title": "Create a new wallet",
    "dashboard.wallet-management.add-dialog.name.label": "Name",
    "dashboard.wallet-management.add-dialog.name.placeholder": "Wallet Name",
    "dashboard.wallet-management.add-dialog.name.error":
      "Wallet Name is required",
    "dashboard.wallet-management.add-dialog.type.label": "Wallet Type",
    "dashboard.wallet-management.add-dialog.type.placeholder": "Wallet Type",
    "dashboard.wallet-management.add-dialog.type.error":
      "Wallet Type is required",
    "dashboard.wallet-management.add-dialog.address.label": "Wallet Address",
    "dashboard.wallet-management.add-dialog.address.placeholder":
      "Wallet Address",
    "dashboard.wallet-management.add-dialog.address.error":
      "Wallet Address must be a valid URL",
    "dashboard.wallet-management.add-dialog.primary-button": "Create",
    "dashboard.wallet-management.add-dialog.toast.success":
      "The wallet was Successfully created",
    "dashboard.wallet-management.edit-dialog.title": "Edit Wallet",
    "dashboard.wallet-management.edit-dialog.name.label": "Name",
    "dashboard.wallet-management.edit-dialog.name.placeholder": "Wallet Name",
    "dashboard.wallet-management.edit-dialog.name.error":
      "Wallet Name is required",
    "dashboard.wallet-management.edit-dialog.type.label": "Wallet Type",
    "dashboard.wallet-management.edit-dialog.type.placeholder": "Wallet Type",
    "dashboard.wallet-management.edit-dialog.type.error":
      "Wallet Type is required",
    "dashboard.wallet-management.edit-dialog.address.label": "Wallet Address",
    "dashboard.wallet-management.edit-dialog.address.placeholder":
      "Wallet Address",
    "dashboard.wallet-management.edit-dialog.address.error":
      "Wallet Address must be a valid URL",
    "dashboard.wallet-management.edit-dialog.primary-button": "Save",
    "dashboard.wallet-management.edit-dialog.toast.success":
      "The wallet was Successfully edited",
    "dashboard.wallet-management.inactive-dialog.title": "Deactivate Wallet",
    "dashboard.wallet-management.inactive-dialog.description":
      "Are you sure you want to proceed?",
    "dashboard.wallet-management.inactive-dialog.primary-button": "Yes",
    "dashboard.wallet-management.inactive-dialog.secondary-button": "No",
    "dashboard.wallet-management.inactive-dialog.toast.success":
      "The wallet has been deactivated successfully.",
    "dashboard.wallet-management.activate-dialog.title": "Activate Wallet",
    "dashboard.wallet-management.activate-dialog.description":
      "Activating the wallet will restore transactions and access. Do you want to proceed?",
    "dashboard.wallet-management.activate-dialog.primary-button": "Yes",
    "dashboard.wallet-management.activate-dialog.secondary-button": "No",
    "dashboard.wallet-management.activate-dialog.toast.success":
      "The wallet has been activated successfully.",
    "dashboard.wallet-management.table.header.name": "Name",
    "dashboard.wallet-management.table.header.address": "Wallet Address",
    "dashboard.wallet-management.table.header.type": "Type",
    "dashboard.wallet-management.table.header.is-active": "Active",
    "dashboard.wallet-management.table.header.actions": "Actions",
    "dashboard.wallet-management.table.actions.edit": "Edit",
    "dashboard.wallet-management.table.items-label": "Items per page:",
    "dashboard.wallet-management.table.items-count-separator": " of ",
    "dashboard.settings.title": "Settings",
    "dashboard.settings.terms-and-conditions": "Terms and Conditions",
    "dashboard.settings.exchange-rates": "Exchange Rates",
    "dashboard.settings.privacy-policy": "Privacy Policy",
    "dashboard.settings.wallet-root": "Wallet Root",
    "dashboard.settings.terms-and-conditions.title": "Terms and Conditions",
    "dashboard.settings.terms-and-conditions.label":
      "Terms and Conditions link",
    "dashboard.settings.terms-and-conditions.placeholder":
      "www.walletguru.com/terms-and-conditions",
    "dashboard.settings.terms-and-conditions.error": "URL is invalid",
    "dashboard.settings.privacy-policy.title": "Privacy policy",
    "dashboard.settings.privacy-policy.label": "Privacy policy link",
    "dashboard.settings.privacy-policy.placeholder":
      "www.walletguru.com/privacy-policy",
    "dashboard.settings.privacy-policy.error": "URL is invalid",
    "dashboard.settings.privacy-policy.save": "Save",
    "dashboard.settings.wallet-root.title": "Wallet Root",
    "dashboard.settings.wallet-root.label": "Wallet Root link",
    "dashboard.settings.wallet-root.placeholder":
      "www.walletguru.com/wallet-root",
    "dashboard.settings.wallet-root.information.label":
      "Please note that it is necessary to modify the environment variable in the environment. The current wallets will not change their URL.",
    "dashboard.settings.wallet-root.error": "URL is invalid",
    "dashboard.settings.wallet-root.save": "Save",
    "dashboard.settings.terms-and-conditions.save": "Save",
    "dashboard.change-password.title": "Change Password",
    "dashboard.change-password.form.current-password.label": "Current Password",
    "dashboard.change-password.form.current-password.placeholder":
      "Enter your current password",
    "dashboard.change-password.form.current-password.error":
      "The current password you entered is incorrect. Please check and try again.",
    "dashboard.change-password.form.new-password.label": "New Password",
    "dashboard.change-password.form.new-password.placeholder":
      "Enter your new password",
    "dashboard.change-password.form.new-password.error":
      "The new password you entered doesn't meet our requirements. Please try a different one.",
    "dashboard.change-password.form.confirm-password.label": "Confirm Password",
    "dashboard.change-password.form.confirm-password.placeholder":
      "Confirm your new password",
    "dashboard.change-password.form.confirm-password.error":
      "The password you entered doesn't match",
    "dashboard.change-password.information-label":
      "Enter a strong password containing 8 to 12 characters, AT LEAST one number, one alpha character, one upper case character, one lower case access and one special character.",
    "dashboard.change-password.primary-button": "Save",
    "dashboard.change-password.toast.success":
      "Your password has been successfully Updated!",
    "dashboard.settings.term-conditions.dialog.toast.success":
      "The Terms and Conditions have been updated successfully.",
    "dashboard.settings.privacy-policy.dialog.toast.success":
      "The Privacy Policy has been updated successfully.",
    "dashboard.settings.wallet-root.dialog.toast.success":
      "The wallet address have been updated successfully.",
    "dashboard.reports.title": "Reports",
    "dashboard.reports.sections.transactions-by-user": "Transactions by User",
    "dashboard.reports.sections.transactions-by-provider":
      "Transactions by Provider",
    "dashboard.reports.sections.revenue": "Revenue",
    "dashboard.reports.sections.clear-payments": "Clear Payments",
    "dashboard.wallet-users.title": "Management wallet users",
    "dashboard.wallet-users.table.header.name": "Name",
    "dashboard.wallet-users.table.header.wallet": "Wallet",
    "dashboard.wallet-users.table.header.balance": "Balance",
    "dashboard.wallet-users.table.header.reserved": "Reserved",
    "dashboard.wallet-users.table.header.available": "Available",
    "dashboard.wallet-users.table.header.time": "Time Review",
    "dashboard.wallet-users.table.header.state": "Status",
    "dashboard.wallet-users.tooltip.reset": "Reset Password",
    "dashboard.wallet-users.tooltip.details": "User Detail",
    "dashboard.wallet-users.tooltip.transactions": "View transactions",
    "dashboard.wallet-users.tooltip.validated": "KYC Validated",
    "dashboard.wallet-users.tooltip.invalid": "KYC no validated",
    "dashboard.wallet-users.state": "Unknown status",
    "dashboard.wallet-users.state0": "Account created",
    "dashboard.wallet-users.state1": "Email verified",
    "dashboard.wallet-users.state2": "KYC verified",
    "dashboard.wallet-users.state3": "Profile completed",
    "dashboard.wallet-users.state4": "Wallet created",
    "dashboard.wallet-users.state5": "KYC No verified",
    "dashboard.wallet-users.locked-wallet": "Locked Wallet",
    "dashboard.wallet-users.active-wallet": "Active Wallet",
    "dashboard.wallet-users.no-wallet": "No wallet",
    "dashboard.reports.sections.transactions-by-user.header.type": "Type",
    "dashboard.reports.sections.transactions-by-user.header.description":
      "Description",
    "dashboard.reports.sections.transactions-by-user.header.start":
      "Start Date",
    "dashboard.reports.sections.transactions-by-user.header.finish": "End Date",
    "dashboard.reports.sections.transactions-by-user.header.state": "Status",
    "dashboard.reports.sections.transactions-by-user.header.actions": "Actions",
    "dashboard.reports.sections.transactions-by-user.header.actions.details":
      "Details",
    "dashboard.reports.sections.transactions-by-user.details.header":
      "Details Transaction Service",
    "dashboard.reports.sections.transactions-by-user.details.date": "Date",
    "dashboard.reports.sections.transactions-by-user.search-button": "Search",
    "dashboard.reports.sections.transactions-by-user.header.ammount": "Amount",
    "dashboard.reports.sections-transactions-by-user.search.wallet-address.placeholder":
      "Enter the wallet address",
    "dashboard.reports.sections-transactions-by-user.search.wallet-address.error":
      "Enter a valid wallet address",
    "dashboard.reports.sections-transactions-by-user.search.wallet-address.label":
      "Wallet Address",
    "dashboard.reports.sections-transactions-by-user.search.period.placeholder":
      "Select a range of time",
    "dashboard.reports.sections-transactions-by-user.search.period.error":
      "Enter a valid period",
    "dashboard.reports.sections-transactions-by-user.search.start-date.label":
      "Start Date",
    "dashboard.reports.sections-transactions-by-user.search.end-date.label":
      "End Date",
    "dashboard.reports.sections-transactions-by-user.search.type.placeholder":
      "Select a type",
    "dashboard.reports.sections-transactions-by-user.search.type.error":
      "Enter a valid type",
    "dashboard.reports.sections-transactions-by-user.search.type.label": "Type",
    "dashboard.reports.sections-transactions-by-user.search.state.placeholder":
      "Select a state",
    "dashboard.reports.sections-transactions-by-user.search.state.error":
      "Enter a valid state",
    "dashboard.reports.sections-transactions-by-user.search.state.label":
      "State",
    "dashboard.reports.sections-transactions-by-user.search.provider.placeholder":
      "Select a provider",
    "dashboard.reports.sections-transactions-by-user.search.provider.error":
      "Enter a valid provider",
    "dashboard.reports.sections-transactions-by-user.search.provider.label":
      "Provider",
    "dashboard.reports.sections-transactions-by-user.user.label": "User",
    "dashboard.reports.sections-transactions-by-user.period.label": "Period",
    "dashboard.reports.sections-transactions-by-user.period.no-start-selected":
      "No start date selected",
    "dashboard.reports.sections-transactions-by-user.period.no-end-selected":
      "No end date selected",
    "dashboard.wallet-users.select-state": "Select state",
    "dashboard.wallet-users.select-wallet": "Select wallet",
    "dashboard.wallet-users.search.placeholder": "Search by name",
    "dashboard.wallet-users.inactive-dialog.title": "Deactivate user",
    "dashboard.wallet-users.inactive-dialog.description":
      "By deactivating this user, you will revoke the user's access to certain system privileges.\n Do you want to proceed?",
    "dashboard.wallet-users.inactive-dialog.primary-button": "Yes",
    "dashboard.wallet-users.inactive-dialog.secondary-button": "No",
    "dashboard.wallet-users.inactive-dialog.toast.success":
      "The user has been deactivated successfully.",
    "dashboard.wallet-users.activate-dialog.title": "Activate User",
    "dashboard.wallet-users.activate-dialog.description":
      "By activating this user, you are granting the user access to specific system privileges.\n Do you want to proceed?",
    "dashboard.wallet-users.activate-dialog.primary-button": "Yes",
    "dashboard.wallet-users.activate-dialog.secondary-button": "No",
    "dashboard.wallet-users.activate-dialog.toast.success":
      "The user has been activated successfully.",
  },
  es: {
    "dashboard.home.title": "Bienvenido",
    "dashboard.layout.nav.home": "Inicio",
    "dashboard.layout.nav.wallet-management": "Billeteras",
    "dashboard.layout.nav.service-providers": "Proveedores de Servicio",
    "dashboard.layout.nav.users": "Usuarios",
    "dashboard.layout.nav.roles": "Roles",
    "dashboard.layout.nav.settings": "Configurar",
    "dashboard.layout.nav.reports": "Reportes",
    "dashboard.layout.nav.wallet-users": "Billeterahabientes",
    "dashboard.layout.logout": "Cerrar sesión",
    "dashboard.layout.profile-dialog.option.my-info": "Mi Información",
    "dashboard.layout.profile-dialog.option.change-password":
      "Cambiar Contraseña",
    "dashboard.layout.profile-dialog.option.logout": "Cerrar Sesión",
    "dashboard.layout.profile-dialog.my-info.title": "Mi Información",
    "dashboard.layout.profile-dialog.my-info.email.label": "Correo",
    "dashboard.layout.profile-dialog.my-info.phone.label": "Teléfono",
    "dashboard.layout.profile-dialog.my-info.save": "Guardar",
    "dashboard.layout.profile-dialog.my-info.toast.success":
      "El número de telefono ha sido cambiado correctamente",
    "dashboard.layout.profile-dialog.my-info.picture.label":
      "Arrastre o Suba su foto",
    "dashboard.layout.profile-dialog.my-info.picture.button":
      "Elija un archivo",
    "dashboard.roles.title": "Roles",
    "dashboard.roles.search.placeholder": "Buscar",
    "dashboard.roles.add-button": "Crear Rol",
    "dashboard.roles.add-dialog.title": "Crear Rol",
    "dashboard.roles.add-dialog.name.label": "Nombre",
    "dashboard.roles.add-dialog.name.placeholder": "Nombre del Rol",
    "dashboard.roles.add-dialog.name.error":
      "El nombre del Rol no puede contener números y debe tener menos de 20 caracteres",
    "dashboard.roles.add-dialog.description.label": "Descripción",
    "dashboard.roles.add-dialog.description.placeholder": "",
    "dashboard.roles.add-dialog.description.error":
      "El nombre del Rol no puede contener números y debe tener menos de 50 caracteres",
    "dashboard.roles.add-dialog.primary-button": "Crear",
    "dashboard.roles.add-dialog.toast.success": "Rol Creado Exitosamente",
    "dashboard.roles.edit-dialog.title": "Editar Rol",
    "dashboard.roles.edit-dialog.name.label": "Nombre",
    "dashboard.roles.edit-dialog.name.placeholder": "Nombre del Rol",
    "dashboard.roles.edit-dialog.name.error":
      "El nombre del Rol no puede contener números y debe tener menos de 20 caracteres",
    "dashboard.roles.edit-dialog.description.label": "Descripción",
    "dashboard.roles.edit-dialog.description.placeholder": "",
    "dashboard.roles.edit-dialog.description.error":
      "La descripción del Rol no puede contener números y debe tener menos de 50 caracteres",
    "dashboard.roles.edit-dialog.primary-button": "Guardar",
    "dashboard.roles.edit-dialog.toast.success":
      "El rol se ha editado exitosamente.",
    "dashboard.roles.inactive-dialog.title": "Desactivar Rol",
    "dashboard.roles.inactive-dialog.description.first": "Al desactivar Rol ",
    "dashboard.roles.inactive-dialog.description.second":
      " se le quitará el acceso a todos los recursos del sistema. ¿Desea continuar?",
    "dashboard.roles.inactive-dialog.primary-button": "Sí",
    "dashboard.roles.inactive-dialog.secondary-button": "No",
    "dashboard.roles.inactive-dialog.toast.success":
      "El rol se ha desactivado exitosamente.",
    "dashboard.roles.activate-dialog.title": "Activar Rol",
    "dashboard.roles.activate-dialog.description.first": "Al activar Rol ",
    "dashboard.roles.activate-dialog.description.second":
      " se le otorgarán privilegios en el sistema. ¿Desea continuar?",
    "dashboard.roles.activate-dialog.primary-button": "Sí",
    "dashboard.roles.activate-dialog.secondary-button": "No",
    "dashboard.roles.activate-dialog.toast.success":
      "El rol se ha activado exitosamente.",
    "dashboard.roles.table.header.role": "Rol",
    "dashboard.roles.table.header.is-active": "Activo",
    "dashboard.roles.table.header.actions": "Acciones",
    "dashboard.roles.table.actions.edit": "Editar",
    "dashboard.roles.table.actions.access": "Acceder",
    "dashboard.roles.table.items-label": "Elementos por página:",
    "dashboard.roles.table.items-count-separator": " de ",
    "dashboard.roles.role.title": "Acceso ",
    "dashboard.roles.role.table.modules.header": "Módulos",
    "dashboard.roles.role.table.view.header": "Ver",
    "dashboard.roles.role.table.add.header": "Agregar",
    "dashboard.roles.role.table.edit.header": "Editar",
    "dashboard.roles.role.table.inactive.header": "Desactivar",
    "dashboard.roles.role.table.all.header": "Todos",
    "dashboard.roles.role.table.action.header": "Acción",
    "dashboard.roles.role.table.actions.save": "Guardar",
    "dashboard.roles.role.table.actions.details": "Detalles",
    "dashboard.roles.role.modules.users": "Usuarios",
    "dashboard.roles.role.modules.wallets": "Billeteras",
    "dashboard.roles.role.modules.serviceProviders": "Servicios/\nProveedores",
    "dashboard.roles.role.modules.roles": "Roles",
    "dashboard.roles.role.modules.settings": "Configuraciones",
    "dashboard.roles.role.modules.reports": "Reportes",
    "dashboard.roles.role.modules.payments": "Pagos",
    "dashboard.roles.role.modules.walletUsers": "Billeterahabientes",
    "dashboard.roles.role.modules.transactionsByUser":
      "Transacciones por Usuario",
    "dashboard.roles.role.modules.transactionsByProvider":
      "Transacciones por Proveedor",
    "dashboard.roles.role.modules.revenue": "Ingresos",
    "dashboard.roles.role.modules.clearPayments": "Limpiar Pagos",
    "dashboard.roles.role.success-toast":
      "Niveles de Acceso del Rol Actualizados",
    "dashboard.roles.role.module.search.placeholder": "Buscar",
    "dashboard.roles.role.module.table.providers.header": "Proveedores",
    "dashboard.roles.role.module.table.view.header": "Ver",
    "dashboard.roles.role.module.table.add.header": "Agregar",
    "dashboard.roles.role.module.table.edit.header": "Editar",
    "dashboard.roles.role.module.table.inactive.header": "Desactivar",
    "dashboard.roles.role.module.table.all.header": "Todos",
    "dashboard.roles.role.module.table.action.header": "Acción",
    "dashboard.roles.role.module.table.actions.save": "Guardar",
    "dashboard.roles.role.module.table.items-count-separator": " de ",
    "dashboard.users.title": "Usuarios",
    "dashboard.users.search.placeholder": "Buscar",
    "dashboard.users.add-button": "Agregar Usuario",
    "dashboard.users.add-dialog.title": "Agregar Usuario",
    "dashboard.users.add-dialog.first-name.label": "Nombre",
    "dashboard.users.add-dialog.first-name.placeholder": "Ingrese el nombre",
    "dashboard.users.add-dialog.first-name.error": "Nombre es requerido",
    "dashboard.users.add-dialog.last-name.label": "Apellido",
    "dashboard.users.add-dialog.last-name.placeholder": "Ingrese el apellido",
    "dashboard.users.add-dialog.last-name.error": "Apellido es requerido",
    "dashboard.users.add-dialog.email.label": "Correo",
    "dashboard.users.add-dialog.email.placeholder": "Ingrese el correo",
    "dashboard.users.add-dialog.email.error":
      "Correo es requerido y debe ser un correo válido",
    "dashboard.users.add-dialog.phone.label": "Número de Teléfono",
    "dashboard.users.add-dialog.phone.code-placeholder": "+00",
    "dashboard.users.add-dialog.phone.phone-placeholder":
      "Ingrese su número de teléfono",
    "dashboard.users.add-dialog.phone.error": "Número de Teléfono es invalido",
    "dashboard.users.add-dialog.role.label": "Rol",
    "dashboard.users.add-dialog.role.placeholder": "Seleccionar Rol",
    "dashboard.users.add-dialog.role.error": "Rol es requerido",
    "dashboard.users.add-dialog.primary-button": "Guardar",
    "dashboard.users.add-dialog.toast.success":
      "Se ha enviado un correo de confirmación al usuario con la contraseña asignada.",
    "dashboard.users.edit-dialog.title": "Editar Usuario",
    "dashboard.users.edit-dialog.first-name.label": "Nombre",
    "dashboard.users.edit-dialog.first-name.placeholder": "Ingrese el nombre",
    "dashboard.users.edit-dialog.first-name.error": "Nombre es requerido",
    "dashboard.users.edit-dialog.last-name.label": "Apellido",
    "dashboard.users.edit-dialog.last-name.placeholder": "Ingrese el apellido",
    "dashboard.users.edit-dialog.last-name.error": "Apellido es requerido",
    "dashboard.users.edit-dialog.email.label": "Correo",
    "dashboard.users.edit-dialog.email.placeholder": "Ingrese el correo",
    "dashboard.users.edit-dialog.email.error":
      "Correo es requerido y debe ser un correo válido",
    "dashboard.users.edit-dialog.phone.label": "Número de Teléfono",
    "dashboard.users.edit-dialog.phone.code-placeholder": "+00",
    "dashboard.users.edit-dialog.phone.phone-placeholder":
      "Ingrese su número de teléfono",
    "dashboard.users.edit-dialog.phone.error": "Número de Teléfono es invalido",
    "dashboard.users.edit-dialog.role.label": "Rol",
    "dashboard.users.edit-dialog.role.placeholder": "Seleccionar Rol",
    "dashboard.users.edit-dialog.role.error": "Rol es requerido",
    "dashboard.users.edit-dialog.primary-button": "Guardar",
    "dashboard.users.edit-dialog.toast.success":
      "El Usuario se ha editado exitosamente.",
    "dashboard.users.inactive-dialog.title": "Desactivar usuario",
    "dashboard.users.inactive-dialog.description":
      "Al inactivar este usuario, revocará el acceso del usuario a ciertos privilegios del sistema. ¿Desea continuar?",
    "dashboard.users.inactive-dialog.primary-button": "Sí",
    "dashboard.users.inactive-dialog.secondary-button": "No",
    "dashboard.users.inactive-dialog.toast.success":
      "El usuario se ha desactivado exitosamente.",
    "dashboard.users.activate-dialog.title": "Activar Usuario",
    "dashboard.users.activate-dialog.description":
      "Al activar este usuario, le está otorgando al usuario acceso a privilegios específicos del sistema. ¿Desea continuar?",
    "dashboard.users.activate-dialog.primary-button": "Sí",
    "dashboard.users.activate-dialog.secondary-button": "No",
    "dashboard.users.activate-dialog.toast.success":
      "El usuario se ha activado exitosamente.",
    "dashboard.users.table.header.first-name": "Nombre",
    "dashboard.users.table.header.last-name": "Apellido",
    "dashboard.users.table.header.email": "Correo",
    "dashboard.users.table.header.phone": "Teléfono",
    "dashboard.users.table.header.role": "Rol",
    "dashboard.users.table.header.is-active": "Activo",
    "dashboard.users.table.header.actions": "Acciones",
    "dashboard.users.table.actions.edit": "Editar",
    "dashboard.users.table.items-label": "Elementos por página:",
    "dashboard.users.table.items-count-separator": " de ",
    "dashboard.wallet-management.title": "Billeteras Registradas",
    "dashboard.wallet-management.search.placeholder": "Buscar",
    "dashboard.wallet-management.add-button": "Agregar nueva billetera",
    "dashboard.wallet-management.add-dialog.title": "Crear una nueva billetera",
    "dashboard.wallet-management.add-dialog.name.label": "Nombre",
    "dashboard.wallet-management.add-dialog.name.placeholder":
      "Nombre de la Billetera",
    "dashboard.wallet-management.add-dialog.name.error":
      "Nombre de la Billetera es requerido",
    "dashboard.wallet-management.add-dialog.type.label": "Tipo de Billetera",
    "dashboard.wallet-management.add-dialog.type.placeholder":
      "Tipo de Billetera",
    "dashboard.wallet-management.add-dialog.type.error":
      "Tipo de Billetera es requerido",
    "dashboard.wallet-management.add-dialog.address.label":
      "Dirección de la Billetera",
    "dashboard.wallet-management.add-dialog.address.placeholder":
      "Dirección de la Billetera",
    "dashboard.wallet-management.add-dialog.address.error":
      "Dirección de la Billetera debe ser una URL válida",
    "dashboard.wallet-management.add-dialog.primary-button": "Crear",
    "dashboard.wallet-management.add-dialog.toast.success":
      "La billetera se ha creado exitosamente",
    "dashboard.wallet-management.edit-dialog.title": "Editar Billetera",
    "dashboard.wallet-management.edit-dialog.name.label": "Nombre",
    "dashboard.wallet-management.edit-dialog.name.placeholder":
      "Nombre de la Billetera",
    "dashboard.wallet-management.edit-dialog.name.error":
      "Nombre de la Billetera es requerido",
    "dashboard.wallet-management.edit-dialog.type.label": "Tipo de Billetera",
    "dashboard.wallet-management.edit-dialog.type.placeholder":
      "Tipo de Billetera",
    "dashboard.wallet-management.edit-dialog.type.error":
      "Tipo de Billetera es requerido",
    "dashboard.wallet-management.edit-dialog.address.label":
      "Dirección de la Billetera",
    "dashboard.wallet-management.edit-dialog.address.placeholder":
      "Dirección de la Billetera",
    "dashboard.wallet-management.edit-dialog.address.error":
      "Dirección de la Billetera debe ser una URL válida",
    "dashboard.wallet-management.edit-dialog.primary-button": "Guardar",
    "dashboard.wallet-management.edit-dialog.toast.success":
      "La billetera se ha editado exitosamente",
    "dashboard.wallet-management.inactive-dialog.title": "Desactivar Billetera",
    "dashboard.wallet-management.inactive-dialog.description":
      "Va a desactivar la billetera ¿Desea continuar?",
    "dashboard.wallet-management.inactive-dialog.primary-button": "Sí",
    "dashboard.wallet-management.inactive-dialog.secondary-button": "No",
    "dashboard.wallet-management.inactive-dialog.toast.success":
      "La billetera se ha desactivado exitosamente.",
    "dashboard.wallet-management.activate-dialog.title": "Activar Billetera",
    "dashboard.wallet-management.activate-dialog.description":
      "Va a activar la billetera. ¿Desea continuar?",
    "dashboard.wallet-management.activate-dialog.primary-button": "Sí",
    "dashboard.wallet-management.activate-dialog.secondary-button": "No",
    "dashboard.wallet-management.activate-dialog.toast.success":
      "La billetera se ha activado exitosamente.",
    "dashboard.wallet-management.table.header.name": "Nombre",
    "dashboard.wallet-management.table.header.address":
      "Dirección de la Billetera",
    "dashboard.wallet-management.table.header.type": "Tipo",
    "dashboard.wallet-management.table.header.is-active": "Activo",
    "dashboard.wallet-management.table.header.actions": "Acciones",
    "dashboard.wallet-management.table.actions.edit": "Editar",
    "dashboard.wallet-management.table.items-label": "Elementos por página:",
    "dashboard.wallet-management.table.items-count-separator": " de ",
    "dashboard.change-password.title": "Cambiar Contraseña",
    "dashboard.change-password.form.current-password.label":
      "Contraseña Actual",
    "dashboard.change-password.form.current-password.placeholder":
      "Ingrese su contraseña actual",
    "dashboard.change-password.form.current-password.error":
      "La contraseña actual que ingresaste es incorrecta. Por favor verifica e intenta de nuevo.",
    "dashboard.change-password.form.new-password.label": "Nueva Contraseña",
    "dashboard.change-password.form.new-password.placeholder":
      "Ingrese su nueva contraseña",
    "dashboard.change-password.form.new-password.error":
      "La nueva contraseña que ingresaste no cumple con nuestros requisitos. Por favor intenta con otra.",
    "dashboard.change-password.form.confirm-password.label":
      "Confirmar Contraseña",
    "dashboard.change-password.form.confirm-password.placeholder":
      "Confirma tu nueva contraseña",
    "dashboard.change-password.form.confirm-password.error":
      "La contraseña que ingresaste no coincide",
    "dashboard.change-password.information-label":
      "Ingresa una contraseña segura que contenga de 8 a 12 caracteres, AL MENOS un número, un carácter alfa, un carácter en mayúscula, un carácter en minúscula y un carácter especial.",
    "dashboard.change-password.primary-button": "Guardar",
    "dashboard.settings.title": "Configuraciones",
    "dashboard.settings.terms-and-conditions": "Términos y condiciones",
    "dashboard.settings.exchange-rates": "Tasas de cambio",
    "dashboard.settings.privacy-policy": "Política de privacidad",
    "dashboard.settings.wallet-root": "Billetera base",
    "dashboard.settings.terms-and-conditions.title": "Términos y condiciones",
    "dashboard.settings.terms-and-conditions.label":
      "Enlace a Términos y condiciones",
    "dashboard.settings.terms-and-conditions.placeholder":
      "www.walletguru.com/terms-and-conditions",
    "dashboard.settings.terms-and-conditions.error": "URL no valida",
    "dashboard.settings.terms-and-conditions.save": "Guardar",
    "dashboard.change-password.toast.success":
      "¡Tu contraseña ha sido actualizada Exitosamente!",
    "dashboard.settings.term-conditions.dialog.toast.success":
      "Los Términos y Condiciones han sido actualizados correctamente.",
    "dashboard.settings.privacy-policy.dialog.toast.success":
      "La Política de Privacidad ha sido actualizada exitosamente.",
    "dashboard.settings.wallet-root.dialog.toast.success":
      "La raíz de la billetera ha sido actualizada correctamente.",
    "dashboard.settings.privacy-policy.title": "Política de privacidad",
    "dashboard.settings.privacy-policy.label":
      "Link a la política de privacidad.",
    "dashboard.settings.privacy-policy.placeholder":
      "www.walletguru.com/privacy-policy",
    "dashboard.settings.privacy-policy.error": "La URL es inválida.",
    "dashboard.settings.privacy-policy.save": "Guardar",
    "dashboard.settings.wallet-root.title": "Billetera base",
    "dashboard.settings.wallet-root.label": "Link a la billetera base",
    "dashboard.settings.wallet-root.placeholder":
      "www.walletguru.com/wallet-root",
    "dashboard.settings.wallet-root.information.label":
      "Tener en cuenta que es necesario modificar la variable de entorno en el ambiente. Las billeteras actuales no cambiaran su URL.",
    "dashboard.settings.wallet-root.error": "URL is invalid",
    "dashboard.settings.wallet-root.save": "Save",
    "dashboard.reports.title": "Reportes",
    "dashboard.reports.sections.transactions-by-user":
      "Transacciones por Usuario",
    "dashboard.reports.sections.transactions-by-provider":
      "Transacciones por Proveedor",
    "dashboard.reports.sections.revenue": "Ganancia",
    "dashboard.reports.sections.clear-payments": "Limpiar pagos",
    "dashboard.wallet-users.title": "Administración Billetera habientes",
    "dashboard.wallet-users.table.header.name": "Nombre",
    "dashboard.wallet-users.table.header.wallet": "Billetera",
    "dashboard.wallet-users.table.header.balance": "Balance",
    "dashboard.wallet-users.table.header.reserved": "Reservado",
    "dashboard.wallet-users.table.header.available": "Disponible",
    "dashboard.wallet-users.table.header.time": "Tiempo Revisado",
    "dashboard.wallet-users.table.header.state": "Estado",
    "dashboard.wallet-users.tooltip.lock-wallet": "Bloquear billetera",
    "dashboard.wallet-users.tooltip.unlock-wallet": "Desbloquear billetera",
    "dashboard.wallet-users.tooltip.no-wallet": "No existe billetera",
    "dashboard.wallet-users.tooltip.reset": "Resetear Contraseña",
    "dashboard.wallet-users.tooltip.details": "Detalles usuario",
    "dashboard.wallet-users.tooltip.transactions": "Ver transacciones",
    "dashboard.wallet-users.tooltip.validated": "KYC Validado",
    "dashboard.wallet-users.tooltip.invalid": "KYC No validado",
    "dashboard.wallet-users.state": "Estado desconocido",
    "dashboard.wallet-users.state0": "Cuenta creada",
    "dashboard.wallet-users.state1": "Correo verificado",
    "dashboard.wallet-users.state2": "KYC verificado",
    "dashboard.wallet-users.state3": "Perfil completado",
    "dashboard.wallet-users.state4": "Billetera Creada",
    "dashboard.wallet-users.state5": "KYC No verificado",
    "dashboard.wallet-users.locked-wallet": "Billetera bloqueada",
    "dashboard.wallet-users.active-wallet": "Billetera Activa",
    "dashboard.wallet-users.no-wallet": "No hay billetera",
    "dashboard.wallet-users.select-state": "Seleccionar estado",
    "dashboard.wallet-users.select-wallet": "Seleccionar billetera",
    "dashboard.wallet-users.search.placeholder": "Buscar por nombre",
    "dashboard.reports.sections.transactions-by-user.header.type": "Tipo",
    "dashboard.reports.sections.transactions-by-user.header.description":
      "Descripcion",
    "dashboard.reports.sections.transactions-by-user.header.start":
      "Fecha de Inicio",
    "dashboard.reports.sections.transactions-by-user.header.finish":
      "Fecha de Fin",
    "dashboard.reports.sections.transactions-by-user.header.state": "Estado",
    "dashboard.reports.sections.transactions-by-user.header.actions":
      "Acciones",
    "dashboard.reports.sections.transactions-by-user.header.actions.details":
      "Detalles",
    "dashboard.reports.sections.transactions-by-user.details.header":
      "Detalles del servicio de transacciones",
    "dashboard.reports.sections.transactions-by-user.details.date": "Fecha",
    "dashboard.reports.sections.transactions-by-user.search-button": "Buscar",
    "dashboard.reports.sections.transactions-by-user.header.ammount": "Monto",
    "dashboard.reports.sections-transactions-by-user.search.wallet-address.placeholder":
      "Ingrese la dirección de la billetera",
    "dashboard.reports.sections-transactions-by-user.search.wallet-address.label":
      "Dirección de billetera",
    "dashboard.reports.sections-transactions-by-user.search.wallet-address.error":
      "Ingrese una dirección de billetera válida",
    "dashboard.reports.sections-transactions-by-user.search.period.placeholder":
      "Seleccione un rango de tiempo",
    "dashboard.reports.sections-transactions-by-user.search.period.error":
      "Ingrese un periodo válido",
    "dashboard.reports.sections-transactions-by-user.search.start-date.label":
      "Fecha de inicio",
    "dashboard.reports.sections-transactions-by-user.search.end-date.label":
      "Fecha de fin",
    "dashboard.reports.sections-transactions-by-user.search.type.placeholder":
      "Seleccione un tipo",
    "dashboard.reports.sections-transactions-by-user.search.type.error":
      "Ingrese un tipo válido",
    "dashboard.reports.sections-transactions-by-user.search.type.label": "Tipo",
    "dashboard.reports.sections-transactions-by-user.search.state.placeholder":
      "Seleccione un estado",
    "dashboard.reports.sections-transactions-by-user.search.state.error":
      "Ingrese un estado válido",
    "dashboard.reports.sections-transactions-by-user.search.state.label":
      "Estado",
    "dashboard.reports.sections-transactions-by-user.search.provider.placeholder":
      "Seleccione un proveedor",
    "dashboard.reports.sections-transactions-by-user.search.provider.error":
      "Ingrese un provider válido",
    "dashboard.reports.sections-transactions-by-user.search.provider.label":
      "Proveedor",
    "dashboard.reports.sections-transactions-by-user.user.label": "Usuario",
    "dashboard.reports.sections-transactions-by-user.period.label": "Periodo",
    "dashboard.reports.sections-transactions-by-user.period.no-start-selected":
      "No se ha seleccionado una fecha de inicio",
    "dashboard.reports.sections-transactions-by-user.period.no-end-selected":
      "No se ha seleccionado una fecha de fin",
  },
} satisfies I18nDictionary;
