"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";

export const providersDict = {
  en: {
    "providers.title": "Service Providers",
    "providers.search.placeholder": "Search",
    "providers.card.view": "Name:",
    "providers.add-button": "Add Service Provider",
    "providers.add-dialog.title": "Add Service Provider",
    "providers.add-dialog.primary-button": "Create",
    "providers.edit-dialog.title": "Edit Service Provider",
    "providers.edit-dialog.primary-button": "Save",
    "dashboard.provider.inactive-dialog.title": "Inactivate Service Provider",
    "dashboard.provider.inactive-dialog.description":
      "By inactivating this Service Provider, you will revoke the Service Provider's access to certain system privileges. Do you want to proceed?",
    "dashboard.provider.inactive-dialog.primary-button": "Yes",
    "dashboard.provider.inactive-dialog.secondary-button": "No",
    "dashboard.provider.inactive-dialog.toast.success":
      "The Service Provider has been inactive successfully.",
    "dashboard.provider.activate-dialog.title": "Activate Service Provider",
    "dashboard.provider.activate-dialog.description":
      "By activating this Service Provider, you are granting the access to specific system privileges. Do you want to proceed?",
    "dashboard.provider.activate-dialog.primary-button": "Yes",
    "dashboard.provider.activate-dialog.secondary-button": "No",
    "dashboard.provider.activate-dialog.toast.success":
      "The Service Provider has been activated successfully.",
  },
  es: {
    "providers.title": "Proveedores de servicios",
    "providers.search.placeholder": "Buscar",
    "providers.card.view": "Nombre:",
    "providers.add-button": "Agregar Proveedor de Servicios",
    "providers.add-dialog.title": "Agregar Proveedor de Servicios",
    "providers.add-dialog.primary-button": "Crear",
    "providers.edit-dialog.title": "Editar Proveedor de Servicios",
    "providers.edit-dialog.primary-button": "Guardar",

    "dashboard.provider.inactive-dialog.title":
      "Inactivar Proveedor de Servicios",
    "dashboard.provider.inactive-dialog.description":
      "Inactivando este Proveedor de Servicios, quitaras los provilegios de acceso al sistema. ¿Desea proceder?",
    "dashboard.provider.inactive-dialog.primary-button": "Si",
    "dashboard.provider.inactive-dialog.secondary-button": "No",
    "dashboard.provider.inactive-dialog.toast.success":
      "El Proveedor de servicio ha sido inactivado satisfactoriamente.",
    "dashboard.provider.activate-dialog.title":
      "Activar Proveedor de Servicios",
    "dashboard.provider.activate-dialog.description":
      "Activando este Proveedor de Servicios, quitaras los provilegios de acceso al sistema. ¿Desea proceder?",
    "dashboard.provider.activate-dialog.primary-button": "Si",
    "dashboard.provider.activate-dialog.secondary-button": "No",
    "dashboard.provider.activate-dialog.toast.success":
      "El Proveedor de servicio ha sido activado satisfactoriamente.",
  },
} satisfies I18nDictionary;
