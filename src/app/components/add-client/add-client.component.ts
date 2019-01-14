import { Component, OnInit , ViewChild} from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { SettingsService }  from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
client : Client  = {
  firstName : '',
  lastName : '',
  email:'',
  phone : '',
  balance : 0,
}
disableBalanceOnAdd: boolean;
@ViewChild('clientForm') form : any;


  constructor( private FlashMessage : FlashMessagesService, 
    private clientService : ClientService,
    private router : Router,
    private settingsService : SettingsService) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }
  onSubmit({value,valid}: {value : Client, valid : boolean}){
    if(this.disableBalanceOnAdd)
    {
      value.balance = 0;
    }
    if(!valid)
    {
      //show error
      this.FlashMessage.show('please fill out the form correctly',
      {cssClass : 'alert-danger',timeout : 4000});
    }
    else{
      //add new value
    this.clientService.newClient(value);
      //show message
      this.FlashMessage.show('new client added',
      {cssClass : 'alert-success',timeout : 4000});
      //redirect to dashboard
      this.router.navigate(['/']);
    }
  }

}
