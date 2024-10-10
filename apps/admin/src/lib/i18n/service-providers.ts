"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";

export const serviceProvidersDict = {
  en: {
    "service-providers.title": "Service Providers",
    "service-providers.search.placeholder": "Search",
    "service-providers.card.label": "Name:",
    "service-providers.add-button": "Add Service Provider",
    "service-providers.add-dialog.title": "Add Service Provider",
    "service-providers.add-dialog.company-name.label": "Company Name",
    "service-providers.add-dialog.company-name.placeholder":
      "Enter company name",
    "service-providers.add-dialog.company-name.error":
      "The company name is required",
    "service-providers.add-dialog.ein.label": "EIN",
    "service-providers.add-dialog.ein.placeholder": "NN-NNNNNNN",
    "service-providers.add-dialog.ein.error":
      "Please fill in a valid EIN in the format XX-XXXXXXX",
    "service-providers.add-dialog.country.label": "Country",
    "service-providers.add-dialog.country.placeholder": "Choose the country",
    "service-providers.add-dialog.country.error": "The country is required",
    "service-providers.add-dialog.city.label": "State",
    "service-providers.add-dialog.city.placeholder": "Choose the state",
    "service-providers.add-dialog.city.error": "The state is required",
    "service-providers.add-dialog.zip-code.label": "Zip Code",
    "service-providers.add-dialog.zip-code.placeholder": "Enter the Zip Code",
    "service-providers.add-dialog.zip-code.error": "The zip code is required",
    "service-providers.add-dialog.company-address.label": "Company Address",
    "service-providers.add-dialog.company-address.placeholder":
      "Enter the Address",
    "service-providers.add-dialog.company-address.error":
      "The company address is required",
    "service-providers.add-dialog.wallet-address.label": "Wallet Address",
    "service-providers.add-dialog.wallet-address.placeholder":
      "Enter the Address",
    "service-providers.add-dialog.wallet-address.error":
      "The wallet address is invalid",
    "service-providers.add-dialog.asset.label": "Asset",
    "service-providers.add-dialog.asset.placeholder": "Choose the asset",
    "service-providers.add-dialog.asset.error": "The asset is required",
    "service-providers.add-dialog.company-logo.label": "Company logo",
    "service-providers.add-dialog.company-logo.placeholder":
      "Drop or Upload the Company Logo here",
    "service-providers.add-dialog.company-logo.button": "Choose a file",
    "service-providers.add-dialog.company-logo.error":
      "The company logo is required",
    "service-providers.add-dialog.primary-button": "Create",
    "service-providers.add-dialog.toast.success":
      "Service Provider Created Successfully",
    "service-providers.add-dialog.image.toast.success":
      "Service Provider Image Uploaded Successfully",
    "service-providers.edit-dialog.title": "Edit Service Provider",
    "service-providers.edit-dialog.company-name.label": "Company Name",
    "service-providers.edit-dialog.company-name.placeholder":
      "Enter company name",
    "service-providers.edit-dialog.company-name.error":
      "The company name is required",
    "service-providers.edit-dialog.ein.label": "EIN",
    "service-providers.edit-dialog.ein.placeholder": "NN-NNNNNNN",
    "service-providers.edit-dialog.ein.error":
      "Please fill in a valid EIN in the format XX-XXXXXXX",
    "service-providers.edit-dialog.country.label": "Country",
    "service-providers.edit-dialog.country.placeholder": "Choose the country",
    "service-providers.edit-dialog.country.error": "The country is required",
    "service-providers.edit-dialog.city.label": "State",
    "service-providers.edit-dialog.city.placeholder": "Choose the state",
    "service-providers.edit-dialog.city.error": "The state is required",
    "service-providers.edit-dialog.zip-code.label": "Zip Code",
    "service-providers.edit-dialog.zip-code.placeholder": "Enter the Zip Code",
    "service-providers.edit-dialog.zip-code.error": "The zip code is required",
    "service-providers.edit-dialog.company-address.label": "Company Address",
    "service-providers.edit-dialog.company-address.placeholder":
      "Enter the Address",
    "service-providers.edit-dialog.company-address.error":
      "The company address is required",
    "service-providers.edit-dialog.wallet-address.label": "Wallet Address",
    "service-providers.edit-dialog.wallet-address.placeholder":
      "Enter the Address",
    "service-providers.edit-dialog.wallet-address.error":
      "The wallet address is required",
    "service-providers.edit-dialog.asset.label": "Asset",
    "service-providers.edit-dialog.asset.placeholder": "Choose the asset",
    "service-providers.edit-dialog.asset.error": "The asset is required",
    "service-providers.edit-dialog.company-logo.label": "Company logo",
    "service-providers.edit-dialog.company-logo.placeholder":
      "Drop or Upload the Company Logo here",
    "service-providers.edit-dialog.company-logo.button": "Choose a file",
    "service-providers.edit-dialog.company-logo.error":
      "The company logo is required",
    "service-providers.edit-dialog.primary-button": "Save",
    "service-providers.edit-dialog.toast.success":
      "The Service Provider has been edited successfully.",
    "service-providers.edit-dialog.image.toast.success":
      "Service Provider Image Uploaded Successfully",
    "service-providers.inactive-dialog.title": "Deactivate Service Provider",
    "service-providers.inactive-dialog.description":
      "By deactivating this service provider, you will revoke the service provider's access to certain system privileges. Do you want to proceed?",
    "service-providers.inactive-dialog.primary-button": "Yes",
    "service-providers.inactive-dialog.secondary-button": "No",
    "service-providers.inactive-dialog.toast.success":
      "The Service Provider has been deactivate successfully.",
    "service-providers.activate-dialog.title": "Activate Service Provider",
    "service-providers.activate-dialog.description":
      "By activating this Service Provider, you are granting the access to specific system privileges. Do you want to proceed?",
    "service-providers.activate-dialog.primary-button": "Yes",
    "service-providers.activate-dialog.secondary-button": "No",
    "service-providers.activate-dialog.toast.success":
      "The Service Provider has been activated successfully.",
    "service-providers.home.title": "Service Providers",
    "service-providers.home.sections.users.label": "Users",
    "service-providers.home.sections.roles.label": "Roles",
    "service-providers.home.sections.settings.label": "Settings",
    "service-providers.home.sections.transactions.label": "Transactions",
    "service-providers.users.title": "Users",
    "service-providers.users.search.placeholder": "Search",
    "service-providers.users.add-button": "Add User",
    "service-providers.users.add-dialog.title": "Add User",
    "service-providers.users.add-dialog.first-name.label": "First Name",
    "service-providers.users.add-dialog.first-name.placeholder":
      "Enter the name",
    "service-providers.users.add-dialog.first-name.error":
      "First Name is required",
    "service-providers.users.add-dialog.last-name.label": "Last Name",
    "service-providers.users.add-dialog.last-name.placeholder":
      "Enter the last name",
    "service-providers.users.add-dialog.last-name.error":
      "Last Name is required",
    "service-providers.users.add-dialog.email.label": "Email",
    "service-providers.users.add-dialog.email.placeholder": "Enter the email",
    "service-providers.users.add-dialog.email.error":
      "Email is required and must be a valid email",
    "service-providers.users.add-dialog.phone.label": "Phone Number",
    "service-providers.users.add-dialog.phone.code-placeholder": "+00",
    "service-providers.users.add-dialog.phone.phone-placeholder":
      "Enter your phone number",
    "service-providers.users.add-dialog.phone.error": "Phone Number is invalid",
    "service-providers.users.add-dialog.role.label": "Role",
    "service-providers.users.add-dialog.role.placeholder": "Select Role",
    "service-providers.users.add-dialog.role.error": "Role is required",
    "service-providers.users.add-dialog.primary-button": "Save",
    "service-providers.users.add-dialog.toast.success":
      "A confirmation email has been sent to the user with the assigned password.",
    "service-providers.users.edit-dialog.title": "Edit User",
    "service-providers.users.edit-dialog.first-name.label": "First Name",
    "service-providers.users.edit-dialog.first-name.placeholder":
      "Enter the name",
    "service-providers.users.edit-dialog.first-name.error":
      "First Name is required",
    "service-providers.users.edit-dialog.last-name.label": "Last Name",
    "service-providers.users.edit-dialog.last-name.placeholder":
      "Enter the last name",
    "service-providers.users.edit-dialog.last-name.error":
      "Last Name is required",
    "service-providers.users.edit-dialog.email.label": "Email",
    "service-providers.users.edit-dialog.email.placeholder": "Enter the email",
    "service-providers.users.edit-dialog.email.error":
      "Email is required and must be a valid email",
    "service-providers.users.edit-dialog.phone.label": "Phone Number",
    "service-providers.users.edit-dialog.phone.code-placeholder": "+00",
    "service-providers.users.edit-dialog.phone.phone-placeholder":
      "Enter your phone number",
    "service-providers.users.edit-dialog.phone.error":
      "Phone Number is invalid",
    "service-providers.users.edit-dialog.role.label": "Role",
    "service-providers.users.edit-dialog.role.placeholder": "Select Role",
    "service-providers.users.edit-dialog.role.error": "Role is required",
    "service-providers.users.edit-dialog.primary-button": "Save",
    "service-providers.users.edit-dialog.toast.success":
      "The User has been edited successfully.",
    "service-providers.users.inactive-dialog.title": "Deactivate User",
    "service-providers.users.inactive-dialog.description":
      "By deactivating this user, you will revoke the user's access to certain system privileges. Do you want to proceed?",
    "service-providers.users.inactive-dialog.primary-button": "Yes",
    "service-providers.users.inactive-dialog.secondary-button": "No",
    "service-providers.users.inactive-dialog.toast.success":
      "The user has been deactivated successfully.",
    "service-providers.users.activate-dialog.title": "Activate User",
    "service-providers.users.activate-dialog.description":
      "By activating this user, you are granting the user access to specific system privileges. Do you want to proceed?",
    "service-providers.users.activate-dialog.primary-button": "Yes",
    "service-providers.users.activate-dialog.secondary-button": "No",
    "service-providers.users.activate-dialog.toast.success":
      "The user has been activated successfully.",
    "service-providers.users.table.header.first-name": "First Name",
    "service-providers.users.table.header.last-name": "Last Name",
    "service-providers.users.table.header.email": "Mail",
    "service-providers.users.table.header.phone": "Phone",
    "service-providers.users.table.header.role": "Role",
    "service-providers.users.table.header.contact": "Contact",
    "service-providers.users.table.header.is-active": "Active",
    "service-providers.users.table.header.actions": "Actions",
    "service-providers.users.table.actions.edit": "Edit",
    "service-providers.users.table.items-label": "Items per page:",
    "service-providers.users.table.items-count-separator": " of ",
    "service-providers.roles.title": "Roles",
    "service-providers.roles.search.placeholder": "Search",
    "service-providers.roles.add-button": "Add Role",
    "service-providers.roles.add-dialog.title": "Add Role",
    "service-providers.roles.add-dialog.name.label": "Name",
    "service-providers.roles.add-dialog.name.placeholder": "Role Name",
    "service-providers.roles.add-dialog.name.error":
      "Role Name cannot contain numbers and must be less than 20 characters",
    "service-providers.roles.add-dialog.description.label": "Description",
    "service-providers.roles.add-dialog.description.placeholder": "",
    "service-providers.roles.add-dialog.description.error":
      "Role Description cannot contain numbers and must be less than 50 characters",
    "service-providers.roles.add-dialog.primary-button": "Create",
    "service-providers.roles.add-dialog.toast.success":
      "Role Added Successfully",
    "service-providers.roles.edit-dialog.title": "Edit Role",
    "service-providers.roles.edit-dialog.name.label": "Name",
    "service-providers.roles.edit-dialog.name.placeholder": "Role Name",
    "service-providers.roles.edit-dialog.name.error":
      "Role Name cannot contain numbers and must be less than 20 characters",
    "service-providers.roles.edit-dialog.description.label": "Description",
    "service-providers.roles.edit-dialog.description.placeholder": "",
    "service-providers.roles.edit-dialog.description.error":
      "Role Description cannot contain numbers and must be less than 50 characters",
    "service-providers.roles.edit-dialog.primary-button": "Save",
    "service-providers.roles.edit-dialog.toast.success":
      "The role has been edited successfully.",
    "service-providers.roles.inactive-dialog.title": "Deactivate Role",
    "service-providers.roles.inactive-dialog.description.first":
      "Deactivating ",
    "service-providers.roles.inactive-dialog.description.second":
      " Role, will remove their access to all system resources. Proceed?",
    "service-providers.roles.inactive-dialog.primary-button": "Yes",
    "service-providers.roles.inactive-dialog.secondary-button": "No",
    "service-providers.roles.inactive-dialog.toast.success":
      "The role has been deactivated successfully.",
    "service-providers.roles.activate-dialog.title": "Activate Role",
    "service-providers.roles.activate-dialog.description.first":
      "By activating ",
    "service-providers.roles.activate-dialog.description.second":
      " Role, you are granting them system privileges. Proceed?",
    "service-providers.roles.activate-dialog.primary-button": "Yes",
    "service-providers.roles.activate-dialog.secondary-button": "No",
    "service-providers.roles.activate-dialog.toast.success":
      "The role has been activated successfully.",
    "service-providers.roles.table.header.role": "Role",
    "service-providers.roles.table.header.is-active": "Active",
    "service-providers.roles.table.header.actions": "Actions",
    "service-providers.roles.table.actions.edit": "Edit",
    "service-providers.roles.table.actions.access": "Access",
    "service-providers.roles.table.items-label": "Items per page:",
    "service-providers.roles.table.items-count-separator": " of ",
    "service-providers.roles.role.title": "Access ",
    "service-providers.roles.role.table.modules.header": "Modules",
    "service-providers.roles.role.table.view.header": "View",
    "service-providers.roles.role.table.add.header": "Add",
    "service-providers.roles.role.table.edit.header": "Edit",
    "service-providers.roles.role.table.inactive.header": "Deactivate",
    "service-providers.roles.role.table.all.header": "All",
    "service-providers.roles.role.table.action.header": "Action",
    "service-providers.roles.role.table.actions.save": "Save",
    "service-providers.roles.role.modules.users": "Users",
    "service-providers.roles.role.modules.wallets": "Wallets",
    "service-providers.roles.role.modules.serviceProviders":
      "Service/\nProviders",
    "service-providers.roles.role.modules.roles": "Roles",
    "service-providers.roles.role.modules.settings": "Settings",
    "service-providers.roles.role.modules.transactions": "Transactions",
    "service-providers.roles.role.success-toast": "Role Access Levels Updated",
    "service-providers.settings.title": "Settings",
    "service-providers.settings.sections.payment-parameters":
      "Payment Parameters",
    "service-providers.settings.sections.fee": "Set Fee",
    "service-providers.settings.sections.exchange-rates": "Exchange Rates",
    "service-providers.settings.fee.dialog.title": "Set Fee",
    "service-providers.settings.fee.dialog.percent.label": "Percent",
    "service-providers.settings.fee.dialog.percent.placeholder":
      "Enter percent",
    "service-providers.settings.fee.dialog.percent.error":
      "Percent is required and must be a number",
    "service-providers.settings.fee.dialog.commission.label": "Commission",
    "service-providers.settings.fee.dialog.commission.placeholder":
      "Enter commission",
    "service-providers.settings.fee.dialog.commission.error":
      "Commission is required and must be a number",
    "service-providers.settings.fee.dialog.base.label": "Base",
    "service-providers.settings.fee.dialog.base.placeholder": "Enter base",
    "service-providers.settings.fee.dialog.base.error":
      "Base is required and must be a number",
    "service-providers.settings.fee.dialog.primary-button": "Save",
    "service-providers.settings.fee.dialog.toast.success":
      "Fee has been set successfully",
    "service-providers.settings.payment-parameters.title": "Payment Parameters",
    "service-providers.settings.payment-parameters.search.placeholder":
      "Search",
    "service-providers.settings.payment-parameters.add-button": "Add Parameter",
    "service-providers.settings.payment-parameters.table.header.name":
      "Parameter Name",
    "service-providers.settings.payment-parameters.table.header.key": "Key",
    "service-providers.settings.payment-parameters.table.header.amount":
      "Amount",
    "service-providers.settings.payment-parameters.table.header.assets":
      "Assets",
    "service-providers.settings.payment-parameters.table.header.frequency":
      "Frequency",
    "service-providers.settings.payment-parameters.table.header.interval":
      "Interval",
    "service-providers.settings.payment-parameters.table.header.seconds":
      "Seconds",
    "service-providers.settings.payment-parameters.table.header.is-active":
      "Active",
    "service-providers.settings.payment-parameters.table.header.actions":
      "Actions",
    "service-providers.settings.payment-parameters.table.actions.edit": "Edit",
    "service-providers.settings.payment-parameters.table.items-label":
      "Items per page:",
    "service-providers.settings.payment-parameters.table.items-count-separator":
      " of ",
    "service-providers.settings.payment-parameters.inactive-dialog.title":
      "Deactivate Payment Parameter",
    "service-providers.settings.payment-parameters.inactive-dialog.description":
      "By deactivating this Payment Parameter, you will disable specific payment features and functionalities. Do you want to proceed?",
    "service-providers.settings.payment-parameters.inactive-dialog.primary-button":
      "Yes",
    "service-providers.settings.payment-parameters.inactive-dialog.secondary-button":
      "No",
    "service-providers.settings.payment-parameters.inactive-dialog.toast.success":
      "The Payment Parameter has been deactivate successfully.",
    "service-providers.settings.payment-parameters.activate-dialog.title":
      "Activate Payment Parameter",
    "service-providers.settings.payment-parameters.activate-dialog.description":
      "By activating this Payment Parameter, you are enabling specific payment features and functionalities. Do you want to proceed?",
    "service-providers.settings.payment-parameters.activate-dialog.primary-button":
      "Yes",
    "service-providers.settings.payment-parameters.activate-dialog.secondary-button":
      "No",
    "service-providers.settings.payment-parameters.activate-dialog.toast.success":
      "The Payment Parameter has been activated successfully.",
    "service-providers.settings.exchange-rates.title": "Exchange Rates",
    "service-providers.settings.exchange-rates.table.header.currency":
      "Currency",
    "service-providers.settings.exchange-rates.table.header.rate": "Rate",
    "service-providers.settings.exchange-rates.table.header.valid-until":
      "Valid Until",
    "service-providers.transactions.title": "Transactions",
    "service-providers.settings.sections.key": "Keys",
    "service-providers.settings.key.dialog.title": "Keys",
    "service-providers.settings.key.dialog.secretKey.label": "Secret Key: ",
    "service-providers.settings.key.dialog.publicKey.label": "Public Key: ",
    "service-providers.settings.key.dialog.no-key": "No key available",
  },
  es: {
    "service-providers.title": "Proveedores de servicios",
    "service-providers.search.placeholder": "Buscar",
    "service-providers.card.label": "Nombre:",
    "service-providers.add-button": "Agregar Proveedor de Servicios",
    "service-providers.add-dialog.title": "Agregar Proveedor de Servicios",
    "service-providers.add-dialog.company-name.label": "Nombre de la empresa",
    "service-providers.add-dialog.company-name.placeholder":
      "Ingrese el nombre de la empresa",
    "service-providers.add-dialog.company-name.error":
      "El nombre de la empresa es requerido",
    "service-providers.add-dialog.ein.label": "EIN",
    "service-providers.add-dialog.ein.placeholder": "NN-NNNNNNN",
    "service-providers.add-dialog.ein.error":
      "Por favor, ingrese un EIN válido en el formato XX-XXXXXXX",
    "service-providers.add-dialog.country.label": "País",
    "service-providers.add-dialog.country.placeholder": "Elija el país",
    "service-providers.add-dialog.country.error": "El país es requerido",
    "service-providers.add-dialog.city.label": "Estado",
    "service-providers.add-dialog.city.placeholder": "Elija el estado",
    "service-providers.add-dialog.city.error": "El estado es requerida",
    "service-providers.add-dialog.zip-code.label": "Código Postal",
    "service-providers.add-dialog.zip-code.placeholder":
      "Ingrese el Código Postal",
    "service-providers.add-dialog.zip-code.error":
      "El código postal es requerido",
    "service-providers.add-dialog.company-address.label":
      "Dirección de la empresa",
    "service-providers.add-dialog.company-address.placeholder":
      "Ingrese la dirección",
    "service-providers.add-dialog.company-address.error":
      "La dirección de la empresa es requerida",
    "service-providers.add-dialog.wallet-address.label":
      "Dirección de la billetera",
    "service-providers.add-dialog.wallet-address.placeholder":
      "Ingrese la dirección",
    "service-providers.add-dialog.wallet-address.error":
      "La dirección de la billetera es invalida",
    "service-providers.add-dialog.asset.label": "Activo",
    "service-providers.add-dialog.asset.placeholder": "Elija el activo",
    "service-providers.add-dialog.asset.error": "El activo es requerido",
    "service-providers.add-dialog.company-logo.label": "Logo de la empresa",
    "service-providers.add-dialog.company-logo.placeholder":
      "Arrastre o suba el logo de la empresa aquí",
    "service-providers.add-dialog.company-logo.button": "Elija un archivo",
    "service-providers.add-dialog.company-logo.error":
      "El logo de la empresa es requerido",
    "service-providers.add-dialog.primary-button": "Crear",
    "service-providers.add-dialog.toast.success":
      "Proveedor de servicios creado satisfactoriamente",
    "service-providers.add-dialog.image.toast.success":
      "Imagen de Proveedor de servicios subida satisfactoriamente",
    "service-providers.edit-dialog.title": "Editar Proveedor de Servicios",
    "service-providers.edit-dialog.company-name.label": "Nombre de la empresa",
    "service-providers.edit-dialog.company-name.placeholder":
      "Ingrese el nombre de la empresa",
    "service-providers.edit-dialog.company-name.error":
      "El nombre de la empresa es requerido",
    "service-providers.edit-dialog.ein.label": "EIN",
    "service-providers.edit-dialog.ein.placeholder": "NN-NNNNNNN",
    "service-providers.edit-dialog.ein.error":
      "Por favor, ingrese un EIN válido en el formato XX-XXXXXXX",
    "service-providers.edit-dialog.country.label": "País",
    "service-providers.edit-dialog.country.placeholder": "Elija el país",
    "service-providers.edit-dialog.country.error": "El país es requerido",
    "service-providers.edit-dialog.city.label": "Ciudad",
    "service-providers.edit-dialog.city.placeholder": "Elija la ciudad",
    "service-providers.edit-dialog.city.error": "La ciudad es requerida",
    "service-providers.edit-dialog.zip-code.label": "Código Postal",
    "service-providers.edit-dialog.zip-code.placeholder":
      "Ingrese el Código Postal",
    "service-providers.edit-dialog.zip-code.error":
      "El código postal es requerido",
    "service-providers.edit-dialog.company-address.label":
      "Dirección de la empresa",
    "service-providers.edit-dialog.company-address.placeholder":
      "Ingrese la dirección",
    "service-providers.edit-dialog.company-address.error":
      "La dirección de la empresa es requerida",
    "service-providers.edit-dialog.wallet-address.label":
      "Dirección de la billetera",
    "service-providers.edit-dialog.wallet-address.placeholder":
      "Ingrese la dirección",
    "service-providers.edit-dialog.wallet-address.error":
      "La dirección de la billetera es requerida",
    "service-providers.edit-dialog.asset.label": "Activo",
    "service-providers.edit-dialog.asset.placeholder": "Elija el activo",
    "service-providers.edit-dialog.asset.error": "El activo es requerido",
    "service-providers.edit-dialog.company-logo.label": "Logo de la empresa",
    "service-providers.edit-dialog.company-logo.placeholder":
      "Arrastre o suba el logo de la empresa aquí",
    "service-providers.edit-dialog.company-logo.button": "Elija un archivo",
    "service-providers.edit-dialog.company-logo.error":
      "El logo de la empresa es requerido",
    "service-providers.edit-dialog.primary-button": "Guardar",
    "service-providers.edit-dialog.toast.success":
      "El Proveedor de Servicios ha sido editado satisfactoriamente.",
    "service-providers.edit-dialog.image.toast.success":
      "Imagen de Proveedor de servicios subida satisfactoriamente",
    "service-providers.inactive-dialog.title":
      "Desactivar Proveedor de Servicios",
    "service-providers.inactive-dialog.description":
      "Desactivando este Proveedor de Servicios, quitaras los provilegios de acceso al sistema. ¿Desea proceder?",
    "service-providers.inactive-dialog.primary-button": "Si",
    "service-providers.inactive-dialog.secondary-button": "No",
    "service-providers.inactive-dialog.toast.success":
      "El Proveedor de servicio ha sido desactivado satisfactoriamente.",
    "service-providers.activate-dialog.title": "Activar Proveedor de Servicios",
    "service-providers.activate-dialog.description":
      "Activando este Proveedor de Servicios, quitaras los provilegios de acceso al sistema. ¿Desea proceder?",
    "service-providers.activate-dialog.primary-button": "Si",
    "service-providers.activate-dialog.secondary-button": "No",
    "service-providers.activate-dialog.toast.success":
      "El Proveedor de servicio ha sido activado satisfactoriamente.",
    "service-providers.home.title": "Proveedores de servicios",
    "service-providers.home.sections.users.label": "Usuarios",
    "service-providers.home.sections.roles.label": "Roles",
    "service-providers.home.sections.settings.label": "Configuraciones",
    "service-providers.home.sections.transactions.label": "Transacciones",
    "service-providers.users.title": "Usuarios",
    "service-providers.users.search.placeholder": "Buscar",
    "service-providers.users.add-button": "Agregar Usuario",
    "service-providers.users.add-dialog.title": "Agregar Usuario",
    "service-providers.users.add-dialog.first-name.label": "Nombre",
    "service-providers.users.add-dialog.first-name.placeholder":
      "Ingrese el nombre",
    "service-providers.users.add-dialog.first-name.error":
      "Nombre es requerido",
    "service-providers.users.add-dialog.last-name.label": "Apellido",
    "service-providers.users.add-dialog.last-name.placeholder":
      "Ingrese el apellido",
    "service-providers.users.add-dialog.last-name.error":
      "Apellido es requerido",
    "service-providers.users.add-dialog.email.label": "Correo",
    "service-providers.users.add-dialog.email.placeholder": "Ingrese el correo",
    "service-providers.users.add-dialog.email.error":
      "Correo es requerido y debe ser un correo válido",
    "service-providers.users.add-dialog.phone.label": "Número de Teléfono",
    "service-providers.users.add-dialog.phone.code-placeholder": "+00",
    "service-providers.users.add-dialog.phone.phone-placeholder":
      "Ingrese su número de teléfono",
    "service-providers.users.add-dialog.phone.error":
      "Número de Teléfono es invalido",
    "service-providers.users.add-dialog.role.label": "Rol",
    "service-providers.users.add-dialog.role.placeholder": "Seleccionar Rol",
    "service-providers.users.add-dialog.role.error": "Rol es requerido",
    "service-providers.users.add-dialog.primary-button": "Guardar",
    "service-providers.users.add-dialog.toast.success":
      "Se ha enviado un correo de confirmación al usuario con la contraseña asignada.",
    "service-providers.users.edit-dialog.title": "Editar Usuario",
    "service-providers.users.edit-dialog.first-name.label": "Nombre",
    "service-providers.users.edit-dialog.first-name.placeholder":
      "Ingrese el nombre",
    "service-providers.users.edit-dialog.first-name.error":
      "Nombre es requerido",
    "service-providers.users.edit-dialog.last-name.label": "Apellido",
    "service-providers.users.edit-dialog.last-name.placeholder":
      "Ingrese el apellido",
    "service-providers.users.edit-dialog.last-name.error":
      "Apellido es requerido",
    "service-providers.users.edit-dialog.email.label": "Correo",
    "service-providers.users.edit-dialog.email.placeholder":
      "Ingrese el correo",
    "service-providers.users.edit-dialog.email.error":
      "Correo es requerido y debe ser un correo válido",
    "service-providers.users.edit-dialog.phone.label": "Número de Teléfono",
    "service-providers.users.edit-dialog.phone.code-placeholder": "+00",
    "service-providers.users.edit-dialog.phone.phone-placeholder":
      "Ingrese su número de teléfono",
    "service-providers.users.edit-dialog.phone.error":
      "Número de Teléfono es invalido",
    "service-providers.users.edit-dialog.role.label": "Rol",
    "service-providers.users.edit-dialog.role.placeholder": "Seleccionar Rol",
    "service-providers.users.edit-dialog.role.error": "Rol es requerido",
    "service-providers.users.edit-dialog.primary-button": "Guardar",
    "service-providers.users.edit-dialog.toast.success":
      "El Usuario se ha editado exitosamente.",
    "service-providers.users.inactive-dialog.title": "Inactivar usuario",
    "service-providers.users.inactive-dialog.description":
      "Al desactivar este usuario, revocará el acceso del usuario a ciertos privilegios del sistema. ¿Desea continuar?",
    "service-providers.users.inactive-dialog.primary-button": "Sí",
    "service-providers.users.inactive-dialog.secondary-button": "No",
    "service-providers.users.inactive-dialog.toast.success":
      "El usuario se ha desactivado exitosamente.",
    "service-providers.users.activate-dialog.title": "Activar Usuario",
    "service-providers.users.activate-dialog.description":
      "Al activar este usuario, le está otorgando al usuario acceso a privilegios específicos del sistema. ¿Desea continuar?",
    "service-providers.users.activate-dialog.primary-button": "Sí",
    "service-providers.users.activate-dialog.secondary-button": "No",
    "service-providers.users.activate-dialog.toast.success":
      "El usuario se ha activado exitosamente.",
    "service-providers.users.table.header.first-name": "Nombre",
    "service-providers.users.table.header.last-name": "Apellido",
    "service-providers.users.table.header.email": "Correo",
    "service-providers.users.table.header.phone": "Teléfono",
    "service-providers.users.table.header.role": "Rol",
    "service-providers.users.table.header.contact": "Contacto",
    "service-providers.users.table.header.is-active": "Activo",
    "service-providers.users.table.header.actions": "Acciones",
    "service-providers.users.table.actions.edit": "Editar",
    "service-providers.users.table.items-label": "Elementos por página:",
    "service-providers.users.table.items-count-separator": " de ",
    "service-providers.roles.title": "Roles",
    "service-providers.roles.search.placeholder": "Buscar",
    "service-providers.roles.add-button": "Crear Rol",
    "service-providers.roles.add-dialog.title": "Crear Rol",
    "service-providers.roles.add-dialog.name.label": "Nombre",
    "service-providers.roles.add-dialog.name.placeholder": "Nombre del Rol",
    "service-providers.roles.add-dialog.name.error":
      "El nombre del Rol no puede contener números y debe tener menos de 20 caracteres",
    "service-providers.roles.add-dialog.description.label": "Descripción",
    "service-providers.roles.add-dialog.description.placeholder": "",
    "service-providers.roles.add-dialog.description.error":
      "El nombre del Rol no puede contener números y debe tener menos de 50 caracteres",
    "service-providers.roles.add-dialog.primary-button": "Crear",
    "service-providers.roles.add-dialog.toast.success":
      "Rol Creado Exitosamente",
    "service-providers.roles.edit-dialog.title": "Editar Rol",
    "service-providers.roles.edit-dialog.name.label": "Nombre",
    "service-providers.roles.edit-dialog.name.placeholder": "Nombre del Rol",
    "service-providers.roles.edit-dialog.name.error":
      "El nombre del Rol no puede contener números y debe tener menos de 20 caracteres",
    "service-providers.roles.edit-dialog.description.label": "Descripción",
    "service-providers.roles.edit-dialog.description.placeholder": "",
    "service-providers.roles.edit-dialog.description.error":
      "La descripción del Rol no puede contener números y debe tener menos de 50 caracteres",
    "service-providers.roles.edit-dialog.primary-button": "Guardar",
    "service-providers.roles.edit-dialog.toast.success":
      "El rol se ha editado exitosamente.",
    "service-providers.roles.inactive-dialog.title": "Desactivar Rol",
    "service-providers.roles.inactive-dialog.description.first":
      "Al desactivar Rol ",
    "service-providers.roles.inactive-dialog.description.second":
      "Se le quitará el acceso a todos los recursos del sistema. ¿Desea continuar?",
    "service-providers.roles.inactive-dialog.primary-button": "Sí",
    "service-providers.roles.inactive-dialog.secondary-button": "No",
    "service-providers.roles.inactive-dialog.toast.success":
      "El rol se ha desactivado exitosamente.",
    "service-providers.roles.activate-dialog.title": "Activar Rol",
    "service-providers.roles.activate-dialog.description.first":
      "Al activar Rol ",
    "service-providers.roles.activate-dialog.description.second":
      " se le otorgarán privilegios en el sistema. ¿Desea continuar?",
    "service-providers.roles.activate-dialog.primary-button": "Sí",
    "service-providers.roles.activate-dialog.secondary-button": "No",
    "service-providers.roles.activate-dialog.toast.success":
      "El rol se ha activado exitosamente.",
    "service-providers.roles.table.header.role": "Rol",
    "service-providers.roles.table.header.is-active": "Activo",
    "service-providers.roles.table.header.actions": "Acciones",
    "service-providers.roles.table.actions.edit": "Editar",
    "service-providers.roles.table.actions.access": "Acceder",
    "service-providers.roles.table.items-label": "Elementos por página:",
    "service-providers.roles.table.items-count-separator": " de ",
    "service-providers.roles.role.title": "Acceso ",
    "service-providers.roles.role.table.modules.header": "Módulos",
    "service-providers.roles.role.table.view.header": "Ver",
    "service-providers.roles.role.table.add.header": "Agregar",
    "service-providers.roles.role.table.edit.header": "Editar",
    "service-providers.roles.role.table.inactive.header": "Desactivar",
    "service-providers.roles.role.table.all.header": "Todos",
    "service-providers.roles.role.table.action.header": "Acción",
    "service-providers.roles.role.table.actions.save": "Guardar",
    "service-providers.roles.role.modules.users": "Usuarios",
    "service-providers.roles.role.modules.wallets": "Billeteras",
    "service-providers.roles.role.modules.serviceProviders":
      "Servicios/\nProveedores",
    "service-providers.roles.role.modules.roles": "Roles",
    "service-providers.roles.role.modules.settings": "Configuraciones",
    "service-providers.roles.role.modules.transactions": "Transacciones",
    "service-providers.roles.role.success-toast":
      "Niveles de Acceso del Rol Actualizados",
    "service-providers.settings.title": "Configuraciones",
    "service-providers.settings.sections.payment-parameters":
      "Parámetros de Pago",
    "service-providers.settings.sections.fee": "Establecer Tarifa",
    "service-providers.settings.sections.exchange-rates": "Tasas de Cambio",
    "service-providers.settings.fee.dialog.title": "Establecer Tarifa",
    "service-providers.settings.fee.dialog.percent.label": "Porcentaje",
    "service-providers.settings.fee.dialog.percent.placeholder":
      "Ingrese el porcentaje",
    "service-providers.settings.fee.dialog.percent.error":
      "El porcentaje es requerido y debe ser un número",
    "service-providers.settings.fee.dialog.commission.label": "Comisión",
    "service-providers.settings.fee.dialog.commission.placeholder":
      "Ingrese la comisión",
    "service-providers.settings.fee.dialog.commission.error":
      "La comisión es requerida y debe ser un número",
    "service-providers.settings.fee.dialog.base.label": "Base",
    "service-providers.settings.fee.dialog.base.placeholder": "Ingrese la base",
    "service-providers.settings.fee.dialog.base.error":
      "La base es requerida y debe ser un número",
    "service-providers.settings.fee.dialog.primary-button": "Guardar",
    "service-providers.settings.fee.dialog.toast.success":
      "La tarifa ha sido establecida satisfactoriamente",
    "service-providers.settings.payment-parameters.search.placeholder":
      "Buscar",
    "service-providers.settings.payment-parameters.title": "Parámetros de Pago",
    "service-providers.settings.payment-parameters.add-button":
      "Agregar Parámetro",
    "service-providers.settings.payment-parameters.table.header.name": "Nombre",
    "service-providers.settings.payment-parameters.table.header.key": "Llave",
    "service-providers.settings.payment-parameters.table.header.amount":
      "Cantidad",
    "service-providers.settings.payment-parameters.table.header.assets":
      "Activos",
    "service-providers.settings.payment-parameters.table.header.frequency":
      "Frecuencia",
    "service-providers.settings.payment-parameters.table.header.interval":
      "Intervalo",
    "service-providers.settings.payment-parameters.table.header.seconds":
      "Segundos",
    "service-providers.settings.payment-parameters.table.header.is-active":
      "Activo",
    "service-providers.settings.payment-parameters.table.header.actions":
      "Acciones",
    "service-providers.settings.payment-parameters.table.actions.edit":
      "Editar",
    "service-providers.settings.payment-parameters.table.items-label":
      "Elementos por página:",
    "service-providers.settings.payment-parameters.table.items-count-separator":
      " de ",
    "service-providers.settings.payment-parameters.inactive-dialog.title":
      "Desactivar Parámetro de Pago",
    "service-providers.settings.payment-parameters.inactive-dialog.description":
      "Al desactivar este Parámetro de Pago, deshabilitará funciones y características de pago específicas. ¿Desea continuar?",
    "service-providers.settings.payment-parameters.inactive-dialog.primary-button":
      "Sí",
    "service-providers.settings.payment-parameters.inactive-dialog.secondary-button":
      "No",
    "service-providers.settings.payment-parameters.inactive-dialog.toast.success":
      "El Parámetro de Pago ha sido desactivado satisfactoriamente.",
    "service-providers.settings.payment-parameters.activate-dialog.title":
      "Activar Parámetro de Pago",
    "service-providers.settings.payment-parameters.activate-dialog.description":
      "Al activar este Parámetro de Pago, habilitará funciones y características de pago específicas. ¿Desea continuar?",
    "service-providers.settings.payment-parameters.activate-dialog.primary-button":
      "Sí",
    "service-providers.settings.payment-parameters.activate-dialog.secondary-button":
      "No",
    "service-providers.settings.payment-parameters.activate-dialog.toast.success":
      "El Parámetro de Pago ha sido activado satisfactoriamente.",
    "service-providers.settings.exchange-rates.title": "Tasas de Cambio",
    "service-providers.settings.exchange-rates.table.header.currency": "Moneda",
    "service-providers.settings.exchange-rates.table.header.rate": "Tasa",
    "service-providers.settings.exchange-rates.table.header.valid-until":
      "Válido Hasta",
    "service-providers.transactions.title": "Transacciones",
    "service-providers.settings.sections.key": "Llaves",
    "service-providers.settings.key.dialog.title": "Llaves",
    "service-providers.settings.key.dialog.secretKey.label": "Llave secreta: ",
    "service-providers.settings.key.dialog.publicKey.label": "Llave pública: ",
    "service-providers.settings.key.dialog.no-key": "No existe llave",
  },
} satisfies I18nDictionary;
