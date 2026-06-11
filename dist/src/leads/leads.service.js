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
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
const PIPELINE_STAGES = [
    'NEW', 'CONTACTED', 'QUALIFIED', 'SITE_VISIT_SCHEDULED',
    'SITE_VISIT_DONE', 'NEGOTIATION', 'BOOKING_PENDING', 'WON', 'LOST', 'HOLD',
];
let LeadsService = class LeadsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(companyId, query) {
        const { page = 1, limit = 20, search, stage, source, priority, assignedToId, tags, minBudget, maxBudget, sortBy = 'createdAt', sortDir = 'desc', } = query;
        const skip = (Number(page) - 1) * Number(limit);
        const where = { companyId, deletedAt: null };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search } },
                { email: { contains: search, mode: 'insensitive' } },
                { locationPref: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (stage)
            where.stage = { in: Array.isArray(stage) ? stage : [stage] };
        if (source)
            where.source = source;
        if (priority)
            where.priority = priority;
        if (assignedToId)
            where.assignedToId = assignedToId;
        if (tags)
            where.tags = { hasSome: Array.isArray(tags) ? tags : [tags] };
        if (minBudget)
            where.budget = { ...where.budget, gte: Number(minBudget) };
        if (maxBudget)
            where.budget = { ...where.budget, lte: Number(maxBudget) };
        const orderBy = {};
        orderBy[sortBy] = sortDir;
        const [data, total] = await Promise.all([
            this.prisma.lead.findMany({
                where, skip, take: Number(limit), orderBy,
                include: {
                    assignedTo: { select: { id: true, firstName: true, lastName: true, avatar: true } },
                    _count: { select: { activities: true, followUps: true } },
                },
            }),
            this.prisma.lead.count({ where }),
        ]);
        return { data, total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) };
    }
    async findOne(id, companyId) {
        const lead = await this.prisma.lead.findFirst({
            where: { id, companyId, deletedAt: null },
            include: {
                assignedTo: { select: { id: true, firstName: true, lastName: true, avatar: true, role: true } },
                activities: {
                    orderBy: { createdAt: 'desc' }, take: 50,
                    include: { user: { select: { firstName: true, lastName: true, avatar: true } } },
                },
                followUps: {
                    where: { status: { in: ['PENDING', 'OVERDUE'] } },
                    orderBy: { dueAt: 'asc' },
                    include: { user: { select: { firstName: true, lastName: true } } },
                },
                client: { select: { id: true, name: true } },
            },
        });
        if (!lead)
            throw new common_1.NotFoundException('Lead not found');
        return lead;
    }
    async create(companyId, userId, dto) {
        const duplicate = await this.prisma.lead.findFirst({
            where: { companyId, deletedAt: null, OR: [{ phone: dto.phone }, ...(dto.email ? [{ email: dto.email }] : [])] },
        });
        if (duplicate)
            throw new common_1.BadRequestException(`Duplicate lead: "${duplicate.name}" has the same contact.`);
        const lead = await this.prisma.lead.create({
            data: { ...dto, companyId, assignedToId: dto.assignedToId || userId },
        });
        await this.prisma.leadActivity.create({
            data: { leadId: lead.id, userId, type: 'NOTE', notes: 'Lead created', metadata: { action: 'created' } },
        });
        return lead;
    }
    async update(id, companyId, userId, dto) {
        const lead = await this.findOne(id, companyId);
        return this.prisma.lead.update({ where: { id: lead.id }, data: dto });
    }
    async remove(id, companyId) {
        const lead = await this.findOne(id, companyId);
        return this.prisma.lead.update({ where: { id: lead.id }, data: { deletedAt: new Date() } });
    }
    async updateStage(id, companyId, userId, stage, lostReason) {
        const lead = await this.findOne(id, companyId);
        const oldStage = lead.stage;
        const data = { stage };
        if (stage === 'WON')
            data.convertedAt = new Date();
        if (lostReason)
            data.lostReason = lostReason;
        const [updated] = await Promise.all([
            this.prisma.lead.update({ where: { id: lead.id }, data }),
            this.prisma.leadActivity.create({
                data: {
                    leadId: lead.id, userId, type: 'STATUS_CHANGE',
                    notes: `Stage: ${oldStage} → ${stage}`,
                    metadata: { from: oldStage, to: stage, lostReason },
                },
            }),
        ]);
        return updated;
    }
    async bulkUpdate(companyId, ids, data) {
        await this.prisma.lead.updateMany({ where: { id: { in: ids }, companyId, deletedAt: null }, data });
        return { updated: ids.length };
    }
    async bulkDelete(companyId, ids) {
        await this.prisma.lead.updateMany({ where: { id: { in: ids }, companyId }, data: { deletedAt: new Date() } });
        return { deleted: ids.length };
    }
    async getKanban(companyId) {
        return Promise.all(PIPELINE_STAGES.map(async (stage) => {
            const [leads, stats] = await Promise.all([
                this.prisma.lead.findMany({
                    where: { companyId, stage: stage, deletedAt: null },
                    orderBy: [{ priority: 'desc' }, { score: 'desc' }, { updatedAt: 'desc' }],
                    include: {
                        assignedTo: { select: { id: true, firstName: true, lastName: true, avatar: true } },
                        _count: { select: { activities: true, followUps: true } },
                    },
                }),
                this.prisma.lead.aggregate({
                    where: { companyId, stage: stage, deletedAt: null },
                    _count: true, _sum: { budget: true },
                }),
            ]);
            return { stage, leads, count: stats._count, totalValue: stats._sum.budget || 0 };
        }));
    }
    async getActivities(leadId, companyId, page = 1, limit = 20) {
        await this.findOne(leadId, companyId);
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.leadActivity.findMany({
                where: { leadId }, skip, take: limit, orderBy: { createdAt: 'desc' },
                include: { user: { select: { firstName: true, lastName: true, avatar: true } } },
            }),
            this.prisma.leadActivity.count({ where: { leadId } }),
        ]);
        return { data, total, page, limit };
    }
    async addActivity(leadId, companyId, userId, dto) {
        const lead = await this.findOne(leadId, companyId);
        const [activity] = await Promise.all([
            this.prisma.leadActivity.create({
                data: { leadId: lead.id, userId, ...dto },
                include: { user: { select: { firstName: true, lastName: true, avatar: true } } },
            }),
            this.prisma.lead.update({ where: { id: lead.id }, data: { lastContactAt: new Date() } }),
        ]);
        return activity;
    }
    async getFollowUps(companyId, query) {
        const { userId, status, overdue, page = 1, limit = 20 } = query;
        const skip = (Number(page) - 1) * Number(limit);
        await this.prisma.followUp.updateMany({
            where: { status: 'PENDING', dueAt: { lt: new Date() }, lead: { companyId } },
            data: { status: 'OVERDUE' },
        });
        const where = { lead: { companyId, deletedAt: null } };
        if (userId)
            where.userId = userId;
        if (status)
            where.status = status;
        if (overdue === 'true')
            where.status = 'OVERDUE';
        const [data, total] = await Promise.all([
            this.prisma.followUp.findMany({
                where, skip, take: Number(limit), orderBy: { dueAt: 'asc' },
                include: {
                    lead: { select: { id: true, name: true, phone: true, stage: true, priority: true } },
                    user: { select: { firstName: true, lastName: true } },
                },
            }),
            this.prisma.followUp.count({ where }),
        ]);
        return { data, total, page: Number(page), limit: Number(limit) };
    }
    async createFollowUp(leadId, companyId, userId, dto) {
        await this.findOne(leadId, companyId);
        const [followUp] = await Promise.all([
            this.prisma.followUp.create({ data: { leadId, userId, ...dto } }),
            this.prisma.leadActivity.create({
                data: { leadId, userId, type: 'FOLLOW_UP', notes: `Follow-up: ${dto.title}`, scheduledAt: dto.dueAt },
            }),
            this.prisma.lead.update({ where: { id: leadId }, data: { followUpAt: dto.dueAt } }),
        ]);
        return followUp;
    }
    async completeFollowUp(id, companyId, userId, outcome) {
        const followUp = await this.prisma.followUp.findFirst({ where: { id, lead: { companyId } } });
        if (!followUp)
            throw new common_1.NotFoundException('Follow-up not found');
        const [updated] = await Promise.all([
            this.prisma.followUp.update({ where: { id }, data: { status: 'COMPLETED', completedAt: new Date(), outcome } }),
            this.prisma.leadActivity.create({
                data: { leadId: followUp.leadId, userId, type: 'FOLLOW_UP', notes: `Follow-up completed: ${followUp.title}`, outcome },
            }),
        ]);
        return updated;
    }
    async snoozeFollowUp(id, companyId, snoozeUntil) {
        const followUp = await this.prisma.followUp.findFirst({ where: { id, lead: { companyId } } });
        if (!followUp)
            throw new common_1.NotFoundException('Follow-up not found');
        return this.prisma.followUp.update({ where: { id }, data: { status: 'SNOOZED', dueAt: snoozeUntil } });
    }
    async matchProperties(leadId, companyId) {
        const lead = await this.findOne(leadId, companyId);
        const where = { floor: { tower: { project: { companyId } } }, status: 'AVAILABLE' };
        if (lead.budgetMin || lead.budgetMax) {
            where.currentPrice = {};
            if (lead.budgetMin)
                where.currentPrice.gte = lead.budgetMin;
            if (lead.budgetMax)
                where.currentPrice.lte = lead.budgetMax * 1.1;
        }
        if (lead.bedrooms)
            where.bedrooms = { gte: lead.bedrooms };
        const units = await this.prisma.unit.findMany({
            where, take: 10, orderBy: { currentPrice: 'asc' },
            include: { floor: { include: { tower: { include: { project: { select: { id: true, name: true, location: true } } } } } } },
        });
        return units.map((u) => ({
            unitId: u.id, unitNo: u.unitNo, type: u.type, bedrooms: u.bedrooms,
            sizeSqft: u.sizeSqft, price: u.currentPrice, floor: u.floor.floorNo,
            project: u.floor.tower.project, matchScore: this.calcMatchScore(lead, u),
        })).sort((a, b) => b.matchScore - a.matchScore);
    }
    calcMatchScore(lead, unit) {
        let score = 0;
        if (lead.budgetMin && lead.budgetMax) {
            if (unit.currentPrice >= lead.budgetMin && unit.currentPrice <= lead.budgetMax)
                score += 40;
            else if (unit.currentPrice <= lead.budgetMax * 1.1)
                score += 20;
        }
        if (lead.bedrooms && unit.bedrooms >= lead.bedrooms)
            score += 30;
        if (lead.propertyType && unit.type === lead.propertyType)
            score += 30;
        return score;
    }
    async getStats(companyId) {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const [stageStats, sourceStats, total, thisMonthNew, lastMonthNew, overdue, hot, conversionData] = await Promise.all([
            this.prisma.lead.groupBy({ by: ['stage'], where: { companyId, deletedAt: null }, _count: true, _sum: { budget: true } }),
            this.prisma.lead.groupBy({ by: ['source'], where: { companyId, deletedAt: null }, _count: true }),
            this.prisma.lead.count({ where: { companyId, deletedAt: null } }),
            this.prisma.lead.count({ where: { companyId, deletedAt: null, createdAt: { gte: monthStart } } }),
            this.prisma.lead.count({ where: { companyId, deletedAt: null, createdAt: { gte: lastMonthStart, lt: monthStart } } }),
            this.prisma.followUp.count({ where: { lead: { companyId, deletedAt: null }, status: 'OVERDUE' } }),
            this.prisma.lead.count({ where: { companyId, deletedAt: null, priority: 'HOT' } }),
            this.prisma.lead.groupBy({ by: ['stage'], where: { companyId, deletedAt: null, stage: { in: ['WON', 'LOST'] } }, _count: true }),
        ]);
        const won = conversionData.find((s) => s.stage === 'WON')?._count || 0;
        const lost = conversionData.find((s) => s.stage === 'LOST')?._count || 0;
        const conversionRate = (won + lost) > 0 ? ((won / (won + lost)) * 100).toFixed(1) : '0';
        const growth = lastMonthNew > 0 ? (((thisMonthNew - lastMonthNew) / lastMonthNew) * 100).toFixed(1) : '0';
        const pipelineValue = stageStats
            .filter((s) => !['WON', 'LOST'].includes(s.stage))
            .reduce((sum, s) => sum + (s._sum?.budget || 0), 0);
        return { total, thisMonthNew, lastMonthNew, growth, overdueFollowUps: overdue, hot, conversionRate, pipelineValue, stageStats, sourceStats };
    }
    async getDashboard(companyId) {
        const [stats, recentLeads, overdueFollowUps, upcomingFollowUps] = await Promise.all([
            this.getStats(companyId),
            this.prisma.lead.findMany({
                where: { companyId, deletedAt: null }, orderBy: { createdAt: 'desc' }, take: 5,
                include: { assignedTo: { select: { firstName: true, lastName: true } } },
            }),
            this.prisma.followUp.findMany({
                where: { lead: { companyId, deletedAt: null }, status: 'OVERDUE' }, take: 5, orderBy: { dueAt: 'asc' },
                include: { lead: { select: { id: true, name: true, phone: true, stage: true } } },
            }),
            this.prisma.followUp.findMany({
                where: { lead: { companyId, deletedAt: null }, status: 'PENDING', dueAt: { gte: new Date(), lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } },
                take: 5, orderBy: { dueAt: 'asc' },
                include: { lead: { select: { id: true, name: true, phone: true, stage: true } } },
            }),
        ]);
        return { stats, recentLeads, overdueFollowUps, upcomingFollowUps };
    }
    async assignLead(id, companyId, actorId, assignedToId) {
        const lead = await this.findOne(id, companyId);
        const [updated] = await Promise.all([
            this.prisma.lead.update({ where: { id: lead.id }, data: { assignedToId } }),
            this.prisma.leadActivity.create({
                data: { leadId: lead.id, userId: actorId, type: 'ASSIGNMENT', notes: 'Lead reassigned', metadata: { from: lead.assignedToId, to: assignedToId } },
            }),
        ]);
        return updated;
    }
    async checkDuplicates(companyId, phone, email) {
        const orClauses = [{ phone }];
        if (email)
            orClauses.push({ email });
        const leads = await this.prisma.lead.findMany({
            where: { companyId, deletedAt: null, OR: orClauses },
            select: { id: true, name: true, phone: true, email: true, stage: true },
        });
        return { duplicates: leads, hasDuplicates: leads.length > 0 };
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map