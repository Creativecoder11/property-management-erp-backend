import { UnitsService } from './units.service';
export declare class UnitsController {
    private service;
    constructor(service: UnitsService);
    findAll(req: any, q: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
    }>;
    matrix(id: string): Promise<any>;
    findOne(id: string): Promise<any>;
    create(dto: any): Promise<any>;
    update(id: string, dto: any): Promise<any>;
    updateStatus(id: string, body: any): Promise<any>;
}
