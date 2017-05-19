import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import {iLog} from './../shared/interfaces';
import 'rxjs/add/operator/map';

@Injectable()

export class LogService {

    constructor(private http: Http) {
        console.log('Log Service Initialized....');
    }
    
    /*getLogs() {
        return this.http.get('http://localhost:3000/api/logs')
            .map((res) => res.json());
    }*/

    getLogs(page: number) {
       return this.http.get('http://localhost:3000/api/logs')
            .map((res: Response)=> {
               let logs = res.json();
                let totalRows = this.getTotalRows(logs);
                logs = this.getCurrentPage(logs, page);
                return {
                    results: logs,
                    totalRows: totalRows,
                    page: page,
                }
            }); 
    }

     getTotalRows(data: [iLog]): number {
        return data.length;
    }

       getCurrentPage(data: iLog[], page: number): iLog[] {
        let arrayStart = (page - 1) * 5;
        console.log("Page is :" + page + " arrayStart : " + arrayStart);
        return data.slice(arrayStart, page * 5);
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