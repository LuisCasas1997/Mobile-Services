import { NgModule } from '@angular/core';
import { SanitizeHtmlPipe } from './sanitize-hml.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  imports: [],
  declarations: [SanitizeHtmlPipe, TruncatePipe, TruncateTextPipe],
  exports: [SanitizeHtmlPipe, TruncatePipe, TruncateTextPipe],
})

export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
} 