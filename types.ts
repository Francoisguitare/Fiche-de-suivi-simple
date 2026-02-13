export interface Lesson {
    id: number;
    title: string;
    duration: string;
    desc: string;
    videoId: string;
}

export type ViewState = 'list' | 'detail';

export type LessonStatus = 'locked' | 'current' | 'completed';