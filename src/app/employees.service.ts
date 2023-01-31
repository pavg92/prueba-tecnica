import { Injectable } from '@angular/core';
import { Employees } from './db/employees.db';
import { Employee } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor() { }

  getAll(): Employee[] {
    return Employees;
  }

  add(newEmplo: Employee) {
    Employees.push(newEmplo);
  }

  updateEmplo(index: number, data: Employee){
    Employees[index] = data;
  }

  delete(index: number){
    Employees.splice(index, 1);
  }
}
