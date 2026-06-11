import { HrService } from './hr.service';
export declare class HrController {
    private service;
    constructor(service: HrService);
    stats(req: any): Promise<{
        totalEmployees: any;
        activeEmployees: any;
        presentToday: any;
        pendingLeaves: any;
    }>;
    leaves(req: any, q: any): Promise<any>;
    createLeave(req: any, dto: any): Promise<any>;
    updateLeave(id: string, dto: any): Promise<any>;
}
