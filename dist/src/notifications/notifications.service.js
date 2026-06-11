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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let NotificationsService = class NotificationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(companyId, userId, query) {
        const { unread, page = 1, limit = 20 } = query;
        const where = { companyId, OR: [{ userId }, { userId: null }] };
        if (unread === 'true')
            where.isRead = false;
        const [data, total, unreadCount] = await Promise.all([
            this.prisma.notification.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { createdAt: 'desc' } }),
            this.prisma.notification.count({ where }),
            this.prisma.notification.count({ where: { ...where, isRead: false } }),
        ]);
        return { data, total, unreadCount };
    }
    async markRead(id, userId) {
        return this.prisma.notification.update({ where: { id }, data: { isRead: true } });
    }
    async markAllRead(companyId, userId) {
        return this.prisma.notification.updateMany({ where: { companyId, userId, isRead: false }, data: { isRead: true } });
    }
    async create(dto) {
        return this.prisma.notification.create({ data: { companyId: dto.companyId, userId: dto.userId, title: dto.title, message: dto.message, type: dto.type || 'INFO', link: dto.link } });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map