import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.title).not.toBeNull();
  });

  it('should open the network details after click', () => {
    const network1 = de.query(By.css('.network'));
    expect(network1).not.toBeNull();

    network1.nativeElement.click();
    fixture.detectChanges();
    expect(de.query(By.css('.network-detail'))).not.toBeNull();
  });

  it('should have a device list in the network details', () => {
    const network1 = de.query(By.css('.network'));
    expect(network1).not.toBeNull();

    network1.nativeElement.click();
    fixture.detectChanges();
    expect(de.query(By.css('.devices'))).not.toBeNull();
  });

  it('should have the correct title', () => {
    const network1 = de.query(By.css('.network'));
    expect(network1).not.toBeNull();

    network1.nativeElement.click();
    fixture.detectChanges();

    const title = de.query(By.css('h2'));
    expect(title.nativeElement.innerText).toEqual(network1.nativeElement.innerText);
  });

  it('should have a title in the device list', () => {
    const network1 = de.query(By.css('.network'));
    expect(network1).not.toBeNull();
    

    network1.nativeElement.click();
    fixture.detectChanges();

    const device1 = de.query(By.css('.device'));
    expect(device1).not.toBeNull();

    device1.nativeElement.click();
    fixture.detectChanges();

    const title = de.query(By.css('h3'));
    expect(title.nativeElement.innerText).toEqual('Geräteinformationen');
  });

  it('should have a device name', () => {
    const network1 = de.query(By.css('.network'));
    expect(network1).not.toBeNull();
    

    network1.nativeElement.click();
    fixture.detectChanges();

    const device1 = de.query(By.css('.device'));
    expect(device1).not.toBeNull();
    
    device1.nativeElement.click();
    fixture.detectChanges();

    const deviceName = de.query(By.css('#deviceName'));
    expect(deviceName.nativeElement.innerText).toEqual('Gerätename:');
  });

  it('should have a device ip', () => {
    const network1 = de.query(By.css('.network'));
    expect(network1).not.toBeNull();
    

    network1.nativeElement.click();
    fixture.detectChanges();

    const device1 = de.query(By.css('.device'));
    expect(device1).not.toBeNull();
    
    device1.nativeElement.click();
    fixture.detectChanges();

    const deviceIP = de.query(By.css('#deviceIP'));
    expect(deviceIP.nativeElement.innerText).toEqual('Geräte-IP:');
  });

});
