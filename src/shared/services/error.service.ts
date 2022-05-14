import { Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private readonly alertService: TuiAlertService) { }

  showError(error: any, label: string = 'An error occurred.'): void {
    this.alertService
      .open(error.error.message, {
        status: TuiNotification.Error,
        label: label,
      })
      .subscribe();
  }
}
