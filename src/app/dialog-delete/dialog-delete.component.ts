import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
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
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { UserService } from '../services/user.service';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

interface DialogDeleteData {
  id: number;
}
@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [MatLabel, MatFormField, MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss'
})
export class DialogDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    private usuarioService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDeleteData,
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteUser() {
    this.usuarioService.deleteUser(this.data.id).subscribe(resp =>  {
         Swal.fire({
          title: "Usuario Eliminado!",
          text: "El usuario ha sido eliminado satisfactoriamento!",
          icon: "success"
        });
        this.dialogRef.close();
    });
  }
}
