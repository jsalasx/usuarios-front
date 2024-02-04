import { NgForOf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user.service';
import { User } from '../interface/User';
import { Deparmento } from '../interface/Departamento';
import { DepartamentoService } from '../services/departamento.service';
import { Cargo } from '../interface/Cargo';
import { CargoService } from '../services/cargo.service';
import { DialogComponent } from '../dialog/dialog.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
interface Food {
  value: string;
  viewValue: string;
}

interface UserTable {
  id: number,
  usuario: string;
  nombres: string;
  apellidos: string;
  departamento: string;
  cargo: string;
  email: string;
  actions?: string;

}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [NgForOf, MatTableModule, FormsModule, MatInputModule, MatSelectModule,
    MatFormFieldModule, MatGridListModule, MatButtonModule, MatIconModule, DialogComponent, MatDialogModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent implements OnInit {
  page : number = 1; 
  maxPage: number = 0;
  usuarios: User[] = [];
  dataSource: UserTable[] = [];
  departamentos: Deparmento[] = [];
  cargos: Cargo[] = [];
  numeroDeRegistros = 0;
  animal: string = "hola";
  name: string = "holiwi";
  selectedDepartamentoId: number = 0;
  selectedCargoId: number = 0;
  constructor(private usuarioService: UserService,
    private departamentoService: DepartamentoService,
    private cargoService: CargoService, public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarDepartamentos();
    this.cargarCargos();
  }

  adelante() {  
    this.page = this.page + 1;
    if (this.page > this.maxPage) {
      this.page = this.maxPage;
      this.cargarUsuarios(this.maxPage,10,this.selectedDepartamentoId,this.selectedCargoId);
    } else {
      this.cargarUsuarios(this.page,10,this.selectedDepartamentoId,this.selectedCargoId);
    }
     
  }

  atras() {  
    this.page = this.page - 1;
    if (this.page < 1) {
      this.page = 1;
      this.cargarUsuarios(this.page,10,this.selectedDepartamentoId,this.selectedCargoId);
    } else {
      this.cargarUsuarios(1,10,this.selectedDepartamentoId,this.selectedCargoId);
    }
     
  }

  openDialogDelete(id: number): void {
    const dialogRefDelete = this.dialog.open(DialogDeleteComponent, {
      data: { id },
      position: { top: '50px' }
    });
    dialogRefDelete.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarUsuarios(this.page, 10, this.selectedDepartamentoId, this.selectedCargoId);
    });
  }

  openDialogEdit(userToEdit:User) {
    const dialogRefEdit = this.dialog.open(DialogEditComponent, {
      data: { ...userToEdit }
    });
    dialogRefEdit.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarUsuarios(this.page, 10, this.selectedDepartamentoId, this.selectedCargoId);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cargarUsuarios(this.page, 10, this.selectedDepartamentoId, this.selectedCargoId);
    });
  }

  

  onDepartamentoChange(event: { value: any; }) {
    let depId = parseInt(event.value);
    let carId = this.selectedCargoId;
    console.log(depId);
    this.dataSource = [];
    if (carId != 0) {
      this.cargarUsuarios(1, 10, depId, carId);
    } else {
      this.cargarUsuarios(1, 10, depId, 0);
    }
  }

  onCargoChange(event: { value: any; }) {
    let depId = this.selectedDepartamentoId
    let carId = parseInt(event.value);
    console.log(depId);
    this.dataSource = [];
    if (depId != 0) {
      this.cargarUsuarios(1, 10, depId, carId);
    } else {
      this.cargarUsuarios(1, 10, 0, carId);
    }
  }

  cargarUsuarios(pageNumber: number = 1, pageSize: number = 10, departamentoId: number = 0, cargoId: number = 0): void {
    this.usuarioService.getUsersPaginate(pageNumber, pageSize, departamentoId, cargoId).subscribe(data => {
      this.numeroDeRegistros = data.items.length;
      if (data.totalCount % data.pageSize === 0){
        this.maxPage =  Math.floor(data.totalCount / data.pageSize);
      } else {
        this.maxPage =  Math.floor(data.totalCount / data.pageSize) + 1;
      }
      
      this.dataSource = data.items.map(x => ({
        id: x.id ? x.id : 0,
        usuario: x.usuario,
        nombres: x.primerNombre,
        apellidos: x.primerApellido,
        departamento: x.departamento!.nombre,
        cargo: x.cargo!.nombre,
        email: x.email
      }));
      this.changeDetectorRef.detectChanges();
    });

  }

  cargarDepartamentos(): void {
    this.departamentoService.getDepartamentosAll().subscribe(data => {
      this.departamentos = data;
      //console.log(data);
    })
  }

  cargarCargos(): void {
    this.cargoService.getCargosAll().subscribe(data => {
      this.cargos = data;
      //console.log(data);
    })
  }

  displayedColumns: string[] = ['usuario', 'nombres', 'apellidos', 'departamento', 'cargo', 'email', 'actions'];
  editar(element: User) {
    console.log("Editar");
    console.log(element);
    this.openDialogEdit(element);
  }

  eliminar(element: User) {
    // console.log("eliminar");
    // console.log(element);
    let id = element.id;
    if (id) {
      this.openDialogDelete(id)
    }
  }

  nuevo() {
    //console.log("nuevo");
    this.openDialog();
  }
}

