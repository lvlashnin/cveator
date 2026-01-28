import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ResumeService } from '../../../../core/services/resume';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaskDirective } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-settings',
  imports: [MatFormFieldModule, NgxMaskDirective, MatInputModule, ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings implements OnInit {
  private fb = inject(FormBuilder);
  private resumeService = inject(ResumeService);
  private destroyRef = inject(DestroyRef);

  public personalDetails: FormGroup = this.fb.group({
    id: [null],
    userId: [null],
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    workEmail: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: ['', Validators.required],
    linkedin: [''],
    github: [''],
    website: [''],
  });

  ngOnInit(): void {
    const userId = 1;
    this.loadPersonalDetails(userId);
  }
  private loadPersonalDetails(userId: number): void {
    this.resumeService
      .getUserProfile(userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          if (user.personalDetails) {
            console.log('Profile loaded:', user.personalDetails);

            this.personalDetails.patchValue(user.personalDetails);

            if (!this.personalDetails.value.id) {
              this.personalDetails.patchValue({ id: user.personalDetails.id });
            }

            this.setupAutoSave();
          }
        },
        error: (err) => console.error('Error loading profile', err),
      });
  }

  private setupAutoSave(): void {
    this.personalDetails.valueChanges
      .pipe(
        debounceTime(1000),
        filter((val) => !!val.id),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        switchMap((formData) => {
          return this.resumeService.updatePersonalDetails(formData.id, formData);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        console.log('Profile settings auto-saved!');
      });
  }
}
