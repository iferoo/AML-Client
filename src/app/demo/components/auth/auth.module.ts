import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuardService } from '../../service/auth-guard.service';
import { AuthService } from '../../service/auth/auth.service';
import { MessageService } from 'primeng/api';

@NgModule({
    imports: [CommonModule, AuthRoutingModule],
    providers: [AuthGuardService, AuthService, MessageService],
})
export class AuthModule {}
