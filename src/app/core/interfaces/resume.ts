export interface Resume {
  personalDetails: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
  };
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  hobbies: Hobbies[];
  profile?: string;
  internships?: Experience[];
  references?: Reference[];
  certificates?: Certificate[];
  achievements?: string[];
  signature?: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: number;
}

export interface Education {
  university: string;
  degree: string;
  year?: number;
}

export interface Skill {
  name: string;
  level: string;
}

export interface Language {
  language: string;
  level: string;
}

export interface Reference {
  name: string;
  company: string;
  phone: string;
  email: string;
}

export interface Certificate {
  name: string;
  date: string;
}

export interface Hobbies {
  name: string;
}
