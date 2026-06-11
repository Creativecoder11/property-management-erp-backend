import { ProjectsService } from './projects.service';
export declare class ProjectsController {
    private service;
    constructor(service: ProjectsService);
    findAll(req: any, q: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
        pages: number;
    }>;
    stats(req: any): Promise<{
        total: any;
        byStatus: any;
        totalUnits: any;
        availableUnits: any;
        soldUnits: number;
    }>;
    findOne(id: string, req: any): Promise<any>;
    create(req: any, dto: any): Promise<any>;
    update(id: string, req: any, dto: any): Promise<any>;
    remove(id: string, req: any): Promise<any>;
}
