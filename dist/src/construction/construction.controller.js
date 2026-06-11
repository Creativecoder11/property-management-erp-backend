"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const construction_service_1 = require("./construction.service");
let ConstructionController = class ConstructionController {
    service;
    constructor(service) {
        this.service = service;
    }
    progress(id, q) { return this.service.getProgressReports(id, q); }
    createProgress(req, dto) { return this.service.createProgressReport({ ...dto, userId: req.user.id }); }
    workOrders(req, q) { return this.service.getWorkOrders(req.user.companyId, q); }
    createWorkOrder(dto) { return this.service.createWorkOrder(dto); }
    updateWorkOrder(id, dto) { return this.service.updateWorkOrder(id, dto); }
};
exports.ConstructionController = ConstructionController;
__decorate([
    (0, common_1.Get)('progress/:projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ConstructionController.prototype, "progress", null);
__decorate([
    (0, common_1.Post)('progress'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ConstructionController.prototype, "createProgress", null);
__decorate([
    (0, common_1.Get)('work-orders'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ConstructionController.prototype, "workOrders", null);
__decorate([
    (0, common_1.Post)('work-orders'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConstructionController.prototype, "createWorkOrder", null);
__decorate([
    (0, common_1.Put)('work-orders/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ConstructionController.prototype, "updateWorkOrder", null);
exports.ConstructionController = ConstructionController = __decorate([
    (0, swagger_1.ApiTags)('Construction'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('construction'),
    __metadata("design:paramtypes", [construction_service_1.ConstructionService])
], ConstructionController);
//# sourceMappingURL=construction.controller.js.map