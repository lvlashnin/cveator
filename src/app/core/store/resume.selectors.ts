import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ResumeState } from './resume.state';

export const selectResumeFeature = createFeatureSelector<ResumeState>('resume');

export const selectResumeData = createSelector(selectResumeFeature, (state) => state.resume);

export const selectIsLoading = createSelector(selectResumeFeature, (state) => state.loading);

export const selectError = createSelector(selectResumeFeature, (state) => state.error);
