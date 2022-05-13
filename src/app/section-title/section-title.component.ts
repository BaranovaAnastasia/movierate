import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionTitleComponent {
  @Input() title!: string;
}
