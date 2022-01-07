import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { InitializeEdit, BeginEdit, EndEdit } from '.';

@Injectable()
export class EditService {
  constructor(private store: Store) {}

  InitializeEdit(
    editControls: string[],
    reset: boolean = true
  ): Observable<any> {
    return this.store.dispatch(new InitializeEdit(editControls, reset));
  }

  BeginEdit(editControl: string, model: any): Observable<any> {
    return this.store.dispatch(new BeginEdit(editControl, model));
  }

  EndEdit(editControl: string): Observable<any> {
    return this.store.dispatch(new EndEdit(editControl));
  }
}
