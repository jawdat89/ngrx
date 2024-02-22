import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./course.actions";
import { AppState } from "../reducers";
import { areCoursesLoaded } from "./courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any>{

  loading = false;

  constructor(private store: Store<AppState>) { }
    
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      return this.store
        .pipe(
          select(areCoursesLoaded),
          tap((coursesLoaded) => {
            if (!this.loading && !coursesLoaded) {
              this.loading = true;
              this.store.dispatch(loadAllCourses());
            }
          }),
          filter(coursesLoaded => coursesLoaded), // wait for courses to load
          first(), // ensure that the observable completes
          finalize(() => this.loading = false) // ensure that the loading flag is reset always (success, error, cancel)
        );
  }
}