import { Injectable } from '@angular/core';
import { Account, IdType } from './account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() {
    console.log('calling accountservice ctr');
    const data = JSON.parse(localStorage.getItem('accounts'));
    if (data !== null) {
      this.accounts = data;
      console.log('service posts', this.accounts);
      AccountService.nextId = this.accounts.length;
    }
  }

  static nextId = 0;
  private accounts = [];

  findAll() {
    return this.accounts;
  }
  findById(id: IdType): Account | undefined {
    return this.accounts.find(e => e.id === id);
  }
  create(account: Account) {
    console.log(AccountService.nextId);
    account.id = ++AccountService.nextId;
    console.log(AccountService.nextId);
    this.accounts.push(account);
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }
  update(account: Account): Account {
    const index = this.accounts.findIndex(p => p.id === account.id);
    if (index >= 0) {
      this.accounts[index] = account;
      localStorage.setItem('accounts', JSON.stringify(this.accounts));
      return account;
    } else {
      throw new Error(`Account with ID=${account.id} not found.`);
    }
  }
  remove(id: IdType) {
    this.accounts.splice(this.accounts.findIndex(item => item === id), 1);
    localStorage.setItem('accounts', JSON.stringify(this.accounts));
  }

}
