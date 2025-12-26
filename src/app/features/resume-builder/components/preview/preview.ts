import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ResumeService } from '../../../../core/services/resume';
// import { AsyncPipe } from '@angular/common';
import { Resume } from '../../../../core/interfaces/resume';
// import { Subscription } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
// import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-preview',
  // imports: [AsyncPipe],
  templateUrl: './preview.html',
  styleUrl: './preview.scss',
})
export class Preview {
  private resumeSrvice = inject(ResumeService);
  public formData = toSignal<Resume | null | undefined>(this.resumeSrvice.getFormData());
}
