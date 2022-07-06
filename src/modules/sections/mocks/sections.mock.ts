import { CreateSectionDto } from '../dto';

export const DEFAULT_CREATE_SECTIONS: CreateSectionDto[] = [
  { name: 'To Do', boardId: undefined },
  { name: 'In Progress', boardId: undefined },
  { name: 'Complete', boardId: undefined }
];
