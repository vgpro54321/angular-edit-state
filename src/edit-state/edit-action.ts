export class EditAction {
  editControl: string;
  editing: boolean = false;
  model: any;

  constructor(
    editControl: string,
    editing: boolean = false,
    model: any = undefined
  ) {
    this.editControl = editControl;
    this.editing = editing;
    this.model = model;
  }
}
