"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./common/prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const companies_module_1 = require("./companies/companies.module");
const projects_module_1 = require("./projects/projects.module");
const units_module_1 = require("./units/units.module");
const leads_module_1 = require("./leads/leads.module");
const clients_module_1 = require("./clients/clients.module");
const bookings_module_1 = require("./bookings/bookings.module");
const payments_module_1 = require("./payments/payments.module");
const accounts_module_1 = require("./accounts/accounts.module");
const expenses_module_1 = require("./expenses/expenses.module");
const employees_module_1 = require("./employees/employees.module");
const hr_module_1 = require("./hr/hr.module");
const vendors_module_1 = require("./vendors/vendors.module");
const construction_module_1 = require("./construction/construction.module");
const documents_module_1 = require("./documents/documents.module");
const notifications_module_1 = require("./notifications/notifications.module");
const ai_module_1 = require("./ai/ai.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            companies_module_1.CompaniesModule,
            projects_module_1.ProjectsModule,
            units_module_1.UnitsModule,
            leads_module_1.LeadsModule,
            clients_module_1.ClientsModule,
            bookings_module_1.BookingsModule,
            payments_module_1.PaymentsModule,
            accounts_module_1.AccountsModule,
            expenses_module_1.ExpensesModule,
            employees_module_1.EmployeesModule,
            hr_module_1.HrModule,
            vendors_module_1.VendorsModule,
            construction_module_1.ConstructionModule,
            documents_module_1.DocumentsModule,
            notifications_module_1.NotificationsModule,
            ai_module_1.AiModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map