import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    checkboxChecked = true;

    @ViewChild('video') video: ElementRef;

    constructor(private render: Renderer2) { }

    ngOnInit() {

    }

    checkboxCheckedChange(data: MatCheckboxChange) {
        this.checkboxChecked = data.checked;
    }

}
