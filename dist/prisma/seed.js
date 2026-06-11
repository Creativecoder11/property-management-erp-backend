"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🌱 Seeding BuildEstate ERP database...");
    const company = await prisma.company.upsert({
        where: { slug: "horizon-developers-demo" },
        update: {},
        create: {
            name: "Horizon Developers Ltd.",
            slug: "horizon-developers-demo",
            email: "info@horizondevelopers.com",
            phone: "+8801711000001",
            address: "House 10, Road 5, Gulshan 1, Dhaka 1212",
            website: "https://horizondevelopers.com",
            currency: "BDT",
            plan: "PROFESSIONAL",
            trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
    });
    console.log("✅ Company created:", company.name);
    const password = await bcrypt.hash("Demo@12345", 12);
    const admin = await prisma.user.upsert({
        where: { companyId_email: { companyId: company.id, email: "demo@buildestate.com" } },
        update: {},
        create: {
            companyId: company.id,
            email: "demo@buildestate.com",
            password,
            firstName: "Admin",
            lastName: "Demo",
            phone: "+8801711000001",
            role: "ADMIN",
            isVerified: true,
            isActive: true,
        },
    });
    console.log("✅ Admin user created:", admin.email);
    const project = await prisma.project.upsert({
        where: { id: "demo-project-01" },
        update: {},
        create: {
            id: "demo-project-01",
            companyId: company.id,
            name: "Skyline Heights Residency",
            code: "SHR-2024",
            type: "RESIDENTIAL",
            status: "UNDER_CONSTRUCTION",
            location: "Bashundhara R/A, Dhaka",
            totalUnits: 48,
            budget: 150000000,
            startDate: new Date("2024-01-15"),
            expectedEnd: new Date("2026-06-30"),
            progressPct: 45,
            description: "Modern luxury residential complex with 48 units across 4 towers",
        },
    });
    const tower = await prisma.tower.create({
        data: {
            projectId: project.id,
            name: "Tower A",
            totalFloors: 12,
        },
    });
    for (let floorNo = 1; floorNo <= 4; floorNo++) {
        const floor = await prisma.floor.create({
            data: { towerId: tower.id, floorNo, name: `Floor ${floorNo}` },
        });
        const unitStatuses = ["AVAILABLE", "BOOKED", "AVAILABLE", "AVAILABLE"];
        for (let unitIdx = 1; unitIdx <= 4; unitIdx++) {
            await prisma.unit.create({
                data: {
                    floorId: floor.id,
                    unitNo: `A${floorNo}0${unitIdx}`,
                    type: unitIdx === 4 ? "PENTHOUSE" : "APARTMENT",
                    status: floorNo === 1 && unitIdx === 2 ? "BOOKED" : "AVAILABLE",
                    sizeSqft: unitIdx === 4 ? 2400 : 1200 + (unitIdx * 100),
                    bedrooms: unitIdx >= 3 ? 3 : 2,
                    bathrooms: unitIdx >= 3 ? 3 : 2,
                    facing: ["East", "West", "North", "South"][unitIdx - 1],
                    basePrice: unitIdx === 4 ? 12000000 : 5000000 + (floorNo * 200000),
                    currentPrice: unitIdx === 4 ? 12000000 : 5000000 + (floorNo * 200000),
                    hasParking: true,
                    parkingNo: `P${floorNo}0${unitIdx}`,
                },
            });
        }
    }
    console.log("✅ Project, tower, floors, and units created");
    const clients = await Promise.all([
        prisma.client.create({
            data: { companyId: company.id, name: "Karim Ahmed", phone: "+8801712345678", email: "karim@example.com", address: "Dhanmondi, Dhaka", occupation: "Business" },
        }),
        prisma.client.create({
            data: { companyId: company.id, name: "Rina Begum", phone: "+8801887654321", email: "rina@example.com", address: "Mirpur, Dhaka", occupation: "Doctor" },
        }),
        prisma.client.create({
            data: { companyId: company.id, name: "Farhan Hassan", phone: "+8801611223344", email: "farhan@example.com", address: "Uttara, Dhaka", occupation: "Engineer" },
        }),
    ]);
    console.log("✅ Demo clients created");
    const leadNames = ["Arif Rahman", "Sadia Islam", "Tanvir Hossain", "Nafisa Khan", "Mehedi Hasan", "Sumaiya Akter", "Raihan Chowdhury", "Mitu Begum", "Jubayer Ahmed", "Rezwana Parvin", "Saiful Islam", "Nusrat Jahan"];
    const leadStages = ["NEW", "CONTACTED", "QUALIFIED", "SITE_VISIT_SCHEDULED", "SITE_VISIT_DONE", "NEGOTIATION", "BOOKING_PENDING", "WON", "LOST", "HOLD", "NEW", "CONTACTED"];
    const leadPriorities = ["HOT", "HIGH", "MEDIUM", "HIGH", "MEDIUM", "HOT", "HIGH", "MEDIUM", "LOW", "MEDIUM", "HIGH", "LOW"];
    const leadSources = ["FACEBOOK", "WEBSITE", "REFERRAL", "WHATSAPP", "DIRECT", "INSTAGRAM", "CALL", "WALK_IN", "FACEBOOK", "WEBSITE", "REFERRAL", "DIRECT"];
    const propertyTypes = ["APARTMENT", "PENTHOUSE", "APARTMENT", "DUPLEX", "APARTMENT", "PENTHOUSE", "APARTMENT", "APARTMENT", "APARTMENT", "DUPLEX", "APARTMENT", "APARTMENT"];
    const locations = ["Bashundhara", "Gulshan", "Dhanmondi", "Banani", "Uttara", "Mirpur", "Motijheel", "Mohakhali", "Bashundhara", "Gulshan", "Dhanmondi", "Uttara"];
    const leads = [];
    for (let i = 0; i < 12; i++) {
        const lead = await prisma.lead.create({
            data: {
                companyId: company.id,
                assignedToId: admin.id,
                name: leadNames[i],
                phone: `+880171${String(i + 1).padStart(7, "0")}`,
                email: `${leadNames[i].toLowerCase().replace(" ", ".")}@example.com`,
                source: leadSources[i],
                stage: leadStages[i],
                priority: leadPriorities[i],
                score: 40 + (i * 5),
                budget: 4000000 + (i * 500000),
                budgetMin: 3000000 + (i * 400000),
                budgetMax: 6000000 + (i * 600000),
                locationPref: locations[i],
                propertyType: propertyTypes[i],
                bedrooms: i % 3 === 0 ? 3 : 2,
                notes: `Looking for ${propertyTypes[i].toLowerCase()} in ${locations[i]}. Budget flexible.`,
                tags: i % 3 === 0 ? ["vip", "urgent"] : i % 2 === 0 ? ["follow-up"] : ["new"],
                lastContactAt: i < 8 ? new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000) : null,
                followUpAt: i < 6 ? new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000) : null,
            },
        });
        leads.push(lead);
    }
    for (let i = 0; i < 4; i++) {
        await prisma.leadActivity.create({
            data: {
                leadId: leads[i].id,
                userId: admin.id,
                type: ["CALL", "WHATSAPP", "EMAIL", "SITE_VISIT"][i],
                notes: ["Called and discussed property options", "Sent project brochure via WhatsApp", "Email follow-up sent with pricing", "Site visit conducted — very interested"][i],
                outcome: ["Interested, wants site visit", "Will visit next week", "Awaiting response", "Loved the project"][i],
                createdAt: new Date(Date.now() - (4 - i) * 24 * 60 * 60 * 1000),
            },
        });
    }
    for (let i = 0; i < 5; i++) {
        await prisma.followUp.create({
            data: {
                leadId: leads[i].id,
                userId: admin.id,
                title: ["Call back regarding pricing", "Send floor plan", "Confirm site visit", "Negotiate price", "Final decision follow-up"][i],
                description: "Follow up as discussed in last interaction",
                dueAt: new Date(Date.now() + (i - 1) * 24 * 60 * 60 * 1000),
                status: i === 0 ? "OVERDUE" : "PENDING",
                type: "FOLLOW_UP",
            },
        });
    }
    console.log("✅ Demo leads created");
    const categories = ["CONSTRUCTION", "MARKETING", "OFFICE", "UTILITIES"];
    for (let i = 0; i < 8; i++) {
        await prisma.expense.create({
            data: {
                companyId: company.id,
                projectId: project.id,
                category: categories[i % categories.length],
                description: `${categories[i % categories.length].toLowerCase().replace("_", " ")} expense ${i + 1}`,
                amount: 50000 + (i * 25000),
                date: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000),
                status: i < 5 ? "PAID" : "PENDING",
            },
        });
    }
    console.log("✅ Demo expenses created");
    for (let i = 0; i < 5; i++) {
        const empDepts = ["Sales", "Finance", "HR", "Construction", "IT"];
        const empDesigs = ["Executive", "Manager", "Analyst", "Engineer", "Officer"];
        await prisma.employee.create({
            data: {
                companyId: company.id,
                empId: `EMP-${String(i + 1).padStart(4, "0")}`,
                name: `Employee ${i + 1}`,
                email: `emp${i + 1}@horizondevelopers.com`,
                phone: `+8801500${String(i + 1).padStart(6, "0")}`,
                department: empDepts[i],
                designation: empDesigs[i],
                baseSalary: 30000 + (i * 10000),
                joinDate: new Date("2023-01-01"),
                status: "ACTIVE",
            },
        });
    }
    console.log("✅ Demo employees created");
    const notifications = [
        { title: "New Lead Assigned", message: "Lead Person 1 has been assigned to you from Facebook campaign", type: "INFO" },
        { title: "Installment Due Soon", message: "Karim Ahmed's installment of ৳500,000 is due in 3 days", type: "REMINDER" },
        { title: "Project Milestone", message: "Skyline Heights Residency has reached 45% construction progress", type: "SUCCESS" },
        { title: "Payment Received", message: "Payment of ৳1,200,000 received from Rina Begum — Receipt: RCP-2024-00001", type: "SUCCESS" },
        { title: "Budget Alert", message: "Project SHR-2024 has used 68% of its construction budget", type: "WARNING" },
    ];
    for (const notif of notifications) {
        await prisma.notification.create({
            data: {
                companyId: company.id,
                userId: admin.id,
                title: notif.title,
                message: notif.message,
                type: notif.type,
            },
        });
    }
    console.log("✅ Demo notifications created");
    console.log("\n🎉 Seed completed successfully!");
    console.log("\n📋 Demo Login Credentials:");
    console.log("   Email: demo@buildestate.com");
    console.log("   Password: Demo@12345");
    console.log("\n🌐 Swagger API Docs: http://localhost:4000/api/docs");
}
main()
    .catch((e) => { console.error("Seed failed:", e); process.exit(1); })
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map