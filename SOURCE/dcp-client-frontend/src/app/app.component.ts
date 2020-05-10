import {Component, OnInit} from '@angular/core';
import {Device} from './entities/device';
import {DeviceService} from './services/device.service';
import {DeviceInfo} from './entities/device-info';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'dcp-client-frontend';
    devices: Device[] = [];
    devicesLoading = false;
    selectedDevice: DeviceInfo;
    deviceLoading = false;

    constructor(private deviceService: DeviceService) {
    }

    /**
     * Angular component function that gets called when component is initialized.
     */
    public ngOnInit(): void {
        this.refreshList();
    }

    /**
     * Loads device list from DeviceService.
     */
    public refreshList(): void {
        this.devicesLoading = true;
        this.deviceService.getDeviceList().subscribe(devices => {
            this.devicesLoading = false;
            this.devices = devices;
        }, error => window.alert('Es gab einen Fehler!!!'));
    }

    /**
     * Loads device information for given device from DeviceService.
     */
    public selectDevice(device: Device) {
        this.deviceLoading = true;
        this.deviceService.getDevice(device).subscribe(info => {
            this.deviceLoading = false;
            this.selectedDevice = info;
        }, error => window.alert('Es hab einen Fehler!!!'));
    }

    /**
     * Makes refresh request to backend. When it completes it refreshes the device list.
     */
    public refresh(): void {
        this.devicesLoading = true;
        this.deviceService.refresh().subscribe(() => {
            this.devicesLoading = false;
            this.refreshList();
        }, error => window.alert('Es hab einen Fehler!!!'));
    }
}
