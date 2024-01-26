import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { User } from '@maids/api-interfaces';
import { UsersFacade } from '@maids/core-state';
import { Pagination } from 'libs/api-interfaces/src/lib/api-interfaces';
import {
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class UserAppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(MatPaginator) matPaginator: QueryList<MatPaginator>;

  pageEvent: PageEvent;
  allUsers$: Observable<User[]> = this._usersFacade.allUsers$;
  userPagination$: Observable<Pagination> = this._usersFacade.userPagination$;
  loaded$: Observable<boolean> = this._usersFacade.loaded$;
  searchControl = new FormControl();
  usersList$: Observable<User[]>;
  private destroy$ = new Subject<void>();

  constructor(private _usersFacade: UsersFacade) {}

  ngOnInit(): void {
    this.usersList$ = combineLatest([
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith(''),
      ),
      this._usersFacade.allUsers$,
    ]).pipe(
      map(([searchTerm, users]) =>
        users.filter(
          (user) =>
            user.id.toString().includes(searchTerm) ||
            user.first_name.includes(searchTerm) ||
            user.last_name.includes(searchTerm) ||
            user.email.includes(searchTerm),
        ),
      ),
    );
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    const paginator = this.matPaginator.first;
    if (paginator) {
      this.subscribeToPage(paginator);
    } else {
      this.subscribeToChanges();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers(page = 1) {
    this._usersFacade.loadUsers(page);
  }

  private subscribeToPage(paginator: MatPaginator): void {
    paginator.page
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: PageEvent) => {
        let page = event.pageIndex + 1;

        this.loadUsers(page);
      });
  }

  private subscribeToChanges(): void {
    this.matPaginator.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe((paginators: QueryList<MatPaginator>) => {
        const paginator = paginators.first;
        if (paginator) {
          this.subscribeToPage(paginator);
        }
      });
  }
}
