import { Component, OnInit } from '@angular/core';
//import { Product } from './models/product.model'
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //imgParent = 'https://i.pinimg.com/736x/99/0a/95/990a95804d42ae98dcefcf5a7632b846.jpg';
  imgParent = '';
  showImg = true;
  //token = '';
  imgRta = "";

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private filesService: FilesService,
    private tokenService: TokenService
  ){}

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.profile()
      .subscribe()
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  onLoaded(img: String){
    console.log('log padre ', img);
  }

  toggleImg(){
    this.showImg = !this.showImg;
  }

  createUser(){
    this.userService.create({
      name: 'Carolina',
      email: 'carolina@email.com',
      password: '112233',
      role: 'customer'
    })
    .subscribe( rta => {
      console.log(rta);
    });
  }

  /*
  login(){
    this.authService.login('carolina@email.com', '112233'  )
        .subscribe( rta => {
          console.log(rta);
          this.token = rta.access_token;
        });
  }

  getProfile(){
    this.authService.profile(this.token)
        .subscribe( rta => {
          console.log(rta);
        });
  }
  */

  downloadPDF(){
       this.filesService.getFile('file_PDF', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf' )
       .subscribe();
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if( file ){
      this.filesService.upLoadFile(file)
                        .subscribe(rta => {
                          this.imgRta = rta.location ;
                        });
    }


  }

}
