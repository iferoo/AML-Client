import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy, NgStyle} from '@angular/common';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppLayoutModule} from './layout/app.layout.module';
import {NotfoundComponent} from './demo/components/notfound/notfound.component';
import {ProductService} from './demo/service/product.service';
import {CountryService} from './demo/service/country.service';
import {CustomerService} from './demo/service/customer.service';
import {EventService} from './demo/service/event.service';
import {IconService} from './demo/service/icon.service';
import {NodeService} from './demo/service/node.service';
import {PhotoService} from './demo/service/photo.service';
import {BranchService} from './demo/service/branch.service';
import {EmployeeService} from './demo/service/employee.service';
import {BankService} from './demo/service/bank.service';
import {BankCustomerService} from './demo/service/bankCustomer.service';
import {AccountService} from './demo/service/account.service';
import {TransferService} from './demo/service/transfer.service';
import {TransactionService} from './demo/service/transaction.service';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        NgStyle
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        BranchService,
        EmployeeService,
        BankService,
        BankCustomerService,
        AccountService,
        TransferService,
        TransactionService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
