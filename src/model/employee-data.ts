import { Employee } from '../model/employee';

export class EmployeeData {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Object[];
}