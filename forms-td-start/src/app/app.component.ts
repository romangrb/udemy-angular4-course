import { Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') myForm: NgForm;
  defaultQuestion = 'teacher';
  answer = '';
  genders = ['female', 'male'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };

  submitted = false;
  
  // First approach: With this method you need to fill all the form data
  suggestDataMethod1() {
    const suggestedName = 'superuser';
    const suggestedEmail = 'superuser@demo.com'

    this.myForm.setValue({
      userData: {
        username: suggestedName,
        email: suggestedEmail,
      },
      secret: 'pet',
      questionAnswer: 'nanu',
      gender: 'male'
    });
  }

  // Second approach: With this method you can only fill some parts of the form  
  suggestDataMethod2() {
    const suggestedName = 'Superuser';
    const suggestedEmail = 'Superuser@mail.com';

    this.myForm.form.patchValue({
      userData: {
        username: suggestedName,
        email: suggestedEmail
      }
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log('username: ' + form.value['username']);
  //   console.log('email: ' + form.value['email']);
  //   console.log('secret: ' + form.value['secret']);
  //   console.log(form);

  // }

  onSubmit() {
    this.submitted = true;
    console.log('Is invalid: ' + this.myForm.invalid);
    console.log('username: ' + this.myForm.value['username']);
    console.log('email: ' + this.myForm.value['email']);
    console.log('secret: ' + this.myForm.value['secret']);
    
    console.log(this.myForm.form);
    this.user.username = this.myForm.value.userData.username;
    this.user.email = this.myForm.value.userData.email;
    this.user.secretQuestion = this.myForm.value.secret;
    this.user.answer = this.myForm.value.questionAnswer;
    this.user.gender = this.myForm.value.gender;

    this.myForm.reset();
    
  }

  onReset() {
    this.submitted = false;
  }
}
