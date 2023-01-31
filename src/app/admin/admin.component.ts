import { Component } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  employees: Employee[] = [];
  dataEmployee: Employee = {
    id: 0,
    name: '',
    type: 0,
    active: false
  }
  textBtnSave:string = '';
  //Permite mostrar u ocultar el formulario
  showForm = false;
  //Indica si se esta editando un empleado
  editEmp = false;
  //index del empleado a esditar
  indexEmp = -1;

  constructor(private employeeServ: EmployeesService){
    this.employees = employeeServ.getAll();
    
  }

  change(index: number) {
    this.reset();
    //Si el index es -1 significa que es un nuevo empleado
    if(index == -1) {
      this.textBtnSave = 'Agregar';
    }else {
      this.textBtnSave = 'Modificar'
      this.dataEmployee = this.employees[index];
      this.indexEmp = index;
      this.editEmp = true;
    }
  }

  saveEmployee(){
    if(this.validations()){
      if(this.editEmp){
        this.employeeServ.updateEmplo(this.indexEmp, this.dataEmployee);
      }else {
        //genero el nuevo id
        this.dataEmployee.id = this.employees.length > 0 ? Math.max(...this.employees.map(emp => emp.id)) + 1 : 1;
        this.employeeServ.add(this.dataEmployee);
      }
      alert('Información Guardada!');
      this.reset();
    }
    
  }

  deleteEmployee(index:number){
    const conf = confirm(`¿Desea eliminar a ${this.employees[index].name}?`);
    if(conf){
      this.employeeServ.delete(index);
      alert('Empleado eliminado');
    }
  }

  validations(): boolean {
    if(this.dataEmployee.name === '' || this.dataEmployee.type === 0){
      alert('Favor de completar los campos');
      return false;
    }

    return true;
  }
  //resetea a los valores iniciales
  reset() {
    this.dataEmployee = {
      id: 0,
      name: '',
      type: 0,
      active: false
    }
    this.editEmp = false;
    this.indexEmp = -1;
    this.showForm = !this.showForm;
  }

}
