import { Component, OnDestroy } from '@angular/core';
import { rehberRequest } from '../../models/liste-ekle.model';
import { RehberService } from '../../services/rehber.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-rehber-ekle',
  templateUrl: './rehber-ekle.component.html',
  styleUrls: ['./rehber-ekle.component.css']
})
export class RehberEkleComponent implements OnDestroy{

  model: rehberRequest;
  private rehberEkleSubscription?: Subscription;
  formSubmitted: boolean = false; // Track if the form has been submitted




  constructor(private rehberService: RehberService) {
    this.model = {
      name: '',
      surname: '',
      email: '',
      phone: ''
    };
  }
  

  onFormSubmit() {
    // Set the formSubmitted flag to true
    this.formSubmitted = true;

    // Remove non-numeric characters from the phone number
    this.model.phone = this.model.phone.replace(/[^0-9]/g, '');

    // Validate if the phone number is exactly 11 digits and starts with "05"
    if (this.model.phone.length !== 11 || !this.model.phone.startsWith('05')) {
      // Show an error message to the user
      alert('Hatalı bir numara girdiniz lütfen tekrar deneyin');
      return; // Stop the form submission
    }

    // Continue with the API call if the validation passes
    this.rehberEkleSubscription= this.rehberService.rehberEkle(this.model).subscribe({
      next: (response) => {
        console.log(this.model);
        console.log('başarılı');
      }
    });

    
  }

  onNumericInputChange(): void {
    // Do not check for validation if the form has been submitted
    if (!this.formSubmitted) {
      // Remove non-numeric characters from the input
      this.model.phone = this.model.phone.replace(/[^0-9]/g, '');

      // Check if the phone number starts with "05" and is between 2 and 11 digits
      const isValidLength = this.model.phone.length >= 2 && this.model.phone.length <= 11;
      const isValidStart = this.model.phone.startsWith('05');

      // Update the UI or handle the error based on validation result
      if (isValidLength && !isValidStart) {
        // Show an error message to the user or handle it according to your UI
        alert('Hatalı bir numara girdiniz lütfen tekrar deneyin');
      }
    }
  }

  ngOnDestroy(): void {
    this.rehberEkleSubscription?.unsubscribe();
  }

}
