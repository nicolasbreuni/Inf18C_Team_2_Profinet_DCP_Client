import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Device } from './entities/device';
import { DeviceInfo } from './entities/device-info';
import { DeviceService } from './services/device.service';

class MockDeviceService {
  public getDeviceList(): Observable<Device[]> {
    return of([
      {name: 'Device 1', ip: '192.168.2.2'},
      {name: 'Device 2', ip: '192.168.2.3'},
      {name: 'Device 3', ip: '192.168.2.4'},
  ]);
  }

  public getDevice(device: Device): Observable<DeviceInfo> {
    return of({
      name: device.name,
      ip: device.ip,
      mac: '23:23:23:23:23',
      subnetMask: '255.255.255.0',
      vendorValue: '',
      deviceRole: ''
  });
  }
  
  public refresh(): Observable<null> {
    return of(null);
  }  
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let deviceService: MockDeviceService;

  beforeEach(async(() => {
    deviceService = new MockDeviceService();
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: DeviceService, useValue: deviceService}
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

  it('should refresh', () => {
    spyOn(deviceService, 'refresh').and.returnValue(of(null));
    const refreshButton = de.query(By.css('.refresh-button img'));
    expect(refreshButton).not.toBeNull();

    refreshButton.nativeElement.click();
    fixture.detectChanges();

    expect(deviceService.refresh).toHaveBeenCalled();
  });

  it('should open the device information after click', () => {
    const device = de.query(By.css('.device'));
    expect(device).not.toBeNull();

    device.nativeElement.click();
    fixture.detectChanges();

    expect(de.query(By.css('.device-info'))).not.toBeNull();
  });

  it('should have the correct title in device info', () => {
    const device = de.query(By.css('.device'));
    expect(device).not.toBeNull();

    device.nativeElement.click();
    fixture.detectChanges();

    const title = de.query(By.css('.device-info-header h3'));
    expect(title.nativeElement.innerText).toEqual('Geräteinformationen');
  });

  it('should have a device name', () => {
    const device = de.query(By.css('.device'));
    expect(device).not.toBeNull();   

    device.nativeElement.click();
    fixture.detectChanges();

    const deviceName = de.query(By.css('#deviceName'));
    expect(deviceName.nativeElement.innerText).toEqual('Gerätename:');
  });

  it('should have a device ip', () => {
    const device = de.query(By.css('.device'));
    expect(device).not.toBeNull(); 

    device.nativeElement.click();
    fixture.detectChanges();

    const deviceIP = de.query(By.css('#deviceIP'));
    expect(deviceIP.nativeElement.innerText).toEqual('Geräte-IP:');
  });

  it('should have a device mac adress', () => {
    const device = de.query(By.css('.device'));
    expect(device).not.toBeNull();   

    device.nativeElement.click();
    fixture.detectChanges();

    const mac = de.query(By.css('#mac'));
    expect(mac.nativeElement.innerText).toEqual('Mac:');
  });

  it('should have a device subnet mask', () => {
    const device = de.query(By.css('.device'));
    expect(device).not.toBeNull(); 

    device.nativeElement.click();
    fixture.detectChanges();

    const subnetMask = de.query(By.css('#subnetMask'));
    expect(subnetMask.nativeElement.innerText).toEqual('Subnet Mask:');
  });

  it('should have a device vendor value', () => {
    const device = de.query(By.css('.device'));
    expect(device).not.toBeNull(); 

    device.nativeElement.click();
    fixture.detectChanges();

    const vendorValue = de.query(By.css('#vendorValue'));
    expect(vendorValue.nativeElement.innerText).toEqual('Vendor Wert:');
  });

  it('should have a device role', () => {
    const device = de.query(By.css('.device'));
    expect(device).not.toBeNull();

    device.nativeElement.click();
    fixture.detectChanges();

    const deviceRole = de.query(By.css('#deviceRole'));
    expect(deviceRole.nativeElement.innerText).toEqual('Geräterolle:');
  });

});
