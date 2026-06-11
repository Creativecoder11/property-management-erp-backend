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
exports.LeadsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const leads_service_1 = require("./leads.service");
let LeadsController = class LeadsController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(req, q) {
        return this.service.findAll(req.user.companyId, q);
    }
    dashboard(req) {
        return this.service.getDashboard(req.user.companyId);
    }
    kanban(req) {
        return this.service.getKanban(req.user.companyId);
    }
    stats(req) {
        return this.service.getStats(req.user.companyId);
    }
    checkDuplicates(req, phone, email) {
        return this.service.checkDuplicates(req.user.companyId, phone, email);
    }
    getFollowUps(req, q) {
        return this.service.getFollowUps(req.user.companyId, q);
    }
    findOne(id, req) {
        return this.service.findOne(id, req.user.companyId);
    }
    create(req, dto) {
        return this.service.create(req.user.companyId, req.user.id, dto);
    }
    update(id, req, dto) {
        return this.service.update(id, req.user.companyId, req.user.id, dto);
    }
    remove(id, req) {
        return this.service.remove(id, req.user.companyId);
    }
    updateStage(id, req, body) {
        return this.service.updateStage(id, req.user.companyId, req.user.id, body.stage, body.lostReason);
    }
    bulkUpdate(req, body) {
        return this.service.bulkUpdate(req.user.companyId, body.ids, body.data);
    }
    bulkDelete(req, body) {
        return this.service.bulkDelete(req.user.companyId, body.ids);
    }
    getActivities(id, req, q) {
        return this.service.getActivities(id, req.user.companyId, Number(q.page) || 1, Number(q.limit) || 20);
    }
    addActivity(id, req, dto) {
        return this.service.addActivity(id, req.user.companyId, req.user.id, dto);
    }
    createFollowUp(id, req, dto) {
        return this.service.createFollowUp(id, req.user.companyId, req.user.id, dto);
    }
    completeFollowUp(id, req, body) {
        return this.service.completeFollowUp(id, req.user.companyId, req.user.id, body.outcome);
    }
    snoozeFollowUp(id, req, body) {
        return this.service.snoozeFollowUp(id, req.user.companyId, new Date(body.snoozeUntil));
    }
    matchProperties(id, req) {
        return this.service.matchProperties(id, req.user.companyId);
    }
    assign(id, req, body) {
        return this.service.assignLead(id, req.user.companyId, req.user.id, body.assignedToId);
    }
};
exports.LeadsController = LeadsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "dashboard", null);
__decorate([
    (0, common_1.Get)('kanban'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "kanban", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "stats", null);
__decorate([
    (0, common_1.Get)('check-duplicates'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('phone')),
    __param(2, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "checkDuplicates", null);
__decorate([
    (0, common_1.Get)('follow-ups'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "getFollowUps", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/stage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "updateStage", null);
__decorate([
    (0, common_1.Post)('bulk/update'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "bulkUpdate", null);
__decorate([
    (0, common_1.Post)('bulk/delete'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "bulkDelete", null);
__decorate([
    (0, common_1.Get)(':id/activities'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "getActivities", null);
__decorate([
    (0, common_1.Post)(':id/activities'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "addActivity", null);
__decorate([
    (0, common_1.Post)(':id/follow-ups'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "createFollowUp", null);
__decorate([
    (0, common_1.Patch)('follow-ups/:followUpId/complete'),
    __param(0, (0, common_1.Param)('followUpId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "completeFollowUp", null);
__decorate([
    (0, common_1.Patch)('follow-ups/:followUpId/snooze'),
    __param(0, (0, common_1.Param)('followUpId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "snoozeFollowUp", null);
__decorate([
    (0, common_1.Get)(':id/property-matches'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "matchProperties", null);
__decorate([
    (0, common_1.Patch)(':id/assign'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], LeadsController.prototype, "assign", null);
exports.LeadsController = LeadsController = __decorate([
    (0, swagger_1.ApiTags)('Leads'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('leads'),
    __metadata("design:paramtypes", [leads_service_1.LeadsService])
], LeadsController);
//# sourceMappingURL=leads.controller.js.map