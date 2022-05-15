import { ACTION_LIST, ACTION_RATING, ACTION_REVIEW, ACTION_WATCH } from 'src/shared/constants';

export type ActionType = typeof ACTION_REVIEW | typeof  ACTION_WATCH | typeof ACTION_RATING | typeof ACTION_LIST;

export type UserActionDto = {
  type: ActionType;

  createdAt: Date;

  authorId: number;
  authorName: string;
  authorAvatarPath: string;

  movieId: string;
  title: string;

  rating?: number;
  reviewTitle?: string;
  review?: string;

  listId?: number;
  listName?: string;
}