import { VendorsService } from './vendors.service';
export declare class VendorsController {
    private service;
    constructor(service: VendorsService);
    findAll(req: any, q: any): Promise<any>;
    getPOs(req: any): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    create(req: any, dto: any): Promise<any>;
    createPO(req: any, dto: any): Promise<any>;
    update(id: string, req: any, dto: any): Promise<any>;
}
