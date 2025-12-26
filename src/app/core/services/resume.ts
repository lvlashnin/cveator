import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Resume } from '../interfaces/resume';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private readonly STORAGE_KEY = 'resume_draft';
  private formData$ = new BehaviorSubject<Resume | null>(this.loadFromStorage());

  private loadFromStorage(): Resume | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  public saveToStorage(data: Resume): void {
    const resumeDraft = JSON.stringify(data);
    try {
      localStorage.setItem(this.STORAGE_KEY, resumeDraft);
      this.formData$.next(data);
    } catch (error) {
      console.error('fail to save in localStor', error);
    }
  }

  public clearStorage(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.formData$.next(null);
  }

  public getLastFormData(): Resume | null {
    return this.formData$.value;
  }

  public setFormData(value: Resume): void {
    this.formData$.next(value);
  }

  public getFormData(): Observable<Resume | null> {
    return this.formData$.asObservable();
  }
}
