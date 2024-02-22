import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./actions-types";
import { CoursesHttpService } from "./services/courses-http.service";
import { concatMap, map } from "rxjs/operators";


@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(CourseActions.loadAllCourses),
        concatMap(action => { // only emmited onced to the http service
          return this.courseHttpService.findAllCourses();
        }),
        map(courses => CourseActions.allCoursesLoaded({ courses })
      )
  ));

  constructor(private actions$: Actions, private courseHttpService: CoursesHttpService) { }
}