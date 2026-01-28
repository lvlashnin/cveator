import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Editor } from './components/editor/editor';
import { Preview } from './components/preview/preview';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PdfService } from '../../core/services/pdf-service';
import { ResumeService } from '../../core/services/resume';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WarningDialog } from './components/warning-dialog/warning-dialog';

@Component({
  selector: 'app-resume-builder',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    Editor,
    Preview,
    RouterLink,
    MatDialogModule,
  ],
  templateUrl: './resume-builder.html',
  styleUrl: './resume-builder.scss',
})
export class ResumeBuilder {
  private PdfService = inject(PdfService);
  private resumeService = inject(ResumeService);
  private dialog = inject(MatDialog);
  public isPdfDownloading = false;

  @ViewChild(Editor) editorComponent!: Editor;

  public async downloadPdf() {
    if (!this.editorComponent.isValid) {
      this.editorComponent.markAsTouched();
      this.dialog.open(WarningDialog);
      return;
    }
    const userName =
      // this.resumeService.getLastFormData()?.personalDetails?.fullName || 'defaultName';
      (this.isPdfDownloading = true);

    await this.PdfService.makePdfById('resume-preview', `cv_${userName}`);

    this.isPdfDownloading = false;
  }
}
