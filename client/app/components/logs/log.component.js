"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var log_service_1 = require("../../services/log.service");
var LogComponent = (function () {
    function LogComponent(logService) {
        this.logService = logService;
        this.displayAddButton = false;
        this.displayUpdateButton = false;
        // this.logs =[
        //   {message_id: "CPF2345", message_type:"Error", severity:40, from_ip:"10.2.3.15", message:"This is a test"},
        //  {message_id: "Some", message_type:"Info", severity:10, from_ip:"10.3.2.1", message:"Another test"},
        // {message_id: "Some more", message_type:"Dignostic", severity:30, from_ip:"192.168.100.1", message:"Fiber optic"},
        // ] ;
        this.getLogs();
    }
    LogComponent.prototype.getLogs = function () {
        var _this = this;
        this.logService.getLogs()
            .subscribe(function (logs) {
            _this.logs = logs;
            if (_this.logs.length == 0) {
                console.log("Data not found!");
            }
        });
    };
    LogComponent.prototype.addLog = function () {
        var _this = this;
        var addLog = {
            message_id: this.messageID,
            message_type: this.messageType,
            severity: this.messageSeverity,
            from_ip: this.ipAddress,
            message: this.messageDesc
        };
        this.logService.addLog(addLog)
            .subscribe(function (log) {
            _this.logs.push(log);
            _this.clearFormFields();
            _this.displayAddButton = false;
        });
    };
    LogComponent.prototype.deleteLog = function (id) {
        var logs = this.logs;
        this.logService.deleteLog(id)
            .subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < logs.length; i++) {
                    if (logs[i]._id == id) {
                        logs.splice(i, 1);
                    }
                }
            }
        });
    };
    LogComponent.prototype.displayUpdateLog = function (id) {
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
    };
    LogComponent.prototype.updateLog = function () {
        var _this = this;
        var updateLog = {
            message_id: this.messageID,
            message_type: this.messageType,
            severity: this.messageSeverity,
            from_ip: this.ipAddress,
            message: this.messageDesc
        };
        this.logService.updateLog(this.messageKey, updateLog)
            .subscribe(function (log) {
            _this.getLogs();
        });
        this.displayUpdateButton = false;
        this.clearFormFields();
    };
    LogComponent.prototype.clearFormFields = function () {
        this.messageID = "";
        this.messageType = "";
        this.messageSeverity = 0;
        this.ipAddress = "";
        this.messageDesc = "";
    };
    LogComponent.prototype.validateMessageID = function () {
        if (this.messageID.length > 3) {
            if (this.displayUpdateButton) {
                this.displayAddButton = false;
            }
            else {
                this.displayAddButton = true;
                this.displayUpdateButton = false;
            }
        }
        else {
            this.displayAddButton = false;
            this.displayUpdateButton = false;
        }
    };
    return LogComponent;
}());
LogComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'logs',
        templateUrl: 'log.component.html',
        providers: [log_service_1.LogService],
    }),
    __metadata("design:paramtypes", [log_service_1.LogService])
], LogComponent);
exports.LogComponent = LogComponent;
//# sourceMappingURL=log.component.js.map