import { Injectable } from '@angular/core';
import { State, StateContext, Action, createSelector } from '@ngxs/store';
import { produce } from 'immer';
import { EditAction } from '.';
import { EditStateModel } from './edit-state-model';

export class InitializeEdit {
  static readonly type = '[EditState] InitializeEdit';
  constructor(public editControls: string[], public reset: boolean = true) {}
}

export class BeginEdit {
  static readonly type = '[EditState] BeginEdit';
  constructor(public editControl: string, public model: any) {}
}

export class EndEdit {
  static readonly type = '[EditState] EndEdit';
  constructor(public editControl: string) {}
}

@State<EditStateModel>({
  name: 'editState',
  defaults: {
    editActions: {},
    currentEdits: 0,
  },
})
@Injectable()
export class EditState {
  constructor() {}

  @Action(InitializeEdit)
  initialize(
    ctx: StateContext<EditStateModel>,
    { editControls, reset }: InitializeEdit
  ) {
    const state = ctx.getState();

    ctx.setState(
      produce((draft) => {
        let editActions = draft.editActions;

        for (let editControl of editControls) {
          if (reset) {
            editActions[editControl] = new EditAction(editControl);
          } else {
            editActions[editControl] =
              editActions[editControl] || new EditAction(editControl);
          }
        }
      }, ctx.getState())
    );
  }

  @Action(BeginEdit)
  beginEdit(ctx: StateContext<EditStateModel>, action: BeginEdit): void {
    const state = ctx.getState();

    ctx.setState(
      produce((draft) => {
        let editActionOld = draft.editActions[action.editControl];

        let editAction = new EditAction(action.editControl, true, action.model);
        draft.editActions[action.editControl] = editAction;

        if (!editActionOld.editing) draft.currentEdits++;
      }, ctx.getState())
    );
  }

  @Action(EndEdit)
  endEdit(ctx: StateContext<EditStateModel>, action: EndEdit): void {
    const state = ctx.getState();

    ctx.setState(
      produce((draft) => {
        let editActionOld = draft.editActions[action.editControl];

        let editAction = new EditAction(action.editControl, false, undefined);
        draft.editActions[action.editControl] = editAction;

        if (editActionOld.editing) draft.currentEdits--;
      }, ctx.getState())
    );
  }

  static editAction(editControl: string) {
    return createSelector([EditState], (state: EditStateModel) => {
      return state.editActions[editControl];
    });
  }
}
