import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  ChangeDetectionStrategy,
  DestroyRef,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  Education,
  Experience,
  Hobby,
  Language,
  Resume,
  Skill,
} from '../../../../core/interfaces/models';
import { ResumeService } from '../../../../core/services/resume';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, Observable, of, switchMap } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { ResumeActions } from '../../../../core/store/resume.actions';
import { selectIsLoading } from '../../../../core/store/resume.selectors';

export interface Section {
  key: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Editor implements OnInit {
  private readonly fb = inject(FormBuilder);
  private resumeService = inject(ResumeService);
  private route = inject(ActivatedRoute);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private changeDetectionRef = inject(ChangeDetectorRef);
  private resumeId!: number;
  private store = inject(Store);
  private actions$ = inject(Actions);

  public isLoading$ = this.store.select(selectIsLoading);

  public mainSections: Section[] = [
    { key: 'education', label: 'Education', icon: 'school' },
    { key: 'experience', label: 'Experience', icon: 'work' },
    { key: 'skills', label: 'Skills', icon: 'build' },
    { key: 'languages', label: 'Languages', icon: 'language' },
    { key: 'hobbies', label: 'Hobbies', icon: 'sports_esports' },
  ];

  public createEducationGroup = (data?: Education): FormGroup => {
    return this.fb.group({
      id: [data?.id || null],
      resumeId: [this.resumeId],
      university: [data?.university || '', Validators.required],
      degree: [data?.degree || '', Validators.required],
      startDate: [data?.startDate || null],
      endDate: [data?.endDate || null],
    });
  };

  public createExperienceGroup = (data?: Experience): FormGroup => {
    return this.fb.group({
      id: [data?.id || null],
      resumeId: [this.resumeId],
      company: [data?.company || '', Validators.required],
      role: [data?.role || '', Validators.required],
      duration: [data?.duration || '', Validators.required],
      description: [data?.description || ''],
    });
  };

  public createSkillGroup = (data?: Skill): FormGroup => {
    return this.fb.group({
      id: [data?.id || null],
      resumeId: [this.resumeId],
      name: [data?.name || '', Validators.required],
      level: [data?.level || '', Validators.required],
    });
  };

  public createLanguageGroup = (data?: Language): FormGroup => {
    return this.fb.group({
      id: [data?.id || null],
      resumeId: [this.resumeId],
      language: [data?.language || '', Validators.required],
      level: [data?.level || '', Validators.required],
    });
  };

  public createHobbieGroup = (data?: Hobby): FormGroup => {
    return this.fb.group({
      id: [data?.id || null],
      resumeId: [this.resumeId],
      name: [data?.name || '', Validators.required],
    });
  };

  public resumeForm: FormGroup = this.fb.group({
    education: this.fb.array([]),
    experience: this.fb.array([]),
    skills: this.fb.array([]),
    languages: this.fb.array([]),
    hobbies: this.fb.array([]),
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.resumeId = Number(idParam);
      this.store.dispatch(ResumeActions.loadResume({ id: this.resumeId }));
      this.listenToLoadSuccess();
    }
    this.setupFormStream();
  }

  private setupFormStream(): void {
    this.resumeForm.valueChanges
      .pipe(debounceTime(200), takeUntilDestroyed(this.destroyRef))
      .subscribe((formData) => {
        this.store.dispatch(ResumeActions.updateResumeLocalState({ resume: formData }));
      });
  }

  public onSectionOpen(sectionKey: string): void {
    const formArray = this.getFormArray(sectionKey);

    if (formArray.length === 0) {
      this.addItem(sectionKey);
    }
  }

  private listenToLoadSuccess(): void {
    this.actions$
      .pipe(ofType(ResumeActions.loadResumeSuccess), takeUntilDestroyed(this.destroyRef))
      .subscribe(({ resume }) => {
        this.fillFormArray('skills', resume.skills || [], this.createSkillGroup);
        this.fillFormArray('education', resume.education || [], this.createEducationGroup);
        this.fillFormArray('experience', resume.experience || [], this.createExperienceGroup);
        this.fillFormArray('languages', resume.languages || [], this.createLanguageGroup);
        this.fillFormArray('hobbies', resume.hobbies || [], this.createHobbieGroup);
        this.changeDetectionRef.markForCheck();
      });
  }

  private fillFormArray<T>(key: string, data: T[], createGroupFn: (item: T) => FormGroup): void {
    const formArray = this.getFormArray(key);
    formArray.clear();

    const safeData = data || [];

    safeData.forEach((item) => {
      const group = createGroupFn(item);
      formArray.push(group);

      this.listenToGroupChanges(key, group);
    });
  }

  public getFormArray(key: string): FormArray {
    return this.resumeForm.get(key) as FormArray;
  }

  private listenToGroupChanges(sectionKey: string, group: FormGroup): void {
    group.valueChanges
      .pipe(
        debounceTime(1000),
        filter((val) => !!val.id),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        switchMap((val) => {
          return this.getUpdate(sectionKey, val.id, val);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => console.log(`${sectionKey} item updated`));
  }

  private getUpdate(sectionKey: string, id: number, data: unknown): Observable<unknown> {
    switch (sectionKey) {
      case 'skills':
        return this.resumeService.updateSkill(id, data as Skill);
      case 'experience':
        return this.resumeService.updateExperience(id, data as Experience);
      case 'education':
        return this.resumeService.updateEducation(id, data as Education);
      case 'languages':
        return this.resumeService.updateLanguage(id, data as Language);
      case 'hobbies':
        return this.resumeService.updateHobby(id, data as Hobby);
      default:
        console.warn(`no method for section: ${sectionKey}`);
        return of(null);
    }
  }

  private getDelete(sectionKey: string, id: number): Observable<unknown> {
    switch (sectionKey) {
      case 'skills':
        return this.resumeService.deleteSkill(id);
      case 'education':
        return this.resumeService.deleteEducation(id);
      case 'experience':
        return this.resumeService.deleteExperience(id);
      case 'languages':
        return this.resumeService.deleteLanguage(id);
      case 'hobbies':
        return this.resumeService.deleteHobby(id);
      default:
        console.warn(`no method for section: ${sectionKey}`);
        return of(null);
    }
  }

  public addItem(sectionKey: string): void {
    const baseData = { resumeId: this.resumeId };

    switch (sectionKey) {
      case 'skills': {
        const skillPayload = {
          ...baseData,
          name: '',
          level: 'Beginner' as const,
        };
        this.resumeService.addSkill(skillPayload).subscribe((response: { skill: Skill }) => {
          const group = this.createSkillGroup(response.skill);
          this.addAndListen('skills', group);
        });
        break;
      }

      case 'education': {
        const eduPayload = {
          ...baseData,
          university: '',
          degree: '',
          startDate: null,
          endDate: null,
        };
        this.resumeService
          .addEducation(eduPayload)
          .subscribe((response: { message: string; education: Education }) => {
            const group = this.createEducationGroup(response.education);
            this.addAndListen('education', group);
          });
        break;
      }

      case 'experience': {
        const expPayload = {
          ...baseData,
          company: '',
          role: '',
          duration: '',
        };
        this.resumeService
          .addExperience(expPayload)
          .subscribe((response: { message: string; experience: Experience }) => {
            const group = this.createExperienceGroup(response.experience);
            this.addAndListen('experience', group);
          });
        break;
      }

      case 'languages': {
        const langPayload = { ...baseData, language: '', level: '' };
        this.resumeService
          .addLanguage(langPayload)
          .subscribe((response: { message: string; language: Language }) => {
            const group = this.createLanguageGroup(response.language);
            this.addAndListen('languages', group);
          });
        break;
      }

      case 'hobbies': {
        const hobbyPayload = { ...baseData, name: '' };
        this.resumeService
          .addHobby(hobbyPayload)
          .subscribe((response: { message: string; hobby: Hobby }) => {
            const group = this.createHobbieGroup(response.hobby);
            this.addAndListen('hobbies', group);
          });
        break;
      }
    }
  }

  private addAndListen(sectionKey: string, group: FormGroup): void {
    this.getFormArray(sectionKey).push(group);
    this.listenToGroupChanges(sectionKey, group);
    this.changeDetectionRef.markForCheck();
  }

  public removeItem(key: string, index: number): void {
    const array = this.getFormArray(key);
    const item = array.at(index).value;

    this.getDelete(key, item.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          array.removeAt(index);

          this.changeDetectionRef.markForCheck();
        },
        error: (err) => {
          console.error('failed to delete item', err);
        },
      });
  }

  public get isValid(): boolean {
    return this.resumeForm.valid;
  }

  public markAsTouched(): void {
    this.resumeForm.markAllAsTouched();
  }

  public getSectionControl(key: string): AbstractControl | null {
    return this.resumeForm.get(key);
  }
}
