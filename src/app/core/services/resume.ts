import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Resume,
  Skill,
  Experience,
  Education,
  Language,
  Hobby,
  PersonalDetails,
  User,
} from '../interfaces/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';
  private formData$ = new BehaviorSubject<Resume | null>(null);

  public setResumeState(data: Resume): void {
    this.formData$.next(data);
  }
  public getResumeState(): Observable<Resume | null> {
    return this.formData$.asObservable();
  }

  public getAllResumes(): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.apiUrl}/resumes`);
  }

  public getResumeById(id: string | number): Observable<Resume> {
    return this.http.get<Resume>(`${this.apiUrl}/resumes/${id}`);
  }

  public createResume(): Observable<any> {
    const body = { title: 'Untitled Resume' };
    return this.http.post<{ message: string; id: number | string }>(`${this.apiUrl}/resumes`, body);
  }

  public updateResume(id: number | string, data: Resume): Observable<Resume> {
    return this.http.patch<Resume>(`${this.apiUrl}/resumes/${id}`, data);
  }

  public deleteResumeById(id: number | string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/resumes/${id}`);
  }

  public addSkill(skill: Partial<Skill>): Observable<{ message: string; skill: Skill }> {
    return this.http.post<{ message: string; skill: Skill }>(`${this.apiUrl}/skills`, skill);
  }

  public updateSkill(id: number, changes: Partial<Skill>) {
    return this.http.patch(`${this.apiUrl}/skills/${id}`, changes);
  }

  public deleteSkill(id: number) {
    return this.http.delete(`${this.apiUrl}/skills/${id}`);
  }

  public addExperience(changes: Partial<Experience>): Observable<any> {
    return this.http.post(`${this.apiUrl}/experiences`, changes);
  }

  public updateExperience(id: number, changes: Partial<Experience>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/experiences/${id}`, changes);
  }

  public deleteExperience(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/experiences/${id}`);
  }

  public addEducation(edu: Partial<Education>): Observable<any> {
    return this.http.post(`${this.apiUrl}/educations`, edu);
  }

  public updateEducation(id: number, changes: Partial<Education>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/educations/${id}`, changes);
  }

  public deleteEducation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/educations/${id}`);
  }

  public addLanguage(lang: Partial<Language>): Observable<any> {
    return this.http.post(`${this.apiUrl}/languages`, lang);
  }

  public updateLanguage(id: number, changes: Partial<Language>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/languages/${id}`, changes);
  }

  public deleteLanguage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/languages/${id}`);
  }

  public addHobby(hobby: Partial<Hobby>): Observable<any> {
    return this.http.post(`${this.apiUrl}/hobbies`, hobby);
  }

  public updateHobby(id: number, changes: Partial<Hobby>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/hobbies/${id}`, changes);
  }

  public deleteHobby(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/hobbies/${id}`);
  }

  public getPersonalDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/personal-details`);
  }

  public updatePersonalDetails(changes: Partial<PersonalDetails>): Observable<any> {
    return this.http.patch(`${this.apiUrl}/personal-details/`, changes);
  }

  //   public getUserProfile(): Observable<User> {
  //     return this.http.get<User>(`${this.apiUrl}/users/}`);
  //   }
}
