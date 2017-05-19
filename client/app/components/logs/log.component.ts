import { Component, OnInit } from '@angular/core';

import {LogService} from '../../services/log.service';
import {iLog} from '../../shared/interfaces';


@Component({
  moduleId: module.id,
  selector: 'logs',
  templateUrl:'log.component.html',
  providers:[LogService],
})

export class LogComponent implements OnInit{
    private logs: iLog[];

    private messageKey: object; 
    private messageID: string;
    private messageType: string;
    private messageSeverity: number;
    private ipAddress: string;
    private messageDesc: string;

    private displayAddButton: boolean = false;
    private displayUpdateButton: boolean = false;

    public totalItems: number;
    public currentPage: number;
    
    constructor(private logService: LogService){
     // this.logs =[
       //   {message_id: "CPF2345", message_type:"Error", severity:40, from_ip:"10.2.3.15", message:"This is a test"},
         //  {message_id: "Some", message_type:"Info", severity:10, from_ip:"10.3.2.1", message:"Another test"},
          // {message_id: "Some more", message_type:"Dignostic", severity:30, from_ip:"192.168.100.1", message:"Fiber optic"},
         // ] ;
      
    }

     ngOnInit() {
       //this.currentPage = 1;
       //this.totalItems = 4;
        this. setPageProperty(1); 
     }

     public setPage(pageNo: number): void {
        this.currentPage = pageNo;
    }

      public pageChanged(event: any): void {
        //console.log('Page changed to: ' + event.page);
        //console.log('Number items per page: ' + event.itemsPerPage);
        this.setPageProperty(event.page);  
    }

    setPageProperty(page: number): void {
       this.logService.getLogs(page)
      .subscribe((response: any)=> {
         this.logs = response.results;
                this.totalItems = response.totalRows;
                this.currentPage = response.page;
      });
               
    }
     /*getLogs() {
        this.logService.getLogs()
      .subscribe(logs =>{
           this.logs = logs;
      });       
     }*/

    addLog() {
      var addLog = {
        message_id: this.messageID,
        message_type: this.messageType,
        severity: this.messageSeverity,
        from_ip: this.ipAddress,
        message: this.messageDesc
      }
      this.logService.addLog(addLog)
        .subscribe((log: any) => {
         // this.logs.push(log);
          this.setPageProperty(this.currentPage);
          this.clearFormFields();
          this.displayAddButton = false;
        });
    }

    deleteLog(id: any) {
      //var logs = this.logs;
      this.logService.deleteLog(id)
        .subscribe((data: any) => {
          /*if (data.n == 1) {
            for (var i = 0; i < logs.length; i++) {
               if(logs[i]._id == id){
                 logs.splice(i, 1);
               }
            }
          }*/
          this.setPageProperty(this.currentPage);
        });
    }

    displayUpdateLog(id: any) {
      var logs = this.logs;
      for (var i = 0; i < logs.length; i++) {
        if (logs[i]._id == id) {
          this.messageKey = id;
          this.messageID = logs[i].message_id;
          this.messageType = logs[i].message_type;
          this.messageSeverity = logs[i].severity;
          this.ipAddress = logs[i].from_ip;
          this.messageDesc = logs[i].message;
          break;
        }
      }
       this.displayUpdateButton = true;
    }
    updateLog() {
     var updateLog = {
        message_id: this.messageID,
        message_type: this.messageType,
        severity: this.messageSeverity,
        from_ip: this.ipAddress,
        message: this.messageDesc
      }

      this.logService.updateLog(this.messageKey, updateLog)
        .subscribe((log: any) => {
          //this.getLogs();
          this.setPageProperty(this.currentPage);
        });

     this.clearFormFields();
    }

    clearFormFields() {
      this.messageID = "";
      this.messageType = "";
      this.messageSeverity = 0;
      this.ipAddress = "";
      this.messageDesc = "";
      this.displayUpdateButton = false;
    }

}
