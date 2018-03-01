import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlList} from "../model/getUrlsResponse";
import {Validators, FormControl, FormGroup} from "@angular/forms";
import {DataService} from "../services/data.service";
@Component({
  selector: 'app-body',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  form;
  private urlList : UrlList;
  private validUrl: boolean;
  private errMsg: string;
  public urlsAvailable: boolean;
  public loggedIn: boolean;

  constructor(private http: HttpClient, private dataservice: DataService) { }

  ngOnInit() {
    this.form = new FormGroup({
      originalUrl : new FormControl("", Validators.required),
      shortUrl : new FormControl("", Validators.required)
    });
    this.dataservice.getLoginStatus().subscribe(data => {
      this.loggedIn = data;
      console.log("Is user logged in:"+this.loggedIn);

    })
  }

  getUrls() {
    console.log('HI'+ localStorage.getItem("username"));
    this.http.get('https://7mjn5iloxc.execute-api.us-west-2.amazonaws.com/DEV?uname='+ localStorage.getItem("username")).subscribe(data => {
      this.urlList = data["Items"];
      this.urlsAvailable = true;
    });
  }


  createUrls(urlData) {

    console.log('Form data'+urlData);
    var req ={
      "uname" :  localStorage.getItem("username"),
      "shortname" : urlData["shortUrl"],
      "url" : urlData["originalUrl"]
    };
      console.log('Hello'+ localStorage.getItem("username"));
    this.http.get('https://7mjn5iloxc.execute-api.us-west-2.amazonaws.com/STAGE/validate?shortname='+urlData["shortUrl"]).subscribe(data => {
      console.log('Response'+data);
      this.errMsg = data.toString();
    });
   /* this.http.post('https://7mjn5iloxc.execute-api.us-west-2.amazonaws.com/DEV',req).subscribe(data => {
      console.log('x'+data);
    });*/
  }
}

