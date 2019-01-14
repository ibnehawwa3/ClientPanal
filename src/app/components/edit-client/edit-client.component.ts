import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService }  from '../../services/settings.service';


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
id :string;
client :Client = {
  firstName : '',
  lastName : '',
  email : '',
  phone : '',
  balance :0
};
disableBalanceOnEdit : boolean;
  constructor(private clientService : ClientService,
    private router : Router,
    private route : ActivatedRoute,
    private FlashMessage : FlashMessagesService 
    , private settingsService : SettingsService) { }

  ngOnInit() {
    this.settingsService.getSettings().disableBalanceOnEdit;
    //get id from url
    this.id = this.route.snapshot.params['id'];
    //get client
    this.clientService.getClient(this.id).subscribe(client => this.client = client
    );
  }
  onSubmit({value,valid} : {value : Client,valid : boolean}){
    if(!valid)
    {
      this.FlashMessage.show('please fill the form correctly',{cssClass : 'alert-danger',timeout : 4000}); 
    }else{
      value.id = this.id;
      this.clientService.updateClient(value);
      this.FlashMessage.show('client updated',{cssClass : 'alert-success',timeout : 4000}); 

    }
    this.router.navigate(['/client/' + this.id]);

  }

}
