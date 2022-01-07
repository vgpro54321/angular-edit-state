import { Component, OnInit, VERSION } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, pipe, tap } from 'rxjs';
import {
  BeginEdit,
  EditAction,
  EditStateModel,
  EndEdit,
  InitializeEdit,
} from '../edit-state';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  editState$: Observable<EditStateModel>;
  editActions$: Observable<[{ [name: string]: EditAction }]>;
  editActionTest$: Observable<EditAction>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new InitializeEdit(['test'], false));
    this.editState$ = this.store
      .select((state) => state.editState)
      .pipe(tap((x) => console.log('app-component currentEdits$', x)));
    this.editActions$ = this.store
      .select((state) => state.editState.editActions)
      .pipe(tap((x) => console.log('app-component editActions$', x)));
    this.editActionTest$ = this.store
      .select(
        (state) =>
          state.editState &&
          state.editState.editActions &&
          state.editState.editActions.test
      )
      .pipe(tap((x) => console.log('app-component editActionTest$', x)));
  }

  onSwitchEditing(beginEdit: boolean): void {
    if (beginEdit) {
      this.store.dispatch(
        new BeginEdit('test', { title: 'Hello From Caller.' })
      );
    } else {
      this.store.dispatch(new EndEdit('test'));
    }
  }
}
