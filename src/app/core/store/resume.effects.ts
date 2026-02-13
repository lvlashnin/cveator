import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ResumeService } from '../services/resume';
import { ResumeActions } from './resume.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Resume } from '../interfaces/models';

@Injectable()
export class ResumeEffects {
  private actions$ = inject(Actions);
  private resumeService = inject(ResumeService);

  public loadResume$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResumeActions.loadResume),
      switchMap(({ id }) =>
        this.resumeService.getResumeById(id).pipe(
          map((resumeBackendData) => {
            const backendAny = resumeBackendData as any;
            const normalizedData: Resume = {
              ...resumeBackendData,
              personalDetails: resumeBackendData.user?.personalDetails,
              education: backendAny.educations || [],
              experience: backendAny.experiences || [],
              skills: backendAny.skills || [],
              languages: backendAny.languages || [],
              hobbies: backendAny.hobbies || [],
            };
            console.log('resumeActions.loadresume normalized Resume:', normalizedData);
            return ResumeActions.loadResumeSuccess({ resume: normalizedData });
          }),
          catchError((error) => of(ResumeActions.loadResumeFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
