// types/models.ts

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISession {
  id: string;
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress?: string;
  userAgent?: string;
  userId: string;
}

export interface IAccount {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  accessTokenExpiresAt?: string;
  refreshTokenExpiresAt?: string;
  scope?: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IVerification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum ELang {
  EN = 'en',
  ZH = 'zh',
}

export interface IStory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  authorId: string;
  originUrl?: string;
  lang: ELang;
  mature: boolean;
  cover: string;
  size: number;
  finished?: boolean;
}

export enum ECommentType {
  STORY = 'story',
  CHAPTER = 'chapter',
  PARAGRAPH = 'paragraph',
}

export interface IStoryComment {
  id: string;
  createdAt: string;
  content: string;
  storyId: string;
  userId: string;
}

export interface IChapterComment {
  id: string;
  createdAt: string;
  content: string;
  chapterId: string;
  userId: string;
}

export interface IParagraphComment {
  id: string;
  createdAt: string;
  content: string;
  paragraphId: string;
  userId: string;
}

export interface ITag {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITagValue {
  id: string;
  createdAt: string;
  updatedAt: string;
  tagId: string;
  lang: ELang;
  name: string;
}

export interface IChapter {
  id: string;
  index: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  storyId: string;
  viewCount: number;
  paragraphs: IParagraph[]
}

export interface IChapterLike {
  userId: string;
  chapterId: string;
  createdAt: string;
}

export enum EParagraphType {
  TEXT = 'text',
  IMAGE = 'image',
}

export interface IParagraph {
  id: string;
  index: number;
  type: EParagraphType;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  chapterId: string;
}
