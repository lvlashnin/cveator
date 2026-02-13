import { createReducer, on } from '@ngrx/store';
import { ResumeActions } from './resume.actions';
import { initialResumeState, ResumeState } from './resume.state';
import { Resume } from '../interfaces/models';

export const resumeReducer = createReducer<ResumeState>(
  initialResumeState,
  on(ResumeActions.loadResume, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ResumeActions.loadResumeSuccess, (state, { resume }) => ({
    ...state,
    loading: false,
    resume: resume,
  })),
  on(ResumeActions.loadResumeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(ResumeActions.updateResumeLocalState, (state, { resume }) => {
    if (!state.resume) return state;
    return {
      ...state,
      resume: {
        ...state.resume,
        ...resume,
      } as Resume,
    };
  }),
);
