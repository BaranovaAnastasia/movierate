import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUserApiService } from '../interfaces/IUserApiService';
import { User } from '../models/user/user';
import { UserStatistics } from '../models/user/user-statistics';

const mockStats: UserStatistics[] = [
  {
    movies: 450,
    hours: 1024,
    reviews: 42,
    genres: [
      {
        genre: 'Drama',
        watched: 150
      },
      {
        genre: 'Comedy',
        watched: 110
      },
      {
        genre: 'Horror',
        watched: 90
      },
      {
        genre: 'Historical',
        watched: 80
      },
      {
        genre: 'Other',
        watched: 20
      },
    ]
  },
  {
    movies: 500,
    hours: 2000,
    reviews: 10,
    genres: [
      {
        genre: 'Drama',
        watched: 200
      },
      {
        genre: 'Comedy',
        watched: 150
      },
      {
        genre: 'Romance',
        watched: 60
      },
      {
        genre: 'Horror',
        watched: 50
      },
      {
        genre: 'Historical',
        watched: 30
      },
      {
        genre: 'Other',
        watched: 10
      },
    ]
  }
]

const mockUsers: User[] = [
  {
    id: "0",
    name: "Rihanna Fenty",
    picture: "https://i.pinimg.com/564x/28/96/01/289601193f625459abb1b14d54b6b79f.jpg",
    statistics: mockStats[0],
    followingIds: ['1', '2', '3', '4', '5']
  },
  {
    id: "1",
    name: "Stefani Germanotta",
    picture: "https://i.pinimg.com/564x/2c/99/c3/2c99c312865403a2e73ecece33f244b0.jpg",
    statistics: mockStats[1],
    followingIds: ['0', '2', '3', '4', '5']
  },
  {
    id: "2",
    name: "Claire Boucher",
    picture: "https://i.pinimg.com/564x/0b/b9/35/0bb935e71429907e73e7486d662f0a6b.jpg",
    statistics: mockStats[0],
    followingIds: ['0', '1', '3', '4', '5']
  },
  {
    id: "3",
    name: "Tony Bennett",
    picture: "https://i.pinimg.com/564x/b2/4b/e0/b24be03fa20fa3faeaeb60502bf73758.jpg",
    statistics: mockStats[1],
    followingIds: ['0', '1', '2', '4', '5']
  },
  {
    id: "4",
    name: "Ashton Casey",
    picture: "https://i.pinimg.com/564x/3b/b3/cc/3bb3ccf00e13fd34d50a3fe5ddf18c73.jpg",
    statistics: mockStats[0],
    followingIds: ['0', '1', '2', '3', '5']
  },
  {
    id: "5",
    name: "Joe Alwyn",
    picture: "https://i.pinimg.com/564x/d3/b7/8e/d3b78e3833468f784a48182c2a30d9fb.jpg",
    statistics: mockStats[1],
    followingIds: ['0', '1', '2', '3', '4']
  }
]

@Injectable({
  providedIn: 'root'
})
export class UserMockApiService implements IUserApiService {
  getUserById(id: string): Observable<User> {
    return of(mockUsers.find(user => user.id === id)!);
  }
}
