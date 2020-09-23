import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';

import { UserService } from '../../../services/user.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchService } from '../../../services/search.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];

  public imgSubs: Subscription;
  public from = 0;
  public loading = true;


  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private modalImageService: ModalImageService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getUsers();
    this.imgSubs = this.modalImageService.newChange
      .pipe(delay(100))
      .subscribe(img => this.getUsers());
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.from)
      .subscribe(({ total, users }) => {
        this.totalUsers = total;
        if (users.length !== 0) {
          this.users = users;
          this.usersTemp = users;
        }
        this.loading = false;
      });
  }

  changePage(value: number) {
    this.from += value;
    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {
      this.from -= value;
    }

    this.getUsers();
  }

  search(term: string) {

    if (term.length === 0) {
      return this.users = this.usersTemp;
    }

    this.searchService.search('users', term)
      .subscribe((resp: User[]) => {
        this.users = resp;
      });
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {
      return Swal.fire({
        title: 'Error',
        text: `No puede eliminarse a si mismo`,
        icon: 'error'
      });
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de borrar a ${user.name} ${user.lastName} email: ${user.email}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar Usuario!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user)
          .subscribe(resp => {
            this.getUsers();
            Swal.fire({
              title: 'Usuario Borrado',
              text: `Se borro a ${user.name} ${user.lastName} email: ${user.email}`,
              icon: 'success'
            });
          });
      }
    });

  }

  changeRol(user: User) {
    this.userService.updateUserObject(user)
      .subscribe(resp => {
        Swal.fire({
          title: 'Usuario Editado',
          text: `Se edito a ${user.name} ${user.lastName}, email: ${user.email}, rol: ${user.role}`,
          icon: 'success'
        });
      });
  }

  showModal(user: User) {
    this.modalImageService.showModal('users', user.uid, user.img);
  }

}
