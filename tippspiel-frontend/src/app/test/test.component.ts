import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators'
import { TestService } from '../test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  entity: any
  constructor(private service: TestService) { }

  ngOnInit(): void {
    this.service.getTest().subscribe(response => {
      console.log(response);
      this.entity = response;
    })
  }
}
