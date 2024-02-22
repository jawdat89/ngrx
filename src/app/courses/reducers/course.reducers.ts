import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../actions-types";

export interface CoursesState extends EntityState<Course> { 
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses, // sort the courses by seqNo
  // selectId: course => course.id // if the id is not 'id'
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});


export const coursesReducer = createReducer(
  initialCoursesState,

  on(
    CourseActions.allCoursesLoaded,
    (state, action) => {
      return adapter.addMany(action.courses, {
        ...state,
        allCoursesLoaded: true
      });
    }
  )
);

export const {
  selectAll
} = adapter.getSelectors(); // auto-generate the selectors for us

