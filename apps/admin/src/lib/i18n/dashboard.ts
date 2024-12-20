"use client";

import type { I18nDictionary } from "@wg-frontend/i18n";

export const dashboardDict = {
  en: {
    "0": "No month selected",
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December",
    "dashboard.home.title": "Welcome",
    "dashboard.layout.nav.home": "Home",
    "dashboard.layout.nav.wallet-management": "Wallet Management",
    "dashboard.layout.nav.service-providers": "Service Providers",
    "dashboard.layout.nav.users": "Users",
    "dashboard.layout.nav.roles": "Roles",
    "dashboard.layout.nav.settings": "Settings",
    "dashboard.layout.nav.reports": "Reports",
    "dashboard.layout.nav.health": "Health Check",
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
      "Phone has been Changed Succesfully",
    "dashboard.layout.profile-dialog.my-info.picture.label":
      "Drop or Upload your picture",
    "dashboard.layout.profile-dialog.my-info.picture.button": "Choose a File",
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
      "The Role has been Edited Successfully.",
    "dashboard.roles.inactive-dialog.title": "Deactivate Role",
    "dashboard.roles.inactive-dialog.description.first": "Deactiviting ",
    "dashboard.roles.inactive-dialog.description.second":
      " Role, will Remove their Access to all System Resources. Proceed?",
    "dashboard.roles.inactive-dialog.primary-button": "Yes",
    "dashboard.roles.inactive-dialog.secondary-button": "No",
    "dashboard.roles.inactive-dialog.toast.success":
      "The Role has been Deactivated Successfully.",
    "dashboard.roles.activate-dialog.title": "Activate Role",
    "dashboard.roles.activate-dialog.description.first": "By Activating ",
    "dashboard.roles.activate-dialog.description.second":
      " Role, you are Granting them System Privileges. Proceed?",
    "dashboard.roles.activate-dialog.primary-button": "Yes",
    "dashboard.roles.activate-dialog.secondary-button": "No",
    "dashboard.roles.activate-dialog.toast.success":
      "The Role has been Activated Successfully.",
    "dashboard.roles.table.header.role": "Roles",
    "dashboard.roles.table.header.is-active": "Active",
    "dashboard.roles.table.header.actions": "Actions",
    "dashboard.roles.table.actions.edit": "Edit",
    "dashboard.roles.table.actions.access": "Access",
    "dashboard.roles.table.items-label": "Items per Page:",
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
    "dashboard.roles.role.modules.disputes": "Disputes",
    "dashboard.roles.role.modules.refunds": "Refunds",
    "dashboard.roles.role.modules.reservedFunds": "Reserved Funds",
    "dashboard.roles.role.modules.fees": "Fees",
    "dashboard.roles.role.modules.paymentSummary": "Clear Payments",
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
    "dashboard.users.add-dialog.first-name.placeholder": "Enter the Name",
    "dashboard.users.add-dialog.first-name.error": "First Name is Required",
    "dashboard.users.add-dialog.last-name.label": "Last Name",
    "dashboard.users.add-dialog.last-name.placeholder": "Enter the Last Name",
    "dashboard.users.add-dialog.last-name.error": "Last Name is Required",
    "dashboard.users.add-dialog.email.label": "Email",
    "dashboard.users.add-dialog.email.placeholder": "Enter the Email",
    "dashboard.users.add-dialog.email.error":
      "Email is Required and Must be a Valid Email",
    "dashboard.users.add-dialog.phone.label": "Phone Number",
    "dashboard.users.add-dialog.phone.code-placeholder": "+00",
    "dashboard.users.add-dialog.phone.phone-placeholder":
      "Enter the Phone Number",
    "dashboard.users.add-dialog.phone.error": "Phone Number is Invalid",
    "dashboard.users.add-dialog.role.label": "Role",
    "dashboard.users.add-dialog.role.placeholder": "Select Role",
    "dashboard.users.add-dialog.role.error": "Role is Required",
    "dashboard.users.add-dialog.primary-button": "Save",
    "dashboard.users.add-dialog.toast.success":
      "A Confirmation Email has Been Sent to the User with the Assigned Password.",
    "dashboard.users.edit-dialog.title": "Edit User",
    "dashboard.users.edit-dialog.first-name.label": "First Name",
    "dashboard.users.edit-dialog.first-name.placeholder": "Enter the Name",
    "dashboard.users.edit-dialog.first-name.error": "First Name is Required",
    "dashboard.users.edit-dialog.last-name.label": "Last Name",
    "dashboard.users.edit-dialog.last-name.placeholder": "Enter the Last Name",
    "dashboard.users.edit-dialog.last-name.error": "Last Name is Required",
    "dashboard.users.edit-dialog.email.label": "Email",
    "dashboard.users.edit-dialog.email.placeholder": "Enter the Email",
    "dashboard.users.edit-dialog.email.error":
      "Email is Required and Must Be a Valid Email",
    "dashboard.users.edit-dialog.phone.label": "Phone Number",
    "dashboard.users.edit-dialog.phone.code-placeholder": "+00",
    "dashboard.users.edit-dialog.phone.phone-placeholder":
      "Enter the Phone Number",
    "dashboard.users.edit-dialog.phone.error": "Phone Number is Invalid",
    "dashboard.users.edit-dialog.role.label": "Role",
    "dashboard.users.edit-dialog.role.placeholder": "Select Role",
    "dashboard.users.edit-dialog.role.error": "Role is Required",
    "dashboard.users.edit-dialog.primary-button": "Save",
    "dashboard.users.edit-dialog.toast.success":
      "The User has Been Edited Successfully.",
    "dashboard.users.inactive-dialog.title": "Deactivate User",
    "dashboard.users.inactive-dialog.description":
      "By Inactivating this User, you will Revoke the User's Access to Certain System Privileges. Do you Want to Proceed?",
    "dashboard.users.inactive-dialog.primary-button": "Yes",
    "dashboard.users.inactive-dialog.secondary-button": "No",
    "dashboard.users.inactive-dialog.toast.success":
      "The User has Been Deactivated Successfully.",
    "dashboard.users.activate-dialog.title": "Activate User",
    "dashboard.users.activate-dialog.description":
      "By Activating this User, You are Granting the User Access to Specific System Privileges. Do you Want to Proceed?",
    "dashboard.users.activate-dialog.primary-button": "Yes",
    "dashboard.users.activate-dialog.secondary-button": "No",
    "dashboard.users.activate-dialog.toast.success":
      "The User has Been Activated Successfully.",
    "dashboard.users.table.header.first-name": "First Name",
    "dashboard.users.table.header.last-name": "Last Name",
    "dashboard.users.table.header.email": "Email",
    "dashboard.users.table.header.phone": "Phone",
    "dashboard.users.table.header.role": "Role",
    "dashboard.users.table.header.is-active": "Active",
    "dashboard.users.table.header.actions": "Actions",
    "dashboard.users.table.actions.edit": "Edit",
    "dashboard.users.table.items-label": "Items per page:",
    "dashboard.users.table.items-count-separator": " of ",
    "dashboard.health.title": "Health Check",
    "dashboard.health.service": "Service",
    "dashboard.health.status": "Status",
    "dashboard.wallet-management.title": "Registered Wallets",
    "dashboard.wallet-management.search.placeholder": "Search",
    "dashboard.wallet-management.add-button": "Add New Wallet",
    "dashboard.wallet-management.add-dialog.title": "Create a New Wallet",
    "dashboard.wallet-management.add-dialog.name.label": "Name",
    "dashboard.wallet-management.add-dialog.name.placeholder": "Wallet Name",
    "dashboard.wallet-management.add-dialog.name.error":
      "Wallet Name is Required",
    "dashboard.wallet-management.add-dialog.type.label": "Wallet Type",
    "dashboard.wallet-management.add-dialog.type.placeholder": "Wallet Type",
    "dashboard.wallet-management.add-dialog.type.error":
      "Wallet Type is Required",
    "dashboard.wallet-management.add-dialog.address.label": "Wallet Address",
    "dashboard.wallet-management.add-dialog.address.placeholder":
      "Wallet Address",
    "dashboard.wallet-management.add-dialog.address.error":
      "Wallet Address Must be a Valid URL",
    "dashboard.wallet-management.add-dialog.primary-button": "Create",
    "dashboard.wallet-management.add-dialog.toast.success":
      "The Wallet was Successfully Created",
    "dashboard.wallet-management.edit-dialog.title": "Edit Wallet",
    "dashboard.wallet-management.edit-dialog.name.label": "Name",
    "dashboard.wallet-management.edit-dialog.name.placeholder": "Wallet Name",
    "dashboard.wallet-management.edit-dialog.name.error":
      "Wallet Name is Required",
    "dashboard.wallet-management.edit-dialog.type.label": "Wallet Type",
    "dashboard.wallet-management.edit-dialog.type.placeholder": "Wallet Type",
    "dashboard.wallet-management.edit-dialog.type.error":
      "Wallet Type is Required",
    "dashboard.wallet-management.edit-dialog.address.label": "Wallet Address",
    "dashboard.wallet-management.edit-dialog.address.placeholder":
      "Wallet Address",
    "dashboard.wallet-management.edit-dialog.address.error":
      "Wallet Address Must be a Valid URL",
    "dashboard.wallet-management.edit-dialog.primary-button": "Save",
    "dashboard.wallet-management.edit-dialog.toast.success":
      "The Wallet was Successfully Edited",
    "dashboard.wallet-management.inactive-dialog.title": "Deactivate Wallet",
    "dashboard.wallet-management.inactive-dialog.description":
      "Are you Sure you Want to Proceed?",
    "dashboard.wallet-management.inactive-dialog.primary-button": "Yes",
    "dashboard.wallet-management.inactive-dialog.secondary-button": "No",
    "dashboard.wallet-management.inactive-dialog.toast.success":
      "The Wallet has Been Deactivated Successfully.",
    "dashboard.wallet-management.activate-dialog.title": "Activate Wallet",
    "dashboard.wallet-management.activate-dialog.description":
      "Activating the Wallet will Restore Transactions and Access. Do you Want to Proceed?",
    "dashboard.wallet-management.activate-dialog.primary-button": "Yes",
    "dashboard.wallet-management.activate-dialog.secondary-button": "No",
    "dashboard.wallet-management.activate-dialog.toast.success":
      "The Wallet has Been Activated Successfully.",
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
      "Terms and Conditions Link",
    "dashboard.settings.terms-and-conditions.placeholder":
      "www.walletguru.com/terms-and-conditions",
    "dashboard.settings.terms-and-conditions.error": "URL is Invalid",
    "dashboard.settings.privacy-policy.title": "Privacy Policy",
    "dashboard.settings.privacy-policy.label": "Privacy Policy Link",
    "dashboard.settings.privacy-policy.placeholder":
      "www.walletguru.com/privacy-policy",
    "dashboard.settings.privacy-policy.error": "URL is Invalid",
    "dashboard.settings.privacy-policy.save": "Save",
    "dashboard.settings.wallet-root.title": "Wallet Root",
    "dashboard.settings.wallet-root.label": "Wallet Root Link",
    "dashboard.settings.wallet-root.placeholder":
      "www.walletguru.com/wallet-root",
    "dashboard.settings.wallet-root.information.label":
      "Please note that it is necessary to modify the environment variable in the environment. The current wallets will not change their URL.",
    "dashboard.settings.wallet-root.error": "URL is Invalid",
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
      "Enter your New Password",
    "dashboard.change-password.form.new-password.error":
      "The New Password you Entered Doesn't Meet our Requirements. Please try a Different One.",
    "dashboard.change-password.form.confirm-password.label": "Confirm Password",
    "dashboard.change-password.form.confirm-password.placeholder":
      "Confirm your New Password",
    "dashboard.change-password.form.confirm-password.error":
      "The password you Entered Doesn't Match",
    "dashboard.change-password.information-label":
      "Enter a strong password of up to 20 characters, including at least one number, uppercase, lowercase, and special character.",
    "dashboard.change-password.primary-button": "Save",
    "dashboard.change-password.toast.success":
      "Your Password has Been Successfully Updated!",
    "dashboard.settings.term-conditions.dialog.toast.success":
      "The Terms and Conditions have Been Updated Successfully.",
    "dashboard.settings.privacy-policy.dialog.toast.success":
      "The Privacy Policy has Been Updated Successfully.",
    "dashboard.settings.wallet-root.dialog.toast.success":
      "The Wallet Address have Been Updated Successfully.",
    "dashboard.reports.title": "Reports",
    "dashboard.reports.sections.transactions-by-user": "Transactions by User",
    "dashboard.reports.sections.transactions-by-provider":
      "Transactions by Period",
    "dashboard.reports.sections.revenue": "Revenue",
    "dashboard.reports.sections.fee": "Fees",
    "dashboard.reports.sections.disputes": "Disputes",
    "dashboard.reports.sections.refunds": "Refunds",
    "dashboard.reports.sections.clear-payments": "Clear Payments",
    "dashboard.reports.sections.reservedFunds": "Reserved Funds",
    "dashboard.reports.sections.paymentSummary": "Payment Summary",
    "dashboard.wallet-users.title": "Management Wallet Users",
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
    "dashboard.wallet-users.tooltip.invalid": "KYC Not Verified",
    "dashboard.wallet-users.state": "Unknown Status",
    "dashboard.wallet-users.state0": "Account Created",
    "dashboard.wallet-users.state1": "Email Verified",
    "dashboard.wallet-users.state2": "KYC Verified",
    "dashboard.wallet-users.state3": "Profile Completed",
    "dashboard.wallet-users.state4": "Wallet Created",
    "dashboard.wallet-users.state5": "KYC No Verified",
    "dashboard.wallet-users.locked-wallet": "Locked Wallet",
    "dashboard.wallet-users.active-wallet": "Active Wallet",
    "dashboard.wallet-users.no-wallet": "No Wallet",
    "dashboard.wallet-users.select-state": "Select Status",
    "dashboard.wallet-users.select-wallet": "Select Wallet",
    "dashboard.wallet-users.search.placeholder": "Search by Name",
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
      "Enter the Wallet Address",
    "dashboard.reports.sections-transactions-by-user.search.wallet-address.error":
      "Enter a Valid Wallet Address",
    "dashboard.reports.sections-transactions-by-user.search.wallet-address.label":
      "Wallet Address",
    "dashboard.reports.sections-transactions-by-user.search.period.placeholder":
      "Select a Range of Time",
    "dashboard.reports.sections-transactions-by-user.search.period.error":
      "Enter a valid period",
    "dashboard.reports.sections-transactions-by-user.search.start-date.label":
      "Start Date",
    "dashboard.reports.sections-transactions-by-user.search.end-date.label":
      "End Date",
    "dashboard.reports.sections-transactions-by-user.search.type.placeholder":
      "Select a Type",
    "dashboard.reports.sections-transactions-by-user.search.type.error":
      "Enter a valid Type",
    "dashboard.reports.sections-transactions-by-user.search.type.label": "Type",
    "dashboard.reports.sections-transactions-by-user.search.state.placeholder":
      "Select a Status",
    "dashboard.reports.sections-transactions-by-user.search.state.pending":
      "Pending",
    "dashboard.reports.sections-transactions-by-user.search.state.completed":
      "Completed",
    "dashboard.reports.sections-transactions-by-user.search.state.error":
      "Enter a Valid State",
    "dashboard.reports.sections-transactions-by-user.search.state.label":
      "Status",
    "dashboard.reports.sections-transactions-by-user.search.provider.placeholder":
      "Select a Provider",
    "dashboard.reports.sections-transactions-by-user.search.provider.error":
      "Enter a Valid provider",
    "dashboard.reports.sections-transactions-by-user.search.provider.label":
      "Provider",
    "dashboard.reports.sections-transactions-by-user.user.label": "User",
    "dashboard.reports.sections-transactions-by-user.period.no-wallet-selected":
      "No Wallet Address Selected",
    "dashboard.reports.sections-transactions-by-user.period.label": "Period",
    "dashboard.reports.sections-transactions-by-user.period.no-start-selected":
      "No Start Date Selected",
    "dashboard.reports.sections-transactions-by-user.period.no-end-selected":
      "No End Date Selected",
    "dashboard.reports.sections-transactions-by-user.download.success":
      "The Report has Been Downloaded Successfully.",
    "dashboard.wallet-users.inactive-dialog.title": "Deactivate User",
    "dashboard.wallet-users.inactive-dialog.description":
      "By Deactivating this User, you will Revoke the User's Access to Certain System Privileges.\n Do you Want to Proceed?",
    "dashboard.wallet-users.inactive-dialog.primary-button": "Yes",
    "dashboard.wallet-users.inactive-dialog.secondary-button": "No",
    "dashboard.wallet-users.inactive-dialog.toast.success":
      "The User has Been Deactivated Successfully.",
    "dashboard.wallet-users.activate-dialog.title": "Activate User",
    "dashboard.wallet-users.activate-dialog.description":
      "By Activating this User, you are Granting the User Access to Specific System Privileges.\n Do you Want to Proceed?",
    "dashboard.wallet-users.activate-dialog.primary-button": "Yes",
    "dashboard.wallet-users.activate-dialog.secondary-button": "No",
    "dashboard.wallet-users.activate-dialog.toast.success":
      "The User has Been Activated Successfully.",
    "dashboard.reports.sections.transactions-by-provider.header.actions.details":
      "Details",
    "dashboard.reports.sections.transactions-by-provider.header.user": "User",
    "dashboard.reports.sections.transactions-by-provider.header.provider":
      "Provider",
    "dashboard.reports.sections.transactions-by-provider.header.gross-sale":
      "Gross Sale",
    "dashboard.reports.sections.transactions-by-provider.header.net-sale":
      "Net Sale",
    "dashboard.reports.sections.transactions-by-provider.header.fee": "Fee",
    "dashboard.reports.sections.transactions-by-provider.header.start":
      "Start Date",
    "dashboard.reports.sections.transactions-by-provider.header.finish":
      "End Date",
    "dashboard.reports.sections.transactions-by-provider.header.actions":
      "Actions",
    "dashboard.reports.sections-transactions-by-provider.download.success":
      "The Report has Been Downloaded Successfully.",
    "dashboard.reports.sections-transactions-by-provider.search.provider.label":
      "Provider",
    "dashboard.reports.sections-transactions-by-provider.search.provider.placeholder":
      "Select a Provider",
    "dashboard.reports.sections.transactions-by-provider.search-button":
      "Search",
    "dashboard.reports.sections-transactions-by-provider.search.end-date.label":
      "End Date",
    "dashboard.reports.sections-transactions-by-provider.search.end-date.placeholder":
      "yyyy-mm-dd",
    "dashboard.reports.sections-transactions-by-provider.search.start-date.label":
      "Start Date",
    "dashboard.reports.sections-transactions-by-provider.search.start-date.placeholder":
      "yyyy-mm-dd",
    "dashboard.reports.sections.transactions-by-provider.details.header":
      "Detail Transactions by Period",
    "dashboard.reports.sections.transactions-by-provider.details.date": "Date",
    "dashboard.dispute.button.details": "Dispute",
    "dashboard.refund.button.details": "Refund",
    "dashboard.roles.role.modules.healthCheck": "Health Check",
    "dashboard.reports.sections.reserved-funds-by-user.header.type": "Type",
    "dashboard.reports.sections.reserved-funds-by-user.header.description":
      "Description",
    "dashboard.reports.sections.reserved-funds-by-user.header.start":
      "Start Date",
    "dashboard.reports.sections.reserved-funds-by-user.header.finish":
      "End Date",
    "dashboard.reports.sections.reserved-funds-by-user.header.state": "Status",
    "dashboard.reports.sections.reserved-funds-by-user.header.actions":
      "Actions",
    "dashboard.reports.sections.reserved-funds-by-user.header.actions.details":
      "Details",
    "dashboard.reports.sections.reserved-funds-by-user.details.header":
      "Details Transaction Service",
    "dashboard.reports.sections.reserved-funds-by-user.details.date": "Date",
    "dashboard.reports.sections.reserved-funds-by-user.search-button": "Search",
    "dashboard.reports.sections.reserved-funds-by-user.header.ammount":
      "Amount",
    "dashboard.reports.sections-reserved-funds-by-user.search.wallet-address.placeholder":
      "Enter the Wallet Address",
    "dashboard.reports.sections-reserved-funds-by-user.search.wallet-address.error":
      "Enter a Valid Wallet Address",
    "dashboard.reports.sections-reserved-funds-by-user.search.wallet-address.label":
      "Wallet Address",
    "dashboard.reports.sections-reserved-funds-by-user.search.period.placeholder":
      "Select a Range of Time",
    "dashboard.reports.sections-reserved-funds-by-user.search.period.error":
      "Enter a Valid Period",
    "dashboard.reports.sections-reserved-funds-by-user.search.start-date.label":
      "Start Date",
    "dashboard.reports.sections-reserved-funds-by-user.search.end-date.label":
      "End Date",
    "dashboard.reports.sections-reserved-funds-by-user.search.type.placeholder":
      "Select a Type",
    "dashboard.reports.sections-reserved-funds-by-user.search.type.error":
      "Enter a Valid Type",
    "dashboard.reports.sections-reserved-funds-by-user.search.type.label":
      "Type",
    "dashboard.reports.sections-reserved-funds-by-user.search.state.placeholder":
      "Select a Status",
    "dashboard.reports.sections-reserved-funds-by-user.search.state.pending":
      "Pending",
    "dashboard.reports.sections-reserved-funds-by-user.search.state.completed":
      "Completed",
    "dashboard.reports.sections-reserved-funds-by-user.search.state.error":
      "Enter a Valid State",
    "dashboard.reports.sections-reserved-funds-by-user.search.state.label":
      "Status",
    "dashboard.reports.sections-reserved-funds-by-user.search.provider.placeholder":
      "Select a Provider",
    "dashboard.reports.sections-reserved-funds-by-user.search.provider.error":
      "Enter a Valid Provider",
    "dashboard.reports.sections-reserved-funds-by-user.search.provider.label":
      "Provider",
    "dashboard.reports.sections-reserved-funds-by-user.user.label": "User",
    "dashboard.reports.sections-reserved-funds-by-user.period.no-wallet-selected":
      "No Wallet Address Selected",
    "dashboard.reports.sections-reserved-funds-by-user.period.label": "Period",
    "dashboard.reports.sections-reserved-funds-by-user.period.no-start-selected":
      "No Start Date Selected",
    "dashboard.reports.sections-reserved-funds-by-user.period.no-end-selected":
      "No End Date Selected",
    "dashboard.reports.sections-reserved-funds-by-user.download.success":
      "The Report has Been Downloaded Successfully.",
    "dashboard.reports.sections.clear-payments.header.date": "Date",
    "dashboard.reports.sections.clear-payments.header.description":
      "Description",
    "dashboard.reports.sections.clear-payments.header.type": "Type",
    "dashboard.reports.sections.clear-payments.header.user": "Wallet",
    "dashboard.reports.sections.clear-payments.header.month": "Month",
    "dashboard.reports.sections.clear-payments.header.reference":
      "Reference Number",
    "dashboard.reports.sections.clear-payments.header.notes": "Notes",
    "dashboard.reports.sections.clear-payments.header.observation":
      "Observation",

    "dashboard.reports.sections.clear-payments.header.provider": "Provider",
    "dashboard.reports.sections.clear-payments.header.transactions":
      "Transactions",
    "dashboard.reports.sections.clear-payments.header.fees": "Fees",
    "dashboard.reports.sections.clear-payments.header.amount": "Amount",
    "dashboard.reports.sections.clear-payments.header.status": "Status",
    "dashboard.reports.sections.clear-payments.header.actions.details":
      "Details",
    "dashboard.reports.sections.clear-payments.details.header":
      "Details Clear Payments",
    "dashboard.reports.sections.clear-payments.details.date": "Date",
    "dashboard.reports.sections.clear-payments.search-button": "Search",
    "dashboard.reports.sections.clear-payments.header.ammount": "Amount",
    "dashboard.reports.sections-clear-payments.search.wallet-address.placeholder":
      "Enter the Wallet Address",
    "dashboard.reports.sections-clear-payments.search.wallet-address.error":
      "Enter a Valid Wallet Address",
    "dashboard.reports.sections-clear-payments.search.wallet-address.label":
      "Wallet Address",
    "dashboard.reports.sections-clear-payments.search.period.placeholder":
      "Select a Range of Time",
    "dashboard.reports.sections-clear-payments.search.period.error":
      "Enter a Valid Period",
    "dashboard.reports.sections-clear-payments.search.start-date.label":
      "Start Date",
    "dashboard.reports.sections-clear-payments.search.end-date.label":
      "End Date",
    "dashboard.reports.sections-clear-paymentsr.search.month.placeholder":
      "Select a Month",
    "dashboard.reports.sections-clear-payments.search.month.error":
      "Enter a Valid Month",
    "dashboard.reports.sections-clear-payments.search.month.label": "Month",
    "dashboard.reports.sections-clear-payments.search.year.label": "Year",
    "dashboard.reports.sections-clear-payments.search.state.placeholder":
      "Select a Status",
    "dashboard.reports.sections-clear-payments.search.state.all": "All",
    "dashboard.reports.sections-clear-payments.search.state.pending":
      "Clear Payment",
    "dashboard.reports.sections-clear-payments.search.state.completed":
      "Cleared",
    "dashboard.reports.sections-clear-payments.search.state.error":
      "Enter a Valid State",
    "dashboard.reports.sections-clear-payments.search.state.label": "Status",
    "dashboard.reports.sections-clear-payments.search.provider.placeholder":
      "Select a Provider",
    "dashboard.reports.sections-clear-payments.search.provider.error":
      "Enter a Valid Provider",
    "dashboard.reports.sections-clear-payments.search.provider.label":
      "Provider",
    "dashboard.reports.sections-clear-payments.user.label": "User",
    "dashboard.reports.sections-clear-payments.period.no-wallet-selected":
      "No Wallet Address Selected",
    "dashboard.reports.sections-clear-payments.period.label": "Period",
    "dashboard.reports.sections-clear-payments.period.no-start-selected":
      "No Start Date Selected",
    "dashboard.reports.sections-clear-payments.period.no-end-selected":
      "No End Date Selected",
    "dashboard.reports.sections-clear-payments.download.success":
      "The Report has Been Downloaded Successfully.",
  },
  es: {
    "0": "Mes no seleccionado",
    "1": "Enero",
    "2": "Febrero",
    "3": "Marzo",
    "4": "Abril",
    "5": "Mayo",
    "6": "Junio",
    "7": "Julio",
    "8": "Agosto",
    "9": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre",
    "dashboard.home.title": "Bienvenido",
    "dashboard.layout.nav.home": "Inicio",
    "dashboard.layout.nav.wallet-management": "Billeteras",
    "dashboard.layout.nav.service-providers": "Proveedores de Servicio",
    "dashboard.layout.nav.users": "Usuarios",
    "dashboard.layout.nav.roles": "Roles",
    "dashboard.layout.nav.settings": "Configurar",
    "dashboard.layout.nav.reports": "Reportes",
    "dashboard.layout.nav.health": "Chequeo de Salud",
    "dashboard.layout.nav.wallet-users": "Billeterahabientes",
    "dashboard.layout.logout": "Cerrar Sesión",
    "dashboard.layout.profile-dialog.option.my-info": "Mi Información",
    "dashboard.layout.profile-dialog.option.change-password":
      "Cambiar Contraseña",
    "dashboard.layout.profile-dialog.option.logout": "Cerrar Sesión",
    "dashboard.layout.profile-dialog.my-info.title": "Mi Información",
    "dashboard.layout.profile-dialog.my-info.email.label": "Correo",
    "dashboard.layout.profile-dialog.my-info.phone.label": "Teléfono",
    "dashboard.layout.profile-dialog.my-info.save": "Guardar",
    "dashboard.layout.profile-dialog.my-info.toast.success":
      "El Número de Teléfono ha sido Cambiado Correctamente",
    "dashboard.layout.profile-dialog.my-info.picture.label":
      "Arrastre o Suba su foto",
    "dashboard.layout.profile-dialog.my-info.picture.button":
      "Elija un Archivo",
    "dashboard.roles.title": "Roles",
    "dashboard.roles.search.placeholder": "Buscar",
    "dashboard.roles.add-button": "Crear Rol",
    "dashboard.roles.add-dialog.title": "Crear Rol",
    "dashboard.roles.add-dialog.name.label": "Nombre",
    "dashboard.roles.add-dialog.name.placeholder": "Nombre del Rol",
    "dashboard.roles.add-dialog.name.error":
      "El Nombre del Rol no puede Contener Números y debe Tener Menos de 20 Caracteres",
    "dashboard.roles.add-dialog.description.label": "Descripción",
    "dashboard.roles.add-dialog.description.placeholder": "",
    "dashboard.roles.add-dialog.description.error":
      "El Nombre del Rol no puede Contener Números y debe Tener Menos de 50 Caracteres",
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
      "El Rol se ha Editado Exitosamente.",
    "dashboard.roles.inactive-dialog.title": "Desactivar Rol",
    "dashboard.roles.inactive-dialog.description.first": "Al Desactivar Rol ",
    "dashboard.roles.inactive-dialog.description.second":
      " se le Quitará el Acceso a todos los Recursos del Sistema. ¿Desea Continuar?",
    "dashboard.roles.inactive-dialog.primary-button": "Sí",
    "dashboard.roles.inactive-dialog.secondary-button": "No",
    "dashboard.roles.inactive-dialog.toast.success":
      "El Rol se ha Desactivado Exitosamente.",
    "dashboard.roles.activate-dialog.title": "Activar Rol",
    "dashboard.roles.activate-dialog.description.first": "Al activar Rol ",
    "dashboard.roles.activate-dialog.description.second":
      " se le Otorgarán Privilegios en el Sistema. ¿Desea Continuar?",
    "dashboard.roles.activate-dialog.primary-button": "Sí",
    "dashboard.roles.activate-dialog.secondary-button": "No",
    "dashboard.roles.activate-dialog.toast.success":
      "El Rol se ha Activado Exitosamente.",
    "dashboard.roles.table.header.role": "Roles",
    "dashboard.roles.table.header.is-active": "Activo",
    "dashboard.roles.table.header.actions": "Acciones",
    "dashboard.roles.table.actions.edit": "Editar",
    "dashboard.roles.table.actions.access": "Acceder",
    "dashboard.roles.table.items-label": "Items por página:",
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
      "Transacciones por Periodo",
    "dashboard.roles.role.modules.revenue": "Ingresos",
    "dashboard.roles.role.modules.clearPayments": "Pagos",
    "dashboard.roles.role.modules.reservedFunds": "Fondos Reservados",
    "dashboard.roles.role.modules.disputes": "Disputas",
    "dashboard.roles.role.modules.refunds": "Reembolsos",
    "dashboard.roles.role.modules.fees": "Costos",
    "dashboard.roles.role.modules.paymentSummary": "Pagos Recibidos",
    "dashboard.reports.sections.paymentSummary": "Pagos Recibidos",
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
    "dashboard.users.add-dialog.first-name.placeholder": "Ingrese el Nombre",
    "dashboard.users.add-dialog.first-name.error": "Nombre es Requerido",
    "dashboard.users.add-dialog.last-name.label": "Apellido",
    "dashboard.users.add-dialog.last-name.placeholder": "Ingrese el Apellido",
    "dashboard.users.add-dialog.last-name.error": "Apellido es Rrequerido",
    "dashboard.users.add-dialog.email.label": "Correo",
    "dashboard.users.add-dialog.email.placeholder": "Ingrese el Correo",
    "dashboard.users.add-dialog.email.error":
      "Correo es Requerido y Debe Ser un Correo Válido",
    "dashboard.users.add-dialog.phone.label": "Número de Teléfono",
    "dashboard.users.add-dialog.phone.code-placeholder": "+00",
    "dashboard.users.add-dialog.phone.phone-placeholder":
      "Ingrese su Número de Teléfono",
    "dashboard.users.add-dialog.phone.error": "Número de Teléfono es Invalido",
    "dashboard.users.add-dialog.role.label": "Rol",
    "dashboard.users.add-dialog.role.placeholder": "Seleccionar Rol",
    "dashboard.users.add-dialog.role.error": "Rol es Requerido",
    "dashboard.users.add-dialog.primary-button": "Guardar",
    "dashboard.users.add-dialog.toast.success":
      "Se ha Enviado un Correo de Confirmación al Usuario con la Contraseña Asignada.",
    "dashboard.users.edit-dialog.title": "Editar Usuario",
    "dashboard.users.edit-dialog.first-name.label": "Nombre",
    "dashboard.users.edit-dialog.first-name.placeholder": "Ingrese el Nombre",
    "dashboard.users.edit-dialog.first-name.error": "Nombre es Requerido",
    "dashboard.users.edit-dialog.last-name.label": "Apellido",
    "dashboard.users.edit-dialog.last-name.placeholder": "Ingrese el Aapellido",
    "dashboard.users.edit-dialog.last-name.error": "Apellido es Requerido",
    "dashboard.users.edit-dialog.email.label": "Correo",
    "dashboard.users.edit-dialog.email.placeholder": "Ingrese el correo",
    "dashboard.users.edit-dialog.email.error":
      "Correo es Requerido y debe Ser un Correo Válido",
    "dashboard.users.edit-dialog.phone.label": "Número de Teléfono",
    "dashboard.users.edit-dialog.phone.code-placeholder": "+00",
    "dashboard.users.edit-dialog.phone.phone-placeholder":
      "Ingrese su Número de Teléfono",
    "dashboard.users.edit-dialog.phone.error": "Número de Teléfono es Invalido",
    "dashboard.users.edit-dialog.role.label": "Rol",
    "dashboard.users.edit-dialog.role.placeholder": "Seleccionar Rol",
    "dashboard.users.edit-dialog.role.error": "Rol es Requerido",
    "dashboard.users.edit-dialog.primary-button": "Guardar",
    "dashboard.users.edit-dialog.toast.success":
      "El Usuario se ha Editado Exitosamente.",
    "dashboard.users.inactive-dialog.title": "Desactivar Usuario",
    "dashboard.users.inactive-dialog.description":
      "Al Desactivar este Usuario, Revocará el Acceso del Usuario a Ciertos Privilegios del Sistema. ¿Desea Continuar?",
    "dashboard.users.inactive-dialog.primary-button": "Sí",
    "dashboard.users.inactive-dialog.secondary-button": "No",
    "dashboard.users.inactive-dialog.toast.success":
      "El Usuario se ha Desactivado Exitosamente.",
    "dashboard.users.activate-dialog.title": "Activar Usuario",
    "dashboard.users.activate-dialog.description":
      "Al Activar este Usuario, le está Otorgando al Usuario Acceso a Privilegios Específicos del Sistema. ¿Desea Continuar?",
    "dashboard.users.activate-dialog.primary-button": "Sí",
    "dashboard.users.activate-dialog.secondary-button": "No",
    "dashboard.users.activate-dialog.toast.success":
      "El Usuario se ha Activado Exitosamente.",
    "dashboard.users.table.header.first-name": "Nombre",
    "dashboard.users.table.header.last-name": "Apellido",
    "dashboard.users.table.header.email": "Correo",
    "dashboard.users.table.header.phone": "Teléfono",
    "dashboard.users.table.header.role": "Rol",
    "dashboard.users.table.header.is-active": "Activo",
    "dashboard.users.table.header.actions": "Acciones",
    "dashboard.users.table.actions.edit": "Editar",
    "dashboard.users.table.items-label": "Items por página:",
    "dashboard.users.table.items-count-separator": " de ",
    "dashboard.health.title": "Chequeo de Salud",
    "dashboard.health.service": "Servicio",
    "dashboard.health.status": "Estado",
    "dashboard.wallet-management.title": "Billeteras Registradas",
    "dashboard.wallet-management.search.placeholder": "Buscar",
    "dashboard.wallet-management.add-button": "Agregar Nueva Billetera",
    "dashboard.wallet-management.add-dialog.title": "Crear una Nueva Billetera",
    "dashboard.wallet-management.add-dialog.name.label": "Nombre",
    "dashboard.wallet-management.add-dialog.name.placeholder":
      "Nombre de la Billetera",
    "dashboard.wallet-management.add-dialog.name.error":
      "Nombre de la Billetera es Requerido",
    "dashboard.wallet-management.add-dialog.type.label": "Tipo de Billetera",
    "dashboard.wallet-management.add-dialog.type.placeholder":
      "Tipo de Billetera",
    "dashboard.wallet-management.add-dialog.type.error":
      "Tipo de Billetera es Requerido",
    "dashboard.wallet-management.add-dialog.address.label":
      "Dirección de la Billetera",
    "dashboard.wallet-management.add-dialog.address.placeholder":
      "Dirección de la Billetera",
    "dashboard.wallet-management.add-dialog.address.error":
      "Dirección de la Billetera debe Ser una URL Válida",
    "dashboard.wallet-management.add-dialog.primary-button": "Crear",
    "dashboard.wallet-management.add-dialog.toast.success":
      "La Billetera se ha Creado Exitosamente",
    "dashboard.wallet-management.edit-dialog.title": "Editar Billetera",
    "dashboard.wallet-management.edit-dialog.name.label": "Nombre",
    "dashboard.wallet-management.edit-dialog.name.placeholder":
      "Nombre de la Billetera",
    "dashboard.wallet-management.edit-dialog.name.error":
      "Nombre de la Billetera es Requerido",
    "dashboard.wallet-management.edit-dialog.type.label": "Tipo de Billetera",
    "dashboard.wallet-management.edit-dialog.type.placeholder":
      "Tipo de Billetera",
    "dashboard.wallet-management.edit-dialog.type.error":
      "Tipo de Billetera es Requerido",
    "dashboard.wallet-management.edit-dialog.address.label":
      "Dirección de la Billetera",
    "dashboard.wallet-management.edit-dialog.address.placeholder":
      "Dirección de la Billetera",
    "dashboard.wallet-management.edit-dialog.address.error":
      "Dirección de la Billetera debe Ser una URL Válida",
    "dashboard.wallet-management.edit-dialog.primary-button": "Guardar",
    "dashboard.wallet-management.edit-dialog.toast.success":
      "La Billetera se ha Editado Exitosamente",
    "dashboard.wallet-management.inactive-dialog.title": "Desactivar Billetera",
    "dashboard.wallet-management.inactive-dialog.description":
      "Va a Desactivar la Billetera ¿Desea continuar?",
    "dashboard.wallet-management.inactive-dialog.primary-button": "Sí",
    "dashboard.wallet-management.inactive-dialog.secondary-button": "No",
    "dashboard.wallet-management.inactive-dialog.toast.success":
      "La Billetera se ha Desactivado Exitosamente.",
    "dashboard.wallet-management.activate-dialog.title": "Activar Billetera",
    "dashboard.wallet-management.activate-dialog.description":
      "Va a Activar la Billetera. ¿Desea Continuar?",
    "dashboard.wallet-management.activate-dialog.primary-button": "Sí",
    "dashboard.wallet-management.activate-dialog.secondary-button": "No",
    "dashboard.wallet-management.activate-dialog.toast.success":
      "La Billetera se ha Activado Exitosamente.",
    "dashboard.wallet-management.table.header.name": "Nombre",
    "dashboard.wallet-management.table.header.address":
      "Dirección de la Billetera",
    "dashboard.wallet-management.table.header.type": "Tipo",
    "dashboard.wallet-management.table.header.is-active": "Activo",
    "dashboard.wallet-management.table.header.actions": "Acciones",
    "dashboard.wallet-management.table.actions.edit": "Editar",
    "dashboard.wallet-management.table.items-label": "Items por página:",
    "dashboard.wallet-management.table.items-count-separator": " de ",
    "dashboard.change-password.title": "Cambiar Contraseña",
    "dashboard.change-password.form.current-password.label":
      "Contraseña Actual",
    "dashboard.change-password.form.current-password.placeholder":
      "Ingrese su Contraseña Actual",
    "dashboard.change-password.form.current-password.error":
      "La Contraseña Actual que Ingresaste es Incorrecta. Por favor Verifica e Intenta de Nuevo.",
    "dashboard.change-password.form.new-password.label": "Nueva Contraseña",
    "dashboard.change-password.form.new-password.placeholder":
      "Ingrese su Nueva Contraseña",
    "dashboard.change-password.form.new-password.error":
      "La Nueva Contraseña que Ingresaste no Cumple con Nuestros Requisitos. Por Favor Intenta con Otra.",
    "dashboard.change-password.form.confirm-password.label":
      "Confirmar Contraseña",
    "dashboard.change-password.form.confirm-password.placeholder":
      "Confirma tu Nueva Contraseña",
    "dashboard.change-password.form.confirm-password.error":
      "La Contraseña que Ingresaste No Coincide",
    "dashboard.change-password.information-label":
      "Ingresa una contraseña segura que contenga más de 20 caracteres, incluyendo al menos un número, un carácter en mayúscula, un carácter en minúscula y un carácter especial.",
    "dashboard.change-password.primary-button": "Guardar",
    "dashboard.settings.title": "Configuraciones",
    "dashboard.settings.terms-and-conditions": "Términos y condiciones",
    "dashboard.settings.exchange-rates": "Tasas de cambio",
    "dashboard.settings.privacy-policy": "Política de Privacidad",
    "dashboard.settings.wallet-root": "Billetera Base",
    "dashboard.settings.terms-and-conditions.title": "Términos y Condiciones",
    "dashboard.settings.terms-and-conditions.label":
      "Enlace a Términos y Condiciones",
    "dashboard.settings.terms-and-conditions.placeholder":
      "www.walletguru.com/terms-and-conditions",
    "dashboard.settings.terms-and-conditions.error": "URL No Valida",
    "dashboard.settings.terms-and-conditions.save": "Guardar",
    "dashboard.change-password.toast.success":
      "¡Tu Contraseña ha sido Actualizada Exitosamente!",
    "dashboard.settings.term-conditions.dialog.toast.success":
      "Los Términos y Condiciones han Sido Actualizados Correctamente.",
    "dashboard.settings.privacy-policy.dialog.toast.success":
      "La Política de Privacidad ha sido actualizada exitosamente.",
    "dashboard.settings.wallet-root.dialog.toast.success":
      "La raíz de la billetera ha Sido Actualizada Correctamente.",
    "dashboard.settings.privacy-policy.title": "Política de Privacidad",
    "dashboard.settings.privacy-policy.label":
      "Link a la Política de Privacidad.",
    "dashboard.settings.privacy-policy.placeholder":
      "www.walletguru.com/privacy-policy",
    "dashboard.settings.privacy-policy.error": "La URL es Inválida.",
    "dashboard.settings.privacy-policy.save": "Guardar",
    "dashboard.settings.wallet-root.title": "Billetera Base",
    "dashboard.settings.wallet-root.label": "Link a la Billetera Base",
    "dashboard.settings.wallet-root.placeholder":
      "www.walletguru.com/wallet-root",
    "dashboard.settings.wallet-root.information.label":
      "Tener en cuenta que es necesario modificar la variable de entorno en el ambiente. Las billeteras actuales no cambiaran su URL.",
    "dashboard.settings.wallet-root.error": "La URL es Inválida",
    "dashboard.settings.wallet-root.save": "Guardar",
    "dashboard.reports.title": "Reportes",
    "dashboard.reports.sections.transactions-by-user":
      "Transacciones por Usuario",
    "dashboard.reports.sections.transactions-by-provider":
      "Transacciones por Periodo",
    "dashboard.reports.sections.revenue": "Ganancia",
    "dashboard.reports.sections.fee": "Costos",
    "dashboard.reports.sections.disputes": "Disputas",
    "dashboard.reports.sections.refunds": "Reembolsos",
    "dashboard.reports.sections.clear-payments": "Pagos",
    "dashboard.reports.sections.reservedFunds": "Fondos Reservados",
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
      "Detalles del Servicio de Transacciones",
    "dashboard.reports.sections.transactions-by-user.details.date": "Fecha",
    "dashboard.reports.sections.transactions-by-user.search-button": "Buscar",
    "dashboard.reports.sections.transactions-by-user.header.ammount": "Monto",
    "dashboard.reports.sections-transactions-by-user.search.wallet-address.placeholder":
      "Ingrese la Dirección de la Billetera",
    "dashboard.reports.sections-transactions-by-user.search.wallet-address.label":
      "Dirección de Billetera",
    "dashboard.reports.sections-transactions-by-user.search.wallet-address.error":
      "Ingrese una Birección de Billetera Válida",
    "dashboard.reports.sections-transactions-by-user.search.period.placeholder":
      "Seleccione un Rango de Tiempo",
    "dashboard.reports.sections-transactions-by-user.search.period.error":
      "Ingrese un Periodo Válido",
    "dashboard.reports.sections-transactions-by-user.search.start-date.label":
      "Fecha de Inicio",
    "dashboard.reports.sections-transactions-by-user.search.end-date.label":
      "Fecha de Fin",
    "dashboard.reports.sections-transactions-by-user.search.type.placeholder":
      "Seleccione un Tipo",
    "dashboard.reports.sections-transactions-by-user.search.type.error":
      "Ingrese un Tipo Válido",
    "dashboard.reports.sections-transactions-by-user.search.type.label": "Tipo",
    "dashboard.reports.sections-transactions-by-user.search.state.placeholder":
      "Seleccione un Estado",
    "dashboard.reports.sections-transactions-by-user.search.state.pending":
      "Pendiente",
    "dashboard.reports.sections-transactions-by-user.search.state.completed":
      "Completado",
    "dashboard.reports.sections-transactions-by-user.search.state.error":
      "Ingrese un Estado Válido",
    "dashboard.reports.sections-transactions-by-user.search.state.label":
      "Estado",
    "dashboard.reports.sections-transactions-by-user.search.provider.placeholder":
      "Seleccione un Proveedor",
    "dashboard.reports.sections-transactions-by-user.search.provider.error":
      "Ingrese un Provider Válido",
    "dashboard.reports.sections-transactions-by-user.search.provider.label":
      "Proveedor",
    "dashboard.reports.sections-transactions-by-user.user.label": "Usuario",
    "dashboard.reports.sections-transactions-by-user.period.no-wallet-selected":
      "No se ha Seleccionado una Dirección de Billetera",
    "dashboard.reports.sections-transactions-by-user.period.label": "Periodo",
    "dashboard.reports.sections-transactions-by-user.period.no-start-selected":
      "No se ha Seleccionado una Fecha de Inicio",
    "dashboard.reports.sections-transactions-by-user.period.no-end-selected":
      "No se ha Seleccionado una Fecha de Fin",
    "dashboard.reports.sections-transactions-by-user.download.success":
      "El Reporte ha sido Descargado Exitosamente.",
    "dashboard.reports.sections.transactions-by-provider.header.actions.details":
      "Detalles",
    "dashboard.reports.sections.transactions-by-provider.header.user":
      "Usuario",
    "dashboard.reports.sections.transactions-by-provider.header.provider":
      "Proveedor",
    "dashboard.reports.sections.transactions-by-provider.header.gross-sale":
      "Venta Bruta",
    "dashboard.reports.sections.transactions-by-provider.header.net-sale":
      "Venta Neta",
    "dashboard.reports.sections.transactions-by-provider.header.fee": "Tarifa",
    "dashboard.reports.sections.transactions-by-provider.header.start":
      "Fecha de Inicio",
    "dashboard.reports.sections.transactions-by-provider.header.finish":
      "Fecha de Fin",
    "dashboard.reports.sections.transactions-by-provider.header.actions":
      "Acciones",
    "dashboard.reports.sections-transactions-by-provider.download.success":
      "El Reporte ha sido Descargado Exitosamente.",
    "dashboard.reports.sections-transactions-by-provider.search.provider.label":
      "Proveedor",
    "dashboard.reports.sections-transactions-by-provider.search.provider.placeholder":
      "Seleccione un Proveedor",
    "dashboard.reports.sections.transactions-by-provider.search-button":
      "Buscar",
    "dashboard.reports.sections-transactions-by-provider.search.end-date.label":
      "Fecha de Fin",
    "dashboard.reports.sections-transactions-by-provider.search.end-date.placeholder":
      "yyyy-mm-dd",
    "dashboard.reports.sections-transactions-by-provider.search.start-date.label":
      "Fecha de Inicio",
    "dashboard.reports.sections-transactions-by-provider.search.start-date.placeholder":
      "yyyy-mm-dd",
    "dashboard.reports.sections.transactions-by-provider.details.header":
      "Detalles de las transacciones por periodo",
    "dashboard.reports.sections.transactions-by-provider.details.date": "Fecha",
    "dashboard.dispute.button.details": "Disputa",
    "dashboard.refund.button.details": "Reembolso",
    "dashboard.roles.role.modules.healthCheck": "Chequeo Salud",
    "dashboard.reports.sections.reserved-funds-by-user.header.type": "Tipo",
    "dashboard.reports.sections.reserved-funds-by-user.header.description":
      "Descripcion",
    "dashboard.reports.sections.reserved-funds-by-user.header.start":
      "Fecha de Inicio",
    "dashboard.reports.sections.reserved-funds-by-user.header.finish":
      "Fecha de Fin",
    "dashboard.reports.sections.reserved-funds-by-user.header.state": "Estado",
    "dashboard.reports.sections.reserved-funds-by-user.header.actions":
      "Acciones",
    "dashboard.reports.sections.reserved-funds-by-user.header.actions.details":
      "Detalles",
    "dashboard.reports.sections.reserved-funds-by-user.details.header":
      "Detalles del Servicio de Transacciones",
    "dashboard.reports.sections.reserved-funds-by-user.details.date": "Fecha",
    "dashboard.reports.sections.reserved-funds-by-user.search-button": "Buscar",
    "dashboard.reports.sections.reserved-funds-by-user.header.ammount": "Monto",
    "dashboard.reports.sections-reserved-funds-by-user.search.wallet-address.placeholder":
      "Ingrese la Dirección de la Billetera",
    "dashboard.reports.sections-reserved-funds-by-user.search.wallet-address.label":
      "Dirección de Billetera",
    "dashboard.reports.sections-reserved-funds-by-user.search.wallet-address.error":
      "Ingrese una Dirección de Billetera Válida",
    "dashboard.reports.sections-reserved-funds-by-user.search.period.placeholder":
      "Seleccione un Rango de Tiempo",
    "dashboard.reports.sections-reserved-funds-by-user.search.period.error":
      "Ingrese un Periodo Válido",
    "dashboard.reports.sections-reserved-funds-by-user.search.start-date.label":
      "Fecha de Inicio",
    "dashboard.reports.sections-reserved-funds-by-user.search.end-date.label":
      "Fecha de Fin",
    "dashboard.reports.sections-reserved-funds-by-user.search.type.placeholder":
      "Seleccione un Tipo",
    "dashboard.reports.sections-reserved-funds-by-user.search.type.error":
      "Ingrese un Tipo Válido",
    "dashboard.reports.sections-reserved-funds-by-user.search.type.label":
      "Tipo",
    "dashboard.reports.sections-reserved-funds-by-user.search.state.placeholder":
      "Seleccione un Estado",
    "dashboard.reports.sections-reserved-funds-by-user.search.state.pending":
      "Pendiente",
    "dashboard.reports.sections-reserved-funds-by-user.search.state.completed":
      "Completado",
    "dashboard.reports.sections-reserved-funds-by-user.search.state.error":
      "Ingrese un Estado Válido",
    "dashboard.reports.sections-reserved-funds-by-user.search.state.label":
      "Estado",
    "dashboard.reports.sections-reserved-funds-by-user.search.provider.placeholder":
      "Seleccione un Proveedor",
    "dashboard.reports.sections-reserved-funds-by-user.search.provider.error":
      "Ingrese un Proveedor válido",
    "dashboard.reports.sections-reserved-funds-by-user.search.provider.label":
      "Proveedor",
    "dashboard.reports.sections-reserved-funds-by-user.user.label": "Usuario",
    "dashboard.reports.sections-reserved-funds-by-user.period.no-wallet-selected":
      "No se ha Seleccionado una Dirección de Billetera",
    "dashboard.reports.sections-reserved-funds-by-user.period.label": "Periodo",
    "dashboard.reports.sections-reserved-funds-by-user.period.no-start-selected":
      "No se ha Seleccionado una Fecha de Inicio",
    "dashboard.reports.sections-reserved-funds-by-user.period.no-end-selected":
      "No se ha Seleccionado una Fecha de Fin",
    "dashboard.reports.sections-reserved-funds-by-user.download.success":
      "El reporte ha sido Descargado Exitosamente.",
    "dashboard.reports.sections.clear-payments.header.date": "Fecha",
    "dashboard.reports.sections.clear-payments.header.description":
      "Descripción",
    "dashboard.reports.sections.clear-payments.header.type": "Tipo",
    "dashboard.reports.sections.clear-payments.header.user": "Billetera",
    "dashboard.reports.sections.clear-payments.header.month": "Mes",
    "dashboard.reports.sections.clear-payments.header.reference":
      "Número de Referencia",
    "dashboard.reports.sections.clear-payments.header.observation":
      "Observación",
    "dashboard.reports.sections.clear-payments.header.provider": "Proveedor",
    "dashboard.reports.sections.clear-payments.header.transactions":
      "Transacciones",
    "dashboard.reports.sections.clear-payments.header.fees": "Comisiones",
    "dashboard.reports.sections.clear-payments.header.amount": "Monto",
    "dashboard.reports.sections.clear-payments.header.status": "Estado",
    "dashboard.reports.sections.clear-payments.header.actions.details":
      "Detalles",
    "dashboard.reports.sections.clear-payments.details.header":
      "Detalles Pagos Realizados",
    "dashboard.reports.sections.clear-payments.details.date": "Fecha",
    "dashboard.reports.sections.clear-payments.search-button": "Buscar",
    "dashboard.reports.sections.clear-payments.header.ammount": "Monto",
    "dashboard.reports.sections-clear-payments.search.wallet-address.placeholder":
      "Ingrese la Dirección de la Billetera",
    "dashboard.reports.sections-clear-payments.search.wallet-address.label":
      "Dirección de Billetera",
    "dashboard.reports.sections-clear-payments.search.wallet-address.error":
      "Ingrese una Dirección de Billetera Válida",
    "dashboard.reports.sections-clear-payments.search.period.placeholder":
      "Seleccione un Rango de Tiempo",
    "dashboard.reports.sections-clear-payments.search.period.error":
      "Ingrese un Periodo Válido",
    "dashboard.reports.sections-clear-payments.search.start-date.label":
      "Fecha de Inicio",
    "dashboard.reports.sections-clear-payments.search.end-date.label":
      "Fecha de Fin",
    "dashboard.reports.sections-clear-payments.search.month.placeholder":
      "Seleccione un Mes",
    "dashboard.reports.sections-clear-payments.search.month.error":
      "Ingrese un Mes Válido",
    "dashboard.reports.sections-clear-payments.search.month.label": "Mes",
    "dashboard.reports.sections-clear-payments.search.year.label": "Año",
    "dashboard.reports.sections-clear-payments.search.state.placeholder":
      "Seleccione un Estado",
    "dashboard.reports.sections-clear-payments.search.state.all": "Todos",
    "dashboard.reports.sections-clear-payments.search.state.pending":
      "Pendiente",
    "dashboard.reports.sections-clear-payments.search.state.completed":
      "Completado",
    "dashboard.reports.sections-clear-payments.search.state.error":
      "Ingrese un Estado Válido",
    "dashboard.reports.sections-clear-payments.search.state.label": "Estado",
    "dashboard.reports.sections-clear-payments.search.provider.placeholder":
      "Seleccione un Proveedor",
    "dashboard.reports.sections-clear-payments.search.provider.error":
      "Ingrese un Provider Válido",
    "dashboard.reports.sections-clear-payments.search.provider.label":
      "Proveedor",
    "dashboard.reports.sections-clear-payments.user.label": "Usuario",
    "dashboard.reports.sections-clear-payments.period.no-wallet-selected":
      "No se ha Seleccionado una Dirección de Billetera",
    "dashboard.reports.sections-clear-payments.period.label": "Periodo",
    "dashboard.reports.sections-clear-payments.period.no-start-selected":
      "No se ha Seleccionado una Fecha de Inicio",
    "dashboard.reports.sections-clear-payments.period.no-end-selected":
      "No se ha Seleccionado una Fecha de Fin",
    "dashboard.reports.sections-clear-payments.download.success":
      "El Reporte ha sido Descargado Exitosamente.",
  },
} satisfies I18nDictionary;
