import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Editor } from './components/editor/editor';
import { Preview } from './components/preview/preview';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PdfService } from '../../core/services/pdf-service';
import { ResumeService } from '../../core/services/resume';

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
  ],
  templateUrl: './resume-builder.html',
  styleUrl: './resume-builder.scss',
})
export class ResumeBuilder {
  private PdfService = inject(PdfService);
  private ResumeService = inject(ResumeService);
  private UserName = this.ResumeService.getLastFormData()?.personalDetails.fullName;
  public isPdfDownloading = false;

  async downloadPdf() {
    this.isPdfDownloading = true;

    await this.PdfService.makePdfById('resume-preview', `cv_${this.UserName}`);

    this.isPdfDownloading = false;
  }
}
