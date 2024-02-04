import { Component, Inject, OnInit } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatOption, MatSelect } from '@angular/material/select';
import { User } from '../interface/User';
import { ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { DepartamentoService } from '../services/departamento.service';
import { CargoService } from '../services/cargo.service';
import { Deparmento } from '../interface/Departamento';
import { Cargo } from '../interface/Cargo';

@Component({
  selector: 'app-dialog-edit',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose,
    MatDialogTitle, MatDialogModule, MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule,
    MatGridListModule, MatSelect, MatOption,ReactiveFormsModule],
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.scss'
})
export class DialogEditComponent implements OnInit {
  formularioUsuario: FormGroup;
  departamentos: Deparmento[] = [];
  cargos: Cargo[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    private  fb: FormBuilder,
    private usuarioService: UserService,
    private departamentoService: DepartamentoService, 
    private cargoService: CargoService,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {
      this.formularioUsuario = this.fb.group({
      id: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      primerNombre: ['', Validators.required],
      segundoNombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      idDepartamento: ['', Validators.required],
      idCargo: ['', Validators.required],
    });
   }

  ngOnInit(): void {
      this.cargarDepartamentos()
      this.cargarCargos()
      this.obtenerUsuarioActualizado(this.data.id ? this.data.id : 0)
  }  

  obtenerUsuarioActualizado(id:number) {
    this.usuarioService.getUserById(id).subscribe(data => {
      this.formularioUsuario.patchValue({
        id: data.id,
        usuario: data.usuario,
        email: data.email,
        primerNombre: data.primerNombre,
        segundoNombre: data.segundoNombre,
        primerApellido: data.primerApellido,
        segundoApellido: data.segundoApellido,
        idDepartamento: data.idDepartamento,
        idCargo: data.idCargo,
    });
    })
  }

  editarUsuario () { 
    console.log(this.formularioUsuario.value);
    if (this.formularioUsuario.valid) {
      console.log("valido");
      this.usuarioService.editUser(this.data.id ? this.data.id: 0,this.formularioUsuario.value).subscribe(data => {
        if(data.id) {
          console.log("editado!!!");
          Swal.fire({
            title: "Usuario Editado!",
            text: "El usuario ha sido editado satisfactoriamento!",
            icon: "success"
          });
          this.dialogRef.close();
        } else {
          Swal.fire({
              title: "Error al editar el usuario.",
              text: "Error al editar el usuario comunicarse con soporte.",
              icon: "error"
            });
        }
      })
    }
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
}
