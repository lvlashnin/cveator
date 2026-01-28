export interface BaseEntity {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface User extends BaseEntity {
  username: string;
  loginEmail: string;
  passwordHash: string;
  personalDetails?: PersonalDetails;
  resumes?: Resume[];
}

export interface PersonalDetails extends BaseEntity {
  userId: number;
  fullName: string;
  workEmail: string;
  phone: string;
  address?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Resume extends BaseEntity {
  userId: number;
  user?: User;
  title: string;
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: Skill[];
  languages?: Language[];
  hobbies?: Hobby[];
}

export interface Experience extends BaseEntity {
  resumeId: number;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Education extends BaseEntity {
  resumeId: number;
  university: string;
  degree: string;
  startDate: Date | null;
  endDate: Date | null;
}

export interface Skill extends BaseEntity {
  resumeId: number;
  name: string;
  level: SkillLevel;
}

export interface Language extends BaseEntity {
  resumeId: number;
  language: string;
  level: string;
}

export interface Hobby extends BaseEntity {
  resumeId: number;
  name: string;
}

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Expert';
export type LanguageLeve = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
