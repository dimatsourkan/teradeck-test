import { Component, OnInit } from '@angular/core';
import { UserService } from "@entities/user/user.service";
import { User } from "@entities/user/user-model";
import { SearchableField, SortableItem } from "@app/shared/components/grid/grid.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users: User[] = [];

  searchFields: SearchableField[] = ['id', 'firstName', 'lastName'];

  sortableFields: SortableItem[] = [
    {
      name : 'Id',
      value: 'id'
    },
    {
      name: 'First Name',
      value: 'firstName'
    },
    {
      name: 'Last Name',
      value: 'lastName'
    },
    {
      name: 'Phone',
      value: 'phone'
    },
    {
      name: 'Address',
      value: 'address'
    }
  ];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe(res => {
      this.users = res
    });
  }

}
