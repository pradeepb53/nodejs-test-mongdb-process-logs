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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var LogService = (function () {
    function LogService(http) {
        this.http = http;
        console.log('Log Service Initialized....');
    }
    /*getLogs() {
        return this.http.get('http://localhost:3000/api/logs')
            .map((res) => res.json());
    }*/
    LogService.prototype.getLogs = function (page) {
        var _this = this;
        return this.http.get('http://localhost:3000/api/logs')
            .map(function (res) {
            var logs = res.json();
            var totalRows = _this.getTotalRows(logs);
            logs = _this.getCurrentPage(logs, page);
            return {
                results: logs,
                totalRows: totalRows,
                page: page,
            };
        });
    };
    LogService.prototype.getTotalRows = function (data) {
        return data.length;
    };
    LogService.prototype.getCurrentPage = function (data, page) {
        var arrayStart = (page - 1) * 5;
        console.log("Page is :" + page + " arrayStart : " + arrayStart);
        return data.slice(arrayStart, page * 5);
    };
    LogService.prototype.addLog = function (newLog) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        //headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/api/log', JSON.stringify(newLog), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    LogService.prototype.updateLog = function (messageKey, updateLog) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this.http.put('http://localhost:3000/api/log/' + messageKey, JSON.stringify(updateLog), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    LogService.prototype.deleteLog = function (id) {
        return this.http.delete('http://localhost:3000/api/log/' + id)
            .map(function (res) { return res.json(); });
    };
    return LogService;
}());
LogService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map