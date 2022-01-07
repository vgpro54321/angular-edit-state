import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditState, EditService, EditActionWrapperComponent } from '.';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([EditState])],
  declarations: [EditActionWrapperComponent],
  providers: [EditService],
  exports: [EditActionWrapperComponent],
})
export class EditStateModule {}
