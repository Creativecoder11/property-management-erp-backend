import { ClientsService } from './clients.service';
export declare class ClientsController {
    private service;
    constructor(service: ClientsService);
    findAll(req: any, q: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string, req: any): Promise<any>;
    create(req: any, dto: any): Promise<any>;
    update(id: string, req: any, dto: any): Promise<any>;
}
