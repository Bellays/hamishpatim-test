import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Console } from 'console';

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

@Injectable({ providedIn: 'root' })
export class DonationService {
    donationForm: UntypedFormGroup;
    donationsJSON: Donation[] = [];
    isEdit = false;
    show = false;
    currentEdit: number | null = null;
    currentEditedDonation!:Donation;
    editingIndex: number | undefined;
    constructor(private http: HttpClient, private fb: UntypedFormBuilder) {
        this.editingIndex = undefined;
        this.donationForm = this.fb.group({
            donor: ['', Validators.required],
            amount: ['', [Validators.required, Validators.min(1)]]
        });
    }

  editDonation( index: number) {
        this.currentEdit = index;
        console.log("1   ",this.currentEditedDonation);
        this.currentEditedDonation=this.donationsJSON[index];
        console.log("2   ",this.donationsJSON[index]);

        if (this.isEdit == false) {
            this.isEdit = true;
        }
        else {
            this.isEdit = false;
            this.currentEditedDonation=new Donation();
        }
        this.editingIndex = index; 
    }

  /////API TO SERVER

    getDonations() {
      console.log("5465465");
        const url = 'https://localhost:44353/api/Donation';
        this.http.get<any>(url).subscribe(
          (response) => {   
            console.log(response);
            this.donationsJSON = response;
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      }

    addDonation(newDonation: Donation) {
        const url = 'https://localhost:44353/api/Donation';
        this.http.post<any>(url,newDonation).subscribe(
          (response) => {
            console.log("The donation has been successfully added",response);
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      }

    updateDonation(newDonation: Donation) {
        const url = 'https://localhost:44353/api/Donation';
        this.http.put<any>(url,newDonation).subscribe(
          (response) => {
             console.log("The donation has been successfully edited",response);
            },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      }
 

    deleteDonation(id:number) {
        const url = 'https://localhost:44353/api/Donation${id}';
        this.http.delete<any>(url).subscribe(
          (response) => {

            console.log("The donation has been successfully deleted",response);

          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      }
    
    onSubmit(newDonation:Donation) {
        if (this.editingIndex != undefined) {
            this.updateDonation(newDonation);
            this.editingIndex = undefined; 
            this.currentEditedDonation=new Donation();
            this.isEdit = false;
        } else {
            this.addDonation(newDonation);
        }
        this.donationForm.reset();

    }

    /////API TO JSON

    // getDonations() {
    //     const jsonUrl = 'assets/donations.json';
    //     this.http.get<Donation[]>(jsonUrl).subscribe(

    //         (response) => {
    //             console.log(response);
    //             this.donationsJSON = response;
    //         },
    //         (error) => {
    //             console.error('Error loading donations:', error);
    //         }
    //     );
    // }
    //     addDonation(newDonation: Donation) {
    //     this.donationsJSON.push(newDonation);
    // }

    //     updateDonation(newDonation: Donation) {
    //     const jsonUrl = 'assets/donations.json';
    //     this.http.put<Donation[]>(jsonUrl, newDonation).subscribe(

    //         (response) => {
    //             console.log("rgrgrg");
    //         },
    //         (error) => {
    //             console.error('Error update donation:', error);
    //         }
    //     );
    // }
    //      deleteDonation(index: number) {
    //     this.donationsJSON.splice(index, 1);
    // }


    // onSubmit(newDonation:Donation) {
    //     console.log("onsubmit");
    //     // if (this.donationForm.valid) {
    //     console.log("onsubmit1");

    //     if (this.editingIndex != undefined) {
    //         console.log("onsubmit2");
    //         this.donationsJSON[this.editingIndex] = newDonation;
    //         this.editingIndex = undefined;
    //         this.currentEditedDonation=new Donation();
    //         this.isEdit = false;
    //     } else {
    //         console.log("onsubmit3");
    //         this.addDonation(newDonation);
    //         // this.donationsJSON.push(newDonation);
    //     }
    //     this.donationForm.reset();
    //     // }
    // }

}



