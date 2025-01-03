import { ComponentFactory, Directive, ViewContainerRef } from '@angular/core';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { WidgetContainerDirective } from 'src/app/directives/widget-container.directive';
import { ConfigManager } from 'src/app/services/data/config-manager';
import { WidgetFactoryComponent } from './widget-factory.component';
import { WidgetComponent } from './widget.component';
import { EventSubService } from 'src/app/services/eventsub/eventsub.service';

const spyContainer = jasmine.createSpyObj('viewContainerRef', [
  'clear',
  'createComponent',
]);
spyContainer.createComponent.and.returnValue({
  instance: {
    configManager: undefined,
    eventSubService: undefined,
    name: '',
    onActivate: () => {},
  } as WidgetComponent,
});

@Directive({
  selector: '[appWidgetContainer]',
  providers: [
    {
      provide: WidgetContainerDirective,
      useClass: WidgetContainerStubDirective,
    },
  ],
  standalone: false,
})
export class WidgetContainerStubDirective {
  viewContainerRef: ViewContainerRef;
  constructor() {
    this.viewContainerRef = spyContainer;
  }
}

describe('WidgetContainerComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetFactoryComponent, WidgetContainerStubDirective],
    }).compileComponents();
  }));

  it('should create a widget instance', () => {
    const fixture = TestBed.createComponent(WidgetFactoryComponent);
    const component = fixture.componentInstance;
    component.factory = {} as ComponentFactory<WidgetComponent>;
    component.configManager = {} as ConfigManager;
    component.eventSubService = {} as EventSubService;
    component.name = 'componentName';
    const internalComponent = spyContainer.createComponent(null).instance;
    const internalSpy = spyOn(internalComponent, 'onActivate');

    component.ngOnInit();
    expect(spyContainer.clear).toHaveBeenCalled();
    expect(spyContainer.createComponent).toHaveBeenCalledWith(
      component.factory
    );
    expect(internalComponent.configManager).toBe(component.configManager);
    expect(internalComponent.eventSubService).toBe(component.eventSubService);
    expect(internalComponent.name).toBe(component.name);
    expect(internalSpy).toHaveBeenCalled();
  });
});
