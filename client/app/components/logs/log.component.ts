import { Component } from '@angular/core';

import {LogService} from '../../services/log.service';
import {iLog} from '../../shared/interfaces';


@Component({
  moduleId: module.id,
  selector: 'logs',
  templateUrl:'log.html',
  providers:[LogService],
})

export class LogComponent {
    private logs: iLog[];

    private messageKey: object; 
    private messageID: string;
    private messageType: string;
    private messageSeverity: number;
    private ipAddress: string;
    private messageDesc: string;

    private displayAddButton: boolean = false;
    private displayUpdateButton: boolean = false;
    
    constructor(private logService: LogService){
     // this.logs =[
       //   {message_id: "CPF2345", message_type:"Error", severity:40, from_ip:"10.2.3.15", message:"This is a test"},
         //  {message_id: "Some", message_type:"Info", severity:10, from_ip:"10.3.2.1", message:"Another test"},
          // {message_id: "Some more", message_type:"Dignostic", severity:30, from_ip:"192.168.100.1", message:"Fiber optic"},
         // ] ;
     this.getLogs();   
    }

     getLogs() {
        this.logService.getLogs()
      .subscribe(logs =>{
           this.logs = logs;
      });       
     }

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
          this.logs.push(log);
          this.clearFormFields();
          this.displayAddButton = false;
        });
    }

    deleteLog(id: any) {
      var logs = this.logs;
      this.logService.deleteLog(id)
        .subscribe((data: any) => {
          if (data.n == 1) {
            for (var i = 0; i < logs.length; i++) {
               if(logs[i]._id == id){
                 logs.splice(i, 1);
               }
            }
          }
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
          this.getLogs();
        });

     this.displayUpdateButton = false;
     this.clearFormFields();
    }

    clearFormFields() {
      this.messageID = "";
      this.messageType = "";
      this.messageSeverity = 0;
      this.ipAddress = "";
      this.messageDesc = "";
    }

    validateMessageID() {
      if (this.messageID.length > 3) {
        if (this.displayUpdateButton) {
          this.displayAddButton = false;
        } else {
          this.displayAddButton = true;
          this.displayUpdateButton = false;
        }
      }else {
         this.displayAddButton = false;
          this.displayUpdateButton = false;
      }
    }
}
