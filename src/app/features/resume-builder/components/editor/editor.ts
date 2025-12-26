import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Resume } from '../../../../core/interfaces/resume';
import { ResumeService } from '../../../../core/services/resume';

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
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Editor implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();
  private ResumeService = inject(ResumeService);

  public mainSections: Section[] = [
    { key: 'personalDetails', label: 'Personal Details', icon: 'person' },
    { key: 'education', label: 'Education', icon: 'school' },
    { key: 'experience', label: 'Experience', icon: 'work' },
    { key: 'skills', label: 'Skills', icon: 'build' },
    { key: 'languages', label: 'Languages', icon: 'language' },
    { key: 'hobbies', label: 'Hobbies', icon: 'sports_esports' },
  ];

  public additionalSections: Section[] = [
    { key: 'profile', label: 'Profile', icon: 'person' },
    { key: 'courses', label: 'Courses', icon: 'school' },
    { key: 'internships', label: 'Internships', icon: 'work' },
    { key: 'activities', label: 'Extracurricular Activities', icon: 'accessibility_new' },
    { key: 'references', label: 'References', icon: 'group' },
    { key: 'qualities', label: 'Qualities', icon: 'star' },
    { key: 'certificates', label: 'Certificates', icon: 'workspace_premium' },
    { key: 'achievements', label: 'Achievements', icon: 'emoji_events' },
    { key: 'signature', label: 'Signature', icon: 'draw' },
  ];

  public createEducationGroup = (): FormGroup => {
    return this.fb.group({
      university: ['', Validators.required],
      degree: ['', Validators.required],
      year: [''],
    });
  };

  public createExperienceGroup = (): FormGroup => {
    return this.fb.group({
      company: ['', Validators.required],
      role: ['', Validators.required],
      duration: ['', Validators.required],
    });
  };

  public createSkillGroup = (): FormGroup => {
    return this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required],
    });
  };

  public createLanguageGroup = (): FormGroup => {
    return this.fb.group({
      language: ['', Validators.required],
      level: ['', Validators.required],
    });
  };

  public createHobbieGroup = (): FormGroup => {
    return this.fb.group({ name: ['', Validators.required] });
  };

  public resumeForm: FormGroup = this.fb.group({
    personalDetails: this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(7)]],
      title: ['', Validators.required],
      address: ['', Validators.required],
      summary: ['', Validators.required],
    }),
    education: this.fb.array([this.createEducationGroup()]),
    experience: this.fb.array([this.createExperienceGroup()]),
    skills: this.fb.array([this.createSkillGroup()]),
    languages: this.fb.array([this.createLanguageGroup()]),
    hobbies: this.fb.array([this.createHobbieGroup()]),
  });

  ngOnInit(): void {
    const dataFromLocalStorage = this.ResumeService.getLastFormData();

    if (dataFromLocalStorage) {
      this.patchFormWhithResume(dataFromLocalStorage);
    }

    this.resumeForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.ResumeService.setFormData(value as Resume);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private patchFormWhithResume(data: Resume) {
    this.resumeForm.patchValue(data);
  }

  public getFormArray(key: string): FormArray {
    return this.resumeForm.get(key) as FormArray;
  }

  public addItem(key: string, createGroup: () => FormGroup): void {
    this.getFormArray(key).push(createGroup());
  }

  public removeItem(key: string, index: number): void {
    this.getFormArray(key).removeAt(index);
  }

  public clearAll(): void {
    this.resumeForm.reset();
    this.ResumeService.clearStorage();
  }

  public saveDraft(): void {
    const currentData: Resume = this.resumeForm.getRawValue();
    console.log(currentData);
    this.ResumeService.saveToStorage(currentData);
  }

  public hasSection(sectionKey: string): boolean {
    return this.resumeForm.contains(sectionKey);
  }

  public addSection(sectionKey: string) {
    if (this.hasSection(sectionKey)) {
      return;
    }

    if (['signature', 'hobbies'].includes(sectionKey)) {
      this.resumeForm.addControl(sectionKey, this.fb.control(''));
    } else {
      this.resumeForm.addControl(sectionKey, this.fb.array([]));
    }
  }

  public removeSection(sectionKey: string) {
    this.resumeForm.removeControl(sectionKey);
  }
}
