import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ACTION_LIST, ACTION_REVIEW } from 'src/shared/constants';
import { UserActionDto } from 'src/shared/dto';
import { MoviesList, Review, User, UserAction } from 'src/shared/models';
import { UserActionApiService } from './user-action-api.service';

function getAuthor(actionDto: UserActionDto): User {
  return {
    id: actionDto.authorId,
    name: actionDto.authorName,
    avatar_path: actionDto.authorAvatarPath
  }
}

function getReview(actionDto: UserActionDto): Review | undefined {
  return actionDto.type === ACTION_REVIEW
    ? {
      created_at: new Date(actionDto.createdAt),
      movie_id: actionDto.movieId,
      rating: actionDto.rating!,
      review: actionDto.review!,
      title: actionDto.reviewTitle!,
      author: {
        id: actionDto.authorId,
        name: actionDto.authorName,
        avatar_path: actionDto.authorAvatarPath
      }
    } : undefined
}

function getList(actionDto: UserActionDto): MoviesList | undefined {
  return actionDto.type === ACTION_LIST
  ? {
    listId: actionDto.listId!,
    listName: actionDto.listName!
  } : undefined;
}

function actionDto2Action(actionDto: UserActionDto): UserAction {
  return {
    type: actionDto.type,
    createdAt: new Date(actionDto.createdAt),
    author: getAuthor(actionDto),
    movieId: actionDto.movieId,
    title: actionDto.title,
    rating: actionDto.rating! / 2,

    review: getReview(actionDto),
    list: getList(actionDto)
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserActionService {

  constructor(private actionApiService: UserActionApiService) { }

  getUserAction$(userId: number): Observable<UserAction[] | undefined> {
    return this.actionApiService.getUserAction$(userId)
      .pipe(
        map(results => results
          ?.map(result => actionDto2Action(result))
        )
      )
  }
}
