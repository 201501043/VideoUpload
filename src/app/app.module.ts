import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoInputAreaComponent } from './video-input-area/video-input-area.component';
import { FlexitemDirective } from './directives/flexitem.directive';
import { TextareaComponent } from './textarea/textarea.component';
import { TagOptionComponent } from './tag-option/tag-option.component';
import { PillComponent } from './pill/pill.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoInputAreaComponent,
    FlexitemDirective,
    TextareaComponent,
    TagOptionComponent,
    PillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
