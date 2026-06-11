import { ConstructionService } from './construction.service';
export declare class ConstructionController {
    private service;
    constructor(service: ConstructionService);
    progress(id: string, q: any): Promise<{
        data: any;
        total: any;
    }>;
    createProgress(req: any, dto: any): Promise<any>;
    workOrders(req: any, q: any): Promise<any>;
    createWorkOrder(dto: any): Promise<any>;
    updateWorkOrder(id: string, dto: any): Promise<any>;
}
