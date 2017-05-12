import {ModuleWithProviders} from '@angular/core';

export interface iLog {
    _id: object;
    message_id: string;
    message_type: string;
    severity: number;
    from_ip: string;
    message: string;
}

