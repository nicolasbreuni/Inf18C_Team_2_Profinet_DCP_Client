import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {Device} from '../entities/device';
import {DeviceInfo} from '../entities/device-info';
import {environment} from '../../environments/environment';
import {map, switchMap, toArray} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DeviceService {
    constructor(private httpClient: HttpClient) {
    }

    /**
     * Makes http get request to backend and fetches the device list.
     */
    public getDeviceList(): Observable<Device[]> {
        return this.httpClient
            .get<{ ip_addr: string, nameOfStation: string }[]>(`${environment.apiUrl}devices`)
            .pipe(
                switchMap(devices => from(devices)),
                map(device => ({name: device.nameOfStation, ip: device.ip_addr})),
                toArray(),
            );
    }

    /**
     * Makes http get request to backend and fetches the specific device information for given device,
     */
    public getDevice(device: Device): Observable<DeviceInfo> {
        return this.httpClient
            .get<{
                ip_addr: string,
                nameOfStation: string,
                mac_addr: string,
                subnetmask: string,
                vendorValue: string,
                deviceRole: string,
            }>(`${environment.apiUrl}devices?ip=${device.ip}`)
            .pipe(
                map(device2 => ({
                    name: device2.nameOfStation,
                    ip: device2.ip_addr,
                    mac: device2.mac_addr,
                    subnetMask: device2.subnetmask,
                    vendorValue: device2.vendorValue,
                    deviceRole: device2.deviceRole
                }))
            );
    }

    /**
     * Makes http call to refresh device list in backend.
     */
    public refresh(): Observable<null> {
        return this.httpClient.get<null>(`${environment.apiUrl}devices/refresh`);
    }
}
