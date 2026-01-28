import { Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { ResumeService } from '../../../../core/services/resume';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.html',
  styleUrl: './preview.scss',
  imports: [DatePipe],
})
export class Preview {
  private resumeService = inject(ResumeService);

  private resumeForm$ = this.resumeService.getResumeState();

  private details$ = this.resumeService.getUserProfile(1).pipe(map((user) => user.personalDetails));

  public data = toSignal(
    combineLatest([this.resumeForm$, this.details$]).pipe(
      map(([resumeData, personalDetails]) => {
        console.log('Combining data for preview:', { resumeData, personalDetails });
        return {
          ...resumeData,
          personalDetails: personalDetails,
        };
      }),
    ),
  );
}
