import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState, adapter } from "./reducers/course.reducers";

import * as fromCourses from "./reducers/course.reducers";

export const selectCoursesState = createFeatureSelector<CoursesState>("courses");

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
); // returns an ordered array of the natural order of the entities in the state

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === "BEGINNER")
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.category === "ADVANCED")
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  courses => courses.filter(course => course.promo).length
);

export const areCoursesLoaded = createSelector(
  selectCoursesState,
  state => state.allCoursesLoaded
);
