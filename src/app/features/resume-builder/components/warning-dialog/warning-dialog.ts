import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './warning-dialog.html',
  styleUrl: './warning-dialog.scss',
})
export class WarningDialog {}
