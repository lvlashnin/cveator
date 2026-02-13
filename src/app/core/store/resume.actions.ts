import { Resume } from '../interfaces/models';
import { createAction, props } from '@ngrx/store';

export const ResumeActions = {
  loadResume: createAction('[Editor Page] Load Resume', props<{ id: number }>()),
  loadResumeSuccess: createAction('[Resume API] Load Resume Success', props<{ resume: Resume }>()),
  loadResumeFailure: createAction('[Resume API] Load Resume Failure', props<{ error: string }>()),
  updateResumeLocalState: createAction(
    '[Editor Form] Update Local State',
    props<{ resume: Partial<Resume> }>(),
  ),
};
