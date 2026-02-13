import { Resume } from '../interfaces/models';

export interface ResumeState {
  resume: Resume | null;
  loading: boolean;
  error: string | null;
}

export const initialResumeState: ResumeState = {
  resume: null,
  loading: false,
  error: null,
};
