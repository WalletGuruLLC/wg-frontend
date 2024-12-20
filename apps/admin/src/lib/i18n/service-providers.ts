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
      "Enter Company Name",
    "service-providers.add-dialog.company-name.error":
      "The Company Name is Required",
    "service-providers.add-dialog.ein.label": "EIN",
    "service-providers.add-dialog.ein.placeholder": "NN-NNNNNNN",
    "service-providers.add-dialog.ein.error":
      "Please Fill in a Valid EIN in the Format XX-XXXXXXX",
    "service-providers.add-dialog.country.label": "Country",
    "service-providers.add-dialog.country.placeholder": "Choose the Country",
    "service-providers.add-dialog.country.error": "The Country is Required",
    "service-providers.add-dialog.city.label": "State",
    "service-providers.add-dialog.city.placeholder": "Choose the State",
    "service-providers.add-dialog.city.error": "The State is Required",
    "service-providers.add-dialog.zip-code.label": "Zip Code",
    "service-providers.add-dialog.zip-code.placeholder": "Enter the Zip Code",
    "service-providers.add-dialog.zip-code.error": "The Zip Code is Required",
    "service-providers.add-dialog.company-address.label": "Company Address",
    "service-providers.add-dialog.company-address.placeholder":
      "Enter the Address",
    "service-providers.add-dialog.company-address.error":
      "The Company Address is Required",
    "service-providers.add-dialog.wallet-address.label": "Wallet Address",
    "service-providers.add-dialog.wallet-address.placeholder":
      "Enter the Wallet Address",
    "service-providers.add-dialog.wallet-address.error":
      "The Wallet Address is Invalid",
    "service-providers.add-dialog.asset.label": "Asset",
    "service-providers.add-dialog.asset.placeholder": "Choose the Asset",
    "service-providers.add-dialog.asset.error": "The Asset is Required",
    "service-providers.add-dialog.company-logo.label": "Company Logo",
    "service-providers.add-dialog.company-logo.placeholder":
      "Drop or Upload the Company Logo Here",
    "service-providers.add-dialog.company-logo.button": "Choose a File",
    "service-providers.add-dialog.company-logo.error":
      "The Company Logo is Required",
    "service-providers.add-dialog.primary-button": "Create",
    "service-providers.add-dialog.toast.success":
      "Service Provider Created Successfully",
    "service-providers.add-dialog.image.toast.success":
      "Service Provider Image Uploaded Successfully",
    "service-providers.edit-dialog.title": "Edit Service Provider",
    "service-providers.edit-dialog.company-name.label": "Company Name",
    "service-providers.edit-dialog.company-name.placeholder":
      "Enter Company Name",
    "service-providers.edit-dialog.company-name.error":
      "The Company Name is Required",
    "service-providers.edit-dialog.ein.label": "EIN",
    "service-providers.edit-dialog.ein.placeholder": "NN-NNNNNNN",
    "service-providers.edit-dialog.ein.error":
      "Please Fill in a Valid EIN in the Format XX-XXXXXXX",
    "service-providers.edit-dialog.country.label": "Country",
    "service-providers.edit-dialog.country.placeholder": "Choose the Country",
    "service-providers.edit-dialog.country.error": "The Country is required",
    "service-providers.edit-dialog.city.label": "State",
    "service-providers.edit-dialog.city.placeholder": "Choose the State",
    "service-providers.edit-dialog.city.error": "The State is Required",
    "service-providers.edit-dialog.zip-code.label": "Zip Code",
    "service-providers.edit-dialog.zip-code.placeholder": "Enter the Zip Code",
    "service-providers.edit-dialog.zip-code.error": "The Zip Code is Required",
    "service-providers.edit-dialog.company-address.label": "Company Address",
    "service-providers.edit-dialog.company-address.placeholder":
      "Enter the Address",
    "service-providers.edit-dialog.company-address.error":
      "The Company Address is Required",
    "service-providers.edit-dialog.wallet-address.label": "Wallet Address",
    "service-providers.edit-dialog.wallet-address.placeholder":
      "Enter the Wallet Address",
    "service-providers.edit-dialog.wallet-address.error":
      "The Wallet Address is Required",
    "service-providers.edit-dialog.asset.label": "Asset",
    "service-providers.edit-dialog.asset.placeholder": "Choose the Asset",
    "service-providers.edit-dialog.asset.error": "The Asset is required",
    "service-providers.edit-dialog.company-logo.label": "Company Logo",
    "service-providers.edit-dialog.company-logo.placeholder":
      "Drop or Upload the Company Logo Here",
    "service-providers.edit-dialog.company-logo.button": "Choose a File",
    "service-providers.edit-dialog.company-logo.error":
      "The Company Logo is Required",
    "service-providers.edit-dialog.primary-button": "Save",
    "service-providers.edit-dialog.toast.success":
      "The Service Provider has been Edited Successfully.",
    "service-providers.edit-dialog.image.toast.success":
      "Service Provider Image Uploaded Successfully",
    "service-providers.inactive-dialog.title": "Deactivate Service Provider",
    "service-providers.inactive-dialog.description":
      "By Deactivating this Service Provider, you will Revoke the Service Provider's Access to Certain System Privileges. Do you Want to Proceed?",
    "service-providers.inactive-dialog.primary-button": "Yes",
    "service-providers.inactive-dialog.secondary-button": "No",
    "service-providers.inactive-dialog.toast.success":
      "The Service Provider has been Deactivate Successfully.",
    "service-providers.activate-dialog.title": "Activate Service Provider",
    "service-providers.activate-dialog.description":
      "By Activating this Service Provider, you are Granting the Access to Specific System Privileges. Do you Want to Proceed?",
    "service-providers.activate-dialog.primary-button": "Yes",
    "service-providers.activate-dialog.secondary-button": "No",
    "service-providers.activate-dialog.toast.success":
      "The Service Provider has Been Activated Successfully.",
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
      "Enter the Name",
    "service-providers.users.add-dialog.first-name.error":
      "First Name is Required",
    "service-providers.users.add-dialog.last-name.label": "Last Name",
    "service-providers.users.add-dialog.last-name.placeholder":
      "Enter the Last Name",
    "service-providers.users.add-dialog.last-name.error":
      "Last Name is Required",
    "service-providers.users.add-dialog.email.label": "Email",
    "service-providers.users.add-dialog.email.placeholder": "Enter the Email",
    "service-providers.users.add-dialog.email.error":
      "Email is Required and Must be a Valid Email",
    "service-providers.users.add-dialog.phone.label": "Phone Number",
    "service-providers.users.add-dialog.phone.code-placeholder": "+00",
    "service-providers.users.add-dialog.phone.phone-placeholder":
      "Enter your Phone Number",
    "service-providers.users.add-dialog.phone.error": "Phone Number is Invalid",
    "service-providers.users.add-dialog.role.label": "Role",
    "service-providers.users.add-dialog.role.placeholder": "Select Role",
    "service-providers.users.add-dialog.role.error": "Role is Required",
    "service-providers.users.add-dialog.primary-button": "Save",
    "service-providers.users.add-dialog.toast.success":
      "A Confirmation Email has been Sent to the User with the Assigned Password.",
    "service-providers.users.edit-dialog.title": "Edit User",
    "service-providers.users.edit-dialog.first-name.label": "First Name",
    "service-providers.users.edit-dialog.first-name.placeholder":
      "Enter the Name",
    "service-providers.users.edit-dialog.first-name.error":
      "First Name is Required",
    "service-providers.users.edit-dialog.last-name.label": "Last Name",
    "service-providers.users.edit-dialog.last-name.placeholder":
      "Enter the Last Name",
    "service-providers.users.edit-dialog.last-name.error":
      "Last Name is Required",
    "service-providers.users.edit-dialog.email.label": "Email",
    "service-providers.users.edit-dialog.email.placeholder": "Enter the Email",
    "service-providers.users.edit-dialog.email.error":
      "Email is Required and Must be a Valid Email",
    "service-providers.users.edit-dialog.phone.label": "Phone Number",
    "service-providers.users.edit-dialog.phone.code-placeholder": "+00",
    "service-providers.users.edit-dialog.phone.phone-placeholder":
      "Enter your Phone Number",
    "service-providers.users.edit-dialog.phone.error":
      "Phone Number is Invalid",
    "service-providers.users.edit-dialog.role.label": "Role",
    "service-providers.users.edit-dialog.role.placeholder": "Select Role",
    "service-providers.users.edit-dialog.role.error": "Role is Required",
    "service-providers.users.edit-dialog.primary-button": "Save",
    "service-providers.users.edit-dialog.toast.success":
      "The User has been Edited Successfully.",
    "service-providers.users.inactive-dialog.title": "Deactivate User",
    "service-providers.users.inactive-dialog.description":
      "By Deactivating this User, you will Revoke the User's Access to Certain System Privileges. Do you Want to Proceed?",
    "service-providers.users.inactive-dialog.primary-button": "Yes",
    "service-providers.users.inactive-dialog.secondary-button": "No",
    "service-providers.users.inactive-dialog.toast.success":
      "The User has been Deactivated Successfully.",
    "service-providers.users.activate-dialog.title": "Activate User",
    "service-providers.users.activate-dialog.description":
      "By Activating this User, you are Granting the User Access to Specific System Privileges. Do you Want to Proceed?",
    "service-providers.users.activate-dialog.primary-button": "Yes",
    "service-providers.users.activate-dialog.secondary-button": "No",
    "service-providers.users.activate-dialog.toast.success":
      "The User has been Activated Successfully.",
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
      "Role Name Cannot Contain Numbers and Must be Less than 20 Characters",
    "service-providers.roles.add-dialog.description.label": "Description",
    "service-providers.roles.add-dialog.description.placeholder": "",
    "service-providers.roles.add-dialog.description.error":
      "Role Description Cannot Contain Numbers and Must be Less than 50 Characters",
    "service-providers.roles.add-dialog.primary-button": "Create",
    "service-providers.roles.add-dialog.toast.success":
      "Role Added Successfully",
    "service-providers.roles.edit-dialog.title": "Edit Role",
    "service-providers.roles.edit-dialog.name.label": "Name",
    "service-providers.roles.edit-dialog.name.placeholder": "Role Name",
    "service-providers.roles.edit-dialog.name.error":
      "Role Name cannot Contain Numbers and Must be Less than 20 Characters",
    "service-providers.roles.edit-dialog.description.label": "Description",
    "service-providers.roles.edit-dialog.description.placeholder": "",
    "service-providers.roles.edit-dialog.description.error":
      "Role Description cannot Contain Numbers and Must be Less than 50 Characters",
    "service-providers.roles.edit-dialog.primary-button": "Save",
    "service-providers.roles.edit-dialog.toast.success":
      "The Role has been Edited Successfully.",
    "service-providers.roles.inactive-dialog.title": "Deactivate Role",
    "service-providers.roles.inactive-dialog.description.first":
      "Deactivating ",
    "service-providers.roles.inactive-dialog.description.second":
      " Role, will Remove their Access to all System Resources. Proceed?",
    "service-providers.roles.inactive-dialog.primary-button": "Yes",
    "service-providers.roles.inactive-dialog.secondary-button": "No",
    "service-providers.roles.inactive-dialog.toast.success":
      "The role has been Deactivated Successfully.",
    "service-providers.roles.activate-dialog.title": "Activate Role",
    "service-providers.roles.activate-dialog.description.first":
      "By Activating ",
    "service-providers.roles.activate-dialog.description.second":
      " Role, you are Granting them System Privileges. Proceed?",
    "service-providers.roles.activate-dialog.primary-button": "Yes",
    "service-providers.roles.activate-dialog.secondary-button": "No",
    "service-providers.roles.activate-dialog.toast.success":
      "The Role has been Activated Successfully.",
    "service-providers.roles.table.header.role": "Roles",
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
    "service-providers.roles.role.modules.reports": "Reports",
    "service-providers.roles.role.modules.payments": "Payments",
    "service-providers.roles.role.modules.walletUsers": "Wallet Users",
    "service-providers.roles.role.modules.transactionsByUser":
      "Transactions by User",
    "service-providers.roles.role.modules.transactionsByProvider":
      "Transactions by Period",
    "service-providers.roles.role.modules.revenue": "Revenue",
    "service-providers.roles.role.modules.clearPayments": "Clear Payments",
    "service-providers.roles.role.modules.disputes": "Disputes",
    "service-providers.roles.role.modules.refunds": "Refunds",
    "service-providers.roles.role.modules.reservedFunds": "Reserved Funds",
    "service-providers.roles.role.modules.fees": "Fees",
    "service-providers.roles.role.modules.paymentSummary": "Clear Payments",
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
      "Percent is Required and Must be a Number",
    "service-providers.settings.fee.dialog.commission.label": "Commission",
    "service-providers.settings.fee.dialog.commission.placeholder":
      "Enter Commission",
    "service-providers.settings.fee.dialog.commission.error":
      "Commission is Required and Must be a Number",
    "service-providers.settings.fee.dialog.base.label": "Base",
    "service-providers.settings.fee.dialog.base.placeholder": "Enter Base",
    "service-providers.settings.fee.dialog.base.error":
      "Base is Required and Must be a Number",
    "service-providers.settings.fee.dialog.primary-button": "Save",
    "service-providers.settings.fee.dialog.toast.success":
      "Fee has been Set Successfully",
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
      "By deactivating this Payment Parameter, you will Disable Specific Payment Features and Functionalities. Do you Want to Proceed?",
    "service-providers.settings.payment-parameters.inactive-dialog.primary-button":
      "Yes",
    "service-providers.settings.payment-parameters.inactive-dialog.secondary-button":
      "No",
    "service-providers.settings.payment-parameters.inactive-dialog.toast.success":
      "The Payment Parameter has been Deactivate Successfully.",
    "service-providers.settings.payment-parameters.activate-dialog.title":
      "Activate Payment Parameter",
    "service-providers.settings.payment-parameters.activate-dialog.description":
      "By activating this Payment Parameter, you are enabling specific payment features and functionalities. Do you want to proceed?",
    "service-providers.settings.payment-parameters.activate-dialog.primary-button":
      "Yes",
    "service-providers.settings.payment-parameters.activate-dialog.secondary-button":
      "No",
    "service-providers.settings.payment-parameters.activate-dialog.toast.success":
      "The Payment Parameter has been Activated Successfully.",
    "service-providers.settings.payment-parameters.add-dialog.title":
      "Add Payment Parameter",
    "service-providers.settings.payment-parameters.add-dialog.name.label":
      "Name",
    "service-providers.settings.payment-parameters.add-dialog.name.placeholder":
      "Parameter Name",
    "service-providers.settings.payment-parameters.add-dialog.name.error":
      "Parameter Name is Required",
    "service-providers.settings.payment-parameters.add-dialog.cost.label":
      "Cost",
    "service-providers.settings.payment-parameters.add-dialog.cost.placeholder":
      "Cost",
    "service-providers.settings.payment-parameters.add-dialog.cost.error":
      "Cost is Required",
    "service-providers.settings.payment-parameters.add-dialog.interval.label":
      "Interval",
    "service-providers.settings.payment-parameters.add-dialog.interval.placeholder":
      "Interval",
    "service-providers.settings.payment-parameters.add-dialog.interval.error":
      "Interval is Required",
    "service-providers.settings.payment-parameters.add-dialog.frequency.label":
      "Frequency",
    "service-providers.settings.payment-parameters.add-dialog.frequency.placeholder":
      "Frequency",
    "service-providers.settings.payment-parameters.add-dialog.frequency.error":
      "Frequency is Required",
    "service-providers.settings.payment-parameters.add-dialog.primary-button":
      "Save",
    "service-providers.settings.payment-parameters.add-dialog.toast.success":
      "Payment Parameter Created Successfully",
    "service-providers.settings.payment-parameters.edit-dialog.title":
      "Edit Payment Parameter",
    "service-providers.settings.payment-parameters.edit-dialog.name.label":
      "Name",
    "service-providers.settings.payment-parameters.edit-dialog.name.placeholder":
      "Parameter Name",
    "service-providers.settings.payment-parameters.edit-dialog.name.error":
      "Parameter Name is Required",
    "service-providers.settings.payment-parameters.edit-dialog.cost.label":
      "Cost",
    "service-providers.settings.payment-parameters.edit-dialog.cost.placeholder":
      "Cost",
    "service-providers.settings.payment-parameters.edit-dialog.cost.error":
      "Cost is Required",
    "service-providers.settings.payment-parameters.edit-dialog.interval.label":
      "Interval",
    "service-providers.settings.payment-parameters.edit-dialog.interval.placeholder":
      "Interval",
    "service-providers.settings.payment-parameters.edit-dialog.interval.error":
      "Interval is Required",
    "service-providers.settings.payment-parameters.edit-dialog.frequency.label":
      "Frequency",
    "service-providers.settings.payment-parameters.edit-dialog.frequency.placeholder":
      "Frequency",
    "service-providers.settings.payment-parameters.edit-dialog.frequency.error":
      "Frequency is Required",
    "service-providers.settings.payment-parameters.edit-dialog.primary-button":
      "Save",
    "service-providers.settings.payment-parameters.edit-dialog.toast.success":
      "The Payment Parameter has been edited successfully.",
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
    "service-providers.settings.key.dialog.no-key": "No Key Available",
    "service-providers.roles.role.modules.healthCheck": "Health Check",
  },
  es: {
    "service-providers.title": "Proveedores de Servicios",
    "service-providers.search.placeholder": "Buscar",
    "service-providers.card.label": "Nombre:",
    "service-providers.add-button": "Agregar Proveedor de Servicios",
    "service-providers.add-dialog.title": "Agregar Proveedor de Servicios",
    "service-providers.add-dialog.company-name.label": "Nombre de la Empresa",
    "service-providers.add-dialog.company-name.placeholder":
      "Ingrese el Nombre de la Empresa",
    "service-providers.add-dialog.company-name.error":
      "El Nombre de la Empresa es requerido",
    "service-providers.add-dialog.ein.label": "EIN",
    "service-providers.add-dialog.ein.placeholder": "NN-NNNNNNN",
    "service-providers.add-dialog.ein.error":
      "Por favor, Ingrese un EIN Válido en el Formato XX-XXXXXXX",
    "service-providers.add-dialog.country.label": "País",
    "service-providers.add-dialog.country.placeholder": "Elija el País",
    "service-providers.add-dialog.country.error": "El País es Requerido",
    "service-providers.add-dialog.city.label": "Estado",
    "service-providers.add-dialog.city.placeholder": "Elija el Estado",
    "service-providers.add-dialog.city.error": "El Estado es Requerido",
    "service-providers.add-dialog.zip-code.label": "Código Postal",
    "service-providers.add-dialog.zip-code.placeholder":
      "Ingrese el Código Postal",
    "service-providers.add-dialog.zip-code.error":
      "El Código Postal es Requerido",
    "service-providers.add-dialog.company-address.label":
      "Dirección de la Empresa",
    "service-providers.add-dialog.company-address.placeholder":
      "Ingrese la Dirección",
    "service-providers.add-dialog.company-address.error":
      "La Dirección de la Empresa es Requerida",
    "service-providers.add-dialog.wallet-address.label":
      "Dirección de la Billetera",
    "service-providers.add-dialog.wallet-address.placeholder":
      "Ingrese la Dirección",
    "service-providers.add-dialog.wallet-address.error":
      "La Dirección de la Billetera es Inválida",
    "service-providers.add-dialog.asset.label": "Activo",
    "service-providers.add-dialog.asset.placeholder": "Elija la moneda",
    "service-providers.add-dialog.asset.error": "La Moneda es Requerida",
    "service-providers.add-dialog.company-logo.label": "Logo de la Empresa",
    "service-providers.add-dialog.company-logo.placeholder":
      "Arrastre o Suba el Logo de la Empresa Aquí",
    "service-providers.add-dialog.company-logo.button": "Elija un Archivo",
    "service-providers.add-dialog.company-logo.error":
      "El Logo de la Empresa es Requerido",
    "service-providers.add-dialog.primary-button": "Crear",
    "service-providers.add-dialog.toast.success":
      "Proveedor de Servicios Creado Satisfactoriamente",
    "service-providers.add-dialog.image.toast.success":
      "Imagen de Proveedor de Servicios Subida Satisfactoriamente",
    "service-providers.edit-dialog.title": "Editar Proveedor de Servicios",
    "service-providers.edit-dialog.company-name.label": "Nombre de la Empresa",
    "service-providers.edit-dialog.company-name.placeholder":
      "Ingrese el Nombre de la Empresa",
    "service-providers.edit-dialog.company-name.error":
      "El Nombre de la Empresa es Requerido",
    "service-providers.edit-dialog.ein.label": "EIN",
    "service-providers.edit-dialog.ein.placeholder": "NN-NNNNNNN",
    "service-providers.edit-dialog.ein.error":
      "Por favor, Ingrese un EIN Válido en el Formato XX-XXXXXXX",
    "service-providers.edit-dialog.country.label": "País",
    "service-providers.edit-dialog.country.placeholder": "Elija el País",
    "service-providers.edit-dialog.country.error": "El país es Requerido",
    "service-providers.edit-dialog.city.label": "Ciudad",
    "service-providers.edit-dialog.city.placeholder": "Elija la Ciudad",
    "service-providers.edit-dialog.city.error": "La Ciudad es Requerida",
    "service-providers.edit-dialog.zip-code.label": "Código Postal",
    "service-providers.edit-dialog.zip-code.placeholder":
      "Ingrese el Código Postal",
    "service-providers.edit-dialog.zip-code.error":
      "El Código Postal es Requerido",
    "service-providers.edit-dialog.company-address.label":
      "Dirección de la empresa",
    "service-providers.edit-dialog.company-address.placeholder":
      "Ingrese la Dirección",
    "service-providers.edit-dialog.company-address.error":
      "La Dirección de la Empresa es Requerida",
    "service-providers.edit-dialog.wallet-address.label":
      "Dirección de la Billetera",
    "service-providers.edit-dialog.wallet-address.placeholder":
      "Ingrese la Dirección",
    "service-providers.edit-dialog.wallet-address.error":
      "La Dirección de la Billetera es Requerida",
    "service-providers.edit-dialog.asset.label": "Moneda",
    "service-providers.edit-dialog.asset.placeholder": "Elija la moneda",
    "service-providers.edit-dialog.asset.error": "La Moneda es Requerida",
    "service-providers.edit-dialog.company-logo.label": "Logo de la empresa",
    "service-providers.edit-dialog.company-logo.placeholder":
      "Arrastre o Suba el Logo de la Empresa Aquí",
    "service-providers.edit-dialog.company-logo.button": "Elija un Archivo",
    "service-providers.edit-dialog.company-logo.error":
      "El logo de la Empresa es Requerido",
    "service-providers.edit-dialog.primary-button": "Guardar",
    "service-providers.edit-dialog.toast.success":
      "El Proveedor de Servicios ha sido Editado Satisfactoriamente.",
    "service-providers.edit-dialog.image.toast.success":
      "Imagen de Proveedor de Servicios Subida Satisfactoriamente",
    "service-providers.inactive-dialog.title":
      "Desactivar Proveedor de Servicios",
    "service-providers.inactive-dialog.description":
      "Desactivando este Proveedor de Servicios, Quitaras los Privilegios de Acceso al Sistema. ¿Desea Proceder?",
    "service-providers.inactive-dialog.primary-button": "Si",
    "service-providers.inactive-dialog.secondary-button": "No",
    "service-providers.inactive-dialog.toast.success":
      "El Proveedor de Servicio ha Sido Desactivado Satisfactoriamente.",
    "service-providers.activate-dialog.title": "Activar Proveedor de Servicios",
    "service-providers.activate-dialog.description":
      "Activando este Proveedor de Servicios, Quitaras los Privilegios de Acceso al Sistema. ¿Desea Proceder?",
    "service-providers.activate-dialog.primary-button": "Si",
    "service-providers.activate-dialog.secondary-button": "No",
    "service-providers.activate-dialog.toast.success":
      "El Proveedor de Servicio ha Sido Activado Satisfactoriamente.",
    "service-providers.home.title": "Proveedores de Servicios",
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
      "Ingrese el Nombre",
    "service-providers.users.add-dialog.first-name.error":
      "Nombre es Requerido",
    "service-providers.users.add-dialog.last-name.label": "Apellido",
    "service-providers.users.add-dialog.last-name.placeholder":
      "Ingrese el Apellido",
    "service-providers.users.add-dialog.last-name.error":
      "Apellido es Requerido",
    "service-providers.users.add-dialog.email.label": "Correo",
    "service-providers.users.add-dialog.email.placeholder": "Ingrese el Correo",
    "service-providers.users.add-dialog.email.error":
      "Correo es rRequerido y debe Ser un Correo Válido",
    "service-providers.users.add-dialog.phone.label": "Número de Teléfono",
    "service-providers.users.add-dialog.phone.code-placeholder": "+00",
    "service-providers.users.add-dialog.phone.phone-placeholder":
      "Ingrese su Número de Teléfono",
    "service-providers.users.add-dialog.phone.error":
      "Número de Teléfono es Inválido",
    "service-providers.users.add-dialog.role.label": "Rol",
    "service-providers.users.add-dialog.role.placeholder": "Seleccionar Rol",
    "service-providers.users.add-dialog.role.error": "Rol es Requerido",
    "service-providers.users.add-dialog.primary-button": "Guardar",
    "service-providers.users.add-dialog.toast.success":
      "Se ha Enviado un Correo de Confirmación al Usuario con la Contraseña Asignada.",
    "service-providers.users.edit-dialog.title": "Editar Usuario",
    "service-providers.users.edit-dialog.first-name.label": "Nombre",
    "service-providers.users.edit-dialog.first-name.placeholder":
      "Ingrese el Nombre",
    "service-providers.users.edit-dialog.first-name.error":
      "Nombre es Requerido",
    "service-providers.users.edit-dialog.last-name.label": "Apellido",
    "service-providers.users.edit-dialog.last-name.placeholder":
      "Ingrese el Apellido",
    "service-providers.users.edit-dialog.last-name.error":
      "Apellido es Requerido",
    "service-providers.users.edit-dialog.email.label": "Correo",
    "service-providers.users.edit-dialog.email.placeholder":
      "Ingrese el Correo",
    "service-providers.users.edit-dialog.email.error":
      "Correo es Requerido y Debe Ser un Correo Válido",
    "service-providers.users.edit-dialog.phone.label": "Número de Teléfono",
    "service-providers.users.edit-dialog.phone.code-placeholder": "+00",
    "service-providers.users.edit-dialog.phone.phone-placeholder":
      "Ingrese su Número de Teléfono",
    "service-providers.users.edit-dialog.phone.error":
      "Número de Teléfono es Inválido",
    "service-providers.users.edit-dialog.role.label": "Rol",
    "service-providers.users.edit-dialog.role.placeholder": "Seleccionar Rol",
    "service-providers.users.edit-dialog.role.error": "Rol es Requerido",
    "service-providers.users.edit-dialog.primary-button": "Guardar",
    "service-providers.users.edit-dialog.toast.success":
      "El Usuario se ha Editado Exitosamente.",
    "service-providers.users.inactive-dialog.title": "Inactivar Usuario",
    "service-providers.users.inactive-dialog.description":
      "Al Desactivar este Usuario, Revocará el Acceso del Usuario a Ciertos Privilegios del Sistema. ¿Desea Continuar?",
    "service-providers.users.inactive-dialog.primary-button": "Sí",
    "service-providers.users.inactive-dialog.secondary-button": "No",
    "service-providers.users.inactive-dialog.toast.success":
      "El Usuario se ha Desactivado Exitosamente.",
    "service-providers.users.activate-dialog.title": "Activar Usuario",
    "service-providers.users.activate-dialog.description":
      "Al Activar este Usuario, le está Otorgando al Usuario Acceso a Privilegios Específicos del Sistema. ¿Desea Continuar?",
    "service-providers.users.activate-dialog.primary-button": "Sí",
    "service-providers.users.activate-dialog.secondary-button": "No",
    "service-providers.users.activate-dialog.toast.success":
      "El Usuario se ha Activado Exitosamente.",
    "service-providers.users.table.header.first-name": "Nombre",
    "service-providers.users.table.header.last-name": "Apellido",
    "service-providers.users.table.header.email": "Correo",
    "service-providers.users.table.header.phone": "Teléfono",
    "service-providers.users.table.header.role": "Rol",
    "service-providers.users.table.header.contact": "Contacto",
    "service-providers.users.table.header.is-active": "Activo",
    "service-providers.users.table.header.actions": "Acciones",
    "service-providers.users.table.actions.edit": "Editar",
    "service-providers.users.table.items-label": "Items por página:",
    "service-providers.users.table.items-count-separator": " de ",
    "service-providers.roles.title": "Roles",
    "service-providers.roles.search.placeholder": "Buscar",
    "service-providers.roles.add-button": "Crear Rol",
    "service-providers.roles.add-dialog.title": "Crear Rol",
    "service-providers.roles.add-dialog.name.label": "Nombre",
    "service-providers.roles.add-dialog.name.placeholder": "Nombre del Rol",
    "service-providers.roles.add-dialog.name.error":
      "El Nombre del Rol No Puede Contener Números y Debe Tener Menos de 20 Caracteres",
    "service-providers.roles.add-dialog.description.label": "Descripción",
    "service-providers.roles.add-dialog.description.placeholder": "",
    "service-providers.roles.add-dialog.description.error":
      "El Nombre del Rol no puede Contener Números y Debe Tener Menos de 50 Caracteres",
    "service-providers.roles.add-dialog.primary-button": "Crear",
    "service-providers.roles.add-dialog.toast.success":
      "Rol Creado Exitosamente",
    "service-providers.roles.edit-dialog.title": "Editar Rol",
    "service-providers.roles.edit-dialog.name.label": "Nombre",
    "service-providers.roles.edit-dialog.name.placeholder": "Nombre del Rol",
    "service-providers.roles.edit-dialog.name.error":
      "El Nombre del Rol No Puede Contener Números y Debe Tener Menos de 20 Caracteres",
    "service-providers.roles.edit-dialog.description.label": "Descripción",
    "service-providers.roles.edit-dialog.description.placeholder": "",
    "service-providers.roles.edit-dialog.description.error":
      "La Descripción del Rol No Puede Contener Números y Debe Tener Menos de 50 Caracteres",
    "service-providers.roles.edit-dialog.primary-button": "Guardar",
    "service-providers.roles.edit-dialog.toast.success":
      "El Rol se ha Editado Exitosamente.",
    "service-providers.roles.inactive-dialog.title": "Desactivar Rol",
    "service-providers.roles.inactive-dialog.description.first":
      "Al Desactivar Rol ",
    "service-providers.roles.inactive-dialog.description.second":
      "Se le quitará el acceso a todos los recursos del sistema. ¿Desea Continuar?",
    "service-providers.roles.inactive-dialog.primary-button": "Sí",
    "service-providers.roles.inactive-dialog.secondary-button": "No",
    "service-providers.roles.inactive-dialog.toast.success":
      "El Rol se ha Desactivado Exitosamente.",
    "service-providers.roles.activate-dialog.title": "Activar Rol",
    "service-providers.roles.activate-dialog.description.first":
      "Al Activar Rol ",
    "service-providers.roles.activate-dialog.description.second":
      " se le otorgarán privilegios en el sistema. ¿Desea Continuar?",
    "service-providers.roles.activate-dialog.primary-button": "Sí",
    "service-providers.roles.activate-dialog.secondary-button": "No",
    "service-providers.roles.activate-dialog.toast.success":
      "El Rol se ha Activado Exitosamente.",
    "service-providers.roles.table.header.role": "Roles",
    "service-providers.roles.table.header.is-active": "Activo",
    "service-providers.roles.table.header.actions": "Acciones",
    "service-providers.roles.table.actions.edit": "Editar",
    "service-providers.roles.table.actions.access": "Acceder",
    "service-providers.roles.table.items-label": "Items por página:",
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
      "Proveedores de/\nServicio",
    "service-providers.roles.role.modules.roles": "Roles",
    "service-providers.roles.role.modules.settings": "Configuraciones",
    "service-providers.roles.role.modules.reports": "Reportes",
    "service-providers.roles.role.modules.payments": "Pagos",
    "service-providers.roles.role.modules.walletUsers": "Billeterahabientes",
    "service-providers.roles.role.modules.transactionsByUser":
      "Transacciones por Usuario",
    "service-providers.roles.role.modules.transactionsByProvider":
      "Transacciones por Periodo",
    "service-providers.roles.role.modules.revenue": "Ingresos",
    "service-providers.roles.role.modules.clearPayments": "Pagos",
    "service-providers.roles.role.modules.disputes": "Disputas",
    "service-providers.roles.role.modules.refunds": "Reembolsos",
    "service-providers.roles.role.modules.reservedFunds": "Fondos Reservados",
    "service-providers.roles.role.modules.fees": "Costos",
    "service-providers.roles.role.modules.paymentSummary": "Pagos",
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
      "Ingrese el Porcentaje",
    "service-providers.settings.fee.dialog.percent.error":
      "El Porcentaje es Requerido y Debe Ser un Número",
    "service-providers.settings.fee.dialog.commission.label": "Comisión",
    "service-providers.settings.fee.dialog.commission.placeholder":
      "Ingrese la Comisión",
    "service-providers.settings.fee.dialog.commission.error":
      "La Comisión es Requerida y Debe Ser un Número",
    "service-providers.settings.fee.dialog.base.label": "Base",
    "service-providers.settings.fee.dialog.base.placeholder": "Ingrese la Base",
    "service-providers.settings.fee.dialog.base.error":
      "La Base es Requerida y Debe Ser un número",
    "service-providers.settings.fee.dialog.primary-button": "Guardar",
    "service-providers.settings.fee.dialog.toast.success":
      "La Tarifa ha sido Establecida Satisfactoriamente",
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
      "Items por página:",
    "service-providers.settings.payment-parameters.table.items-count-separator":
      " de ",
    "service-providers.settings.payment-parameters.inactive-dialog.title":
      "Desactivar Parámetro de Pago",
    "service-providers.settings.payment-parameters.inactive-dialog.description":
      "Al Desactivar este Parámetro de Pago, Deshabilitará Funciones y Características de Pago Específicas. ¿Desea Continuar?",
    "service-providers.settings.payment-parameters.inactive-dialog.primary-button":
      "Sí",
    "service-providers.settings.payment-parameters.inactive-dialog.secondary-button":
      "No",
    "service-providers.settings.payment-parameters.inactive-dialog.toast.success":
      "El Parámetro de Pago ha sido Desactivado Satisfactoriamente.",
    "service-providers.settings.payment-parameters.activate-dialog.title":
      "Activar Parámetro de Pago",
    "service-providers.settings.payment-parameters.activate-dialog.description":
      "Al Activar este Parámetro de Pago, Habilitará Funciones y Características de Pago Específicas. ¿Desea Continuar?",
    "service-providers.settings.payment-parameters.activate-dialog.primary-button":
      "Sí",
    "service-providers.settings.payment-parameters.activate-dialog.secondary-button":
      "No",
    "service-providers.settings.payment-parameters.activate-dialog.toast.success":
      "El Parámetro de Pago ha Sido Activado Satisfactoriamente.",
    "service-providers.settings.payment-parameters.add-dialog.title":
      "Agregar Parámetro de Pago",
    "service-providers.settings.payment-parameters.add-dialog.name.label":
      "Nombre",
    "service-providers.settings.payment-parameters.add-dialog.name.placeholder":
      "Nombre del Parámetro",
    "service-providers.settings.payment-parameters.add-dialog.name.error":
      "El Nombre del Parámetro es requerido",
    "service-providers.settings.payment-parameters.add-dialog.cost.label":
      "Costo",
    "service-providers.settings.payment-parameters.add-dialog.cost.placeholder":
      "Costo",
    "service-providers.settings.payment-parameters.add-dialog.cost.error":
      "El Costo es Requerido",
    "service-providers.settings.payment-parameters.add-dialog.interval.label":
      "Intervalo",
    "service-providers.settings.payment-parameters.add-dialog.interval.placeholder":
      "Intervalo",
    "service-providers.settings.payment-parameters.add-dialog.interval.error":
      "Intervalo es Requerido",
    "service-providers.settings.payment-parameters.add-dialog.frequency.label":
      "Frecuencia",
    "service-providers.settings.payment-parameters.add-dialog.frequency.placeholder":
      "Frecuencia",
    "service-providers.settings.payment-parameters.add-dialog.frequency.error":
      "Frecuencia es Requerida",
    "service-providers.settings.payment-parameters.add-dialog.primary-button":
      "Guardar",
    "service-providers.settings.payment-parameters.add-dialog.toast.success":
      "El Parámetro de Pago ha sido Creado Satisfactoriamente",
    "service-providers.settings.payment-parameters.edit-dialog.title":
      "Editar Parámetro de Pago",
    "service-providers.settings.payment-parameters.edit-dialog.name.label":
      "Nombre",
    "service-providers.settings.payment-parameters.edit-dialog.name.placeholder":
      "Nombre del Parámetro",
    "service-providers.settings.payment-parameters.edit-dialog.name.error":
      "El Nombre del Parámetro es Requerido",
    "service-providers.settings.payment-parameters.edit-dialog.cost.label":
      "Costo",
    "service-providers.settings.payment-parameters.edit-dialog.cost.placeholder":
      "Costo",
    "service-providers.settings.payment-parameters.edit-dialog.cost.error":
      "El Costo es Requerido",
    "service-providers.settings.payment-parameters.edit-dialog.interval.label":
      "Intervalo",
    "service-providers.settings.payment-parameters.edit-dialog.interval.placeholder":
      "Intervalo",
    "service-providers.settings.payment-parameters.edit-dialog.interval.error":
      "Intervalo es Requerido",
    "service-providers.settings.payment-parameters.edit-dialog.frequency.label":
      "Frecuencia",
    "service-providers.settings.payment-parameters.edit-dialog.frequency.placeholder":
      "Frecuencia",
    "service-providers.settings.payment-parameters.edit-dialog.frequency.error":
      "Frecuencia es Requerida",
    "service-providers.settings.payment-parameters.edit-dialog.primary-button":
      "Guardar",
    "service-providers.settings.payment-parameters.edit-dialog.toast.success":
      "El Parámetro de Pago ha sido Editado Satisfactoriamente.",
    "service-providers.settings.exchange-rates.title": "Tasas de Cambio",
    "service-providers.settings.exchange-rates.table.header.currency": "Moneda",
    "service-providers.settings.exchange-rates.table.header.rate": "Tasa",
    "service-providers.settings.exchange-rates.table.header.valid-until":
      "Válido Hasta",
    "service-providers.transactions.title": "Transacciones",
    "service-providers.settings.sections.key": "Llaves",
    "service-providers.settings.key.dialog.title": "Llaves",
    "service-providers.settings.key.dialog.secretKey.label": "Llave Secreta: ",
    "service-providers.settings.key.dialog.publicKey.label": "Llave Pública: ",
    "service-providers.settings.key.dialog.no-key": "No Existe Llave",
    "service-providers.roles.role.modules.healthCheck": "Chequeo de Salud",
  },
} satisfies I18nDictionary;
