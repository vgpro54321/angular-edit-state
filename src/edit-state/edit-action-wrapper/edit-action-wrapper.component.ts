import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditAction } from '..';

@Component({
  selector: 'app-edit-action-wrapper',
  templateUrl: './edit-action-wrapper.component.html',
  styleUrls: ['./edit-action-wrapper.component.css'],
})
export class EditActionWrapperComponent implements OnInit, OnDestroy {
  @Input()
  editControl: string;

  @Input()
  template: TemplateRef<any>;

  editAction$: Observable<EditAction>;

  ngOnDestroySubject: ReplaySubject<boolean>;

  constructor(private store: Store) {
    this.ngOnDestroySubject = new ReplaySubject<boolean>();
  }

  ngOnInit(): void {
    this.editAction$ = this.store
      .select(
        (state) =>
          state.editState &&
          state.editState.editActions &&
          state.editState.editActions[this.editControl]
      )
      .pipe(takeUntil(this.ngOnDestroySubject))
      .pipe(tap((x) => console.log('app-edit-action-wrapper editActions$', x)));
  }

  ngOnDestroy(): void {
    this.ngOnDestroySubject.next(true);
    this.ngOnDestroySubject.complete();
  }
}
