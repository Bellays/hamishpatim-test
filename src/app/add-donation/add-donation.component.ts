import {ChangeDetectionStrategy, Component, signal, OnInit, afterNextRender, inject, Injector, ViewChild, output, Output, EventEmitter} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';   
import { DonationService } from '../donation.service';
import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { log } from 'console';

export class Donation {
  id!: number
  donor!: string
  amount!: number
  currency!: string
  exchangeRate!: string
  donorType!: string
  purpose!: string
  conditions!: number
}
  
@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDonationComponent implements OnInit {
  readonly panelOpenState = signal(false);
  donationForm: UntypedFormGroup; 
  donations: Donation[] = [];
  donationsJSON: Donation[] = [];
  currentDonation:Donation=new Donation();
  @Output() changeShowEvent = new EventEmitter<boolean>();

   aa:Donation[]=[];
  constructor(private fb: UntypedFormBuilder,public donationService: DonationService) {
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

  ngOnInit(): void {
    console.log("4  ",this.donationService.currentEditedDonation?.id)
    console.log("4  ",this.donationService.currentEditedDonation?.donor)

    if(this.donationService.currentEditedDonation?.id>0)
    {
      console.log("3   ",this.donationService.currentEditedDonation);
      this.donationForm.setValue(this.donationService.currentEditedDonation);
    }
  }
  private _injector = inject(Injector);

  @ViewChild('autosizeTextarea') 
  autosize!: CdkTextareaAutosize;
  
  
 
  triggerResize() {
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      },
    );
  }
  
  onSubmit() {
    this.donationService.onSubmit(this.donationForm.value);
    this.changeShowEvent.emit(false); 

  }
}
