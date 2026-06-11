import { DocumentsService } from './documents.service';
export declare class DocumentsController {
    private service;
    constructor(service: DocumentsService);
    findAll(req: any, q: any): Promise<any>;
    create(req: any, dto: any): Promise<any>;
    remove(id: string, req: any): Promise<any>;
}
