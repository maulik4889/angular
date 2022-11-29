export class User {
  email?: string;
  password?: string;
  user_token?: string;
  status?: number;

  data: any;

  
  token:any;
  name:any;
  
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  email: string;
  password: string;
  confirmPass: string;
  termandC: boolean;
  type:string;
}

export interface UserChangePassword {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}
export interface UserChangeEmail {
  old_email: string;
  new_email: string;
  confirmEmail: string;
}

export interface UserForgotPassword {
  email: string;
}

export interface UserResetPassword {
  password: string;
  password_confirmation: string;
}

export interface BankDetails {
  first_name: string;
  last_name: string;
  dob: Date;
  card_number: Number;
  expire_month: string;
  expire_year: string;
  cvv: Number;
}

export interface ContactUs {
  email: string;
  message: string;
  fullname: string;
  
  }


export interface ISocialLoginData {
  name?: string;
  email?: string;
  signup_type?: string;
  image?: string;
  social_id?: string;
  device_type?: string;
  type?:any;
}