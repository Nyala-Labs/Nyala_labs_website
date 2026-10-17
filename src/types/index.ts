export type SectionAnchor = {
  id: string;
  label: string;
};

export type Skill = {
  name: string;
  level: number;
  detail: string;
};

export type SkillCategory = {
  title: string;
  description: string;
  gradient: string;
  skills: Skill[];
};

export type Project = {
  title: string;
  subtitle: string;
  summary: string;
  details: string[];
  tags: string[];
  live: string;
  repo: string;
};

export type ExperienceEntry = {
  year: string;
  company: string;
  role: string;
  location: string;
  highlights: string[];
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
  type: 'milestone' | 'setback' | 'achievement';
};

export type Aim = {
  title: string;
  description: string;
  icon: string;
};

export type CommitteeMember = {
  _id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  order: number;
};

export type Activity = {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  image: string;
  speakers: string[];
};

export type EventHost = {
  name: string;
  avatarUrl: string | null;
};

export type ScrapedEvent = {
  id: string;
  title: string;
  coverImageUrl: string;
  eventUrl: string;
  startAt: string;
  endAt: string | null;
  timezone: string;
  locationName: string;
  hosts: EventHost[];
  source: string;
};

export type HeroMediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

export type LinkedInPost = {
  id: string;
  text: string;
  publishedAt: string;
  url: string;
  imageUrl: string | null;
  imageUrls: string[];
};
