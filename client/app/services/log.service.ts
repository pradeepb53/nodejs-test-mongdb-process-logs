import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import {iLog} from './../shared/interfaces';
import 'rxjs/add/operator/map';

@Injectable()

export class LogService {

    constructor(private http: Http) {
        console.log('Log Service Initialized....');
    }
    
    getLogs() {
        return this.http.get('http://localhost:3000/api/logs')
            .map((res) => res.json());
    }

    addLog(newLog: any) {
        var headers = new Headers({'Content-Type': 'application/json'});
        //headers.append('Content-Type', 'application/json');
     return this.http.post('http://localhost:3000/api/log', JSON.stringify(newLog), {headers: headers})
     .map((res: any) => res.json());
    }

    updateLog(messageKey: any, updateLog: any) {
        var headers = new Headers({'Content-Type': 'application/json'});
      return this.http.put('http://localhost:3000/api/log/'+ messageKey, JSON.stringify(updateLog), {headers: headers})
      .map((res: any) => res.json());
    }

    deleteLog(id: any){
        return this.http.delete('http://localhost:3000/api/log/'+ id)
        .map((res) => res.json());
    }
}