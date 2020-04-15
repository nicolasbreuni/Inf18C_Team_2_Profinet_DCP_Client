import {Component} from '@angular/core';
import {Network} from './entities/network';
import {Device} from './entities/device';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'dcp-client-frontend';
    networks: Network[] = [
        {name: 'Netzwerk 1', devices: [{name: 'Gerät 1', ip: '192.168.178.2'}, {name: 'Gerät 2', ip: '192.168.178.43'}]},
        {name: 'Netzwerk 2', devices: [{name: 'Gerät 1', ip: '192.168.178.9'}, {name: 'Gerät 2', ip: '192.168.178.90'}]},
        {name: 'Netzwerk 3', devices: [{name: 'Gerät 1', ip: '192.168.178.10'}, {name: 'Gerät 2', ip: '192.168.178.56'}]}
    ];
    selectedNetwork: Network;
    selectedDevice: Device;
}
