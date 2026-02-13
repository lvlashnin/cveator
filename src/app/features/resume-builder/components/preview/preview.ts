import { Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { ResumeService } from '../../../../core/services/resume';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectResumeData } from '../../../../core/store/resume.selectors';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.html',
  styleUrl: './preview.scss',
  imports: [DatePipe],
})
export class Preview {
  private store = inject(Store);
  private resumeData$ = this.store.select(selectResumeData);
  public data = toSignal(this.resumeData$);
}
