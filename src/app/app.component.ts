import { Component, signal } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DonationService } from './donation.service';

export class Donation {
  id!: number
  donor!: string
  amount!: number
  donorType!: string
  purpose!: string
  conditions!: string
  currency!: string
  exchangeRate!: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hamishpatim-test';
  readonly panelOpenState = signal(false);
  donationForm: UntypedFormGroup;
  show = false;


  donations: Donation[] = [];
  constructor(private fb: UntypedFormBuilder, public donationService: DonationService) {
    this.donationForm = this.fb.group({
      id:new FormControl(''),
      donor: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Zאבגדהוזחטיכךלמםנןסעפצקרשתםןףץךם]+')]),
      amount: new FormControl('', [Validators.required,Validators.pattern('^[0-9]*\.?[0-9]*$'), Validators.min(1)]),
      donorType:new FormControl(''),
      purpose:new FormControl(''),
      conditions:new FormControl(''),
      currency:new FormControl(''),
      exchangeRate:new FormControl('')  
    });
  }
  onChildEvent(value: boolean) {
    this.show = value;
  }


  ngOnInit(): void {
    this.donationService.getDonations();
  }
  
  showFunction() {
    if (this.show == false) {
      this.show = true;
    }
    else {
      this.show = false;
    }
  }
}
