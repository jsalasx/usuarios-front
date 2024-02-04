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

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose,
    MatDialogTitle, MatDialogModule, MatFormFieldModule, FormsModule, MatButtonModule, MatInputModule,
    MatGridListModule, MatSelect, MatOption,ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  formularioUsuario: FormGroup;
  departamentos: Deparmento[] = [];
  cargos: Cargo[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private  fb: FormBuilder,
    private usuarioService: UserService,
    private departamentoService: DepartamentoService, 
    private cargoService: CargoService
  ) {
      this.formularioUsuario = this.fb.group({
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
  }  
  registrarUsuario () { 
    console.log("holaaaa");
    console.log(this.formularioUsuario.value);
    if (this.formularioUsuario.valid) {
      console.log("valido");
      this.usuarioService.saveUser(this.formularioUsuario.value).subscribe(data => {
        if(data.id) {
          console.log("creado!!!");
          Swal.fire({
            title: "Usuario Creado!",
            text: "El usuario ha sido creado satisfactoriamento!",
            icon: "success"
          });
          this.dialogRef.close();
        } else {
          Swal.fire({
              title: "Error al crear el Usuario.",
              text: "Error al crear el usuario comunicarse con soporte.",
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
