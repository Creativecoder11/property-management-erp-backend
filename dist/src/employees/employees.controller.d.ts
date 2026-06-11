import { EmployeesService } from './employees.service';
export declare class EmployeesController {
    private service;
    constructor(service: EmployeesService);
    findAll(req: any, q: any): Promise<{
        data: any;
        total: any;
        page: number;
    }>;
    findOne(id: string, req: any): Promise<any>;
    create(req: any, dto: any): Promise<any>;
    update(id: string, req: any, dto: any): Promise<any>;
    attendance(req: any, dto: any): Promise<any>;
    payroll(req: any, dto: any): Promise<any>;
}
