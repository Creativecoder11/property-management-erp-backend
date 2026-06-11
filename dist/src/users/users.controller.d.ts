import { UsersService } from './users.service';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    findAll(req: any): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    create(req: any, dto: any): Promise<any>;
    update(id: string, req: any, dto: any): Promise<any>;
    deactivate(id: string, req: any): Promise<any>;
}
