import React, { useState, useEffect } from 'react';
import './App.css';



const Banner = ({ title }) => (
    <h1>{ title }</h1>
  );
const TermSelector = () => (
  <div className="btn-group">
    {
      Object.values(terms)
        .map(value => <TermButton key={value} term={value} />)
    }
  </div>
);
const TermButton = ({term}) => (
  <>
    <input type="radio" id={term} className="btn-check" autoComplete="off" />
    <label class="btn btn-success m-1 p-2" htmlFor={term}>
    { term }
    </label>
  </>
);
const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Winter');
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));

  return (
    <>
      <TermSelector />
      <div className="course-list">
      { termCourses.map(course => <Course key={course.id} course={ course } />) }
      </div>
    </>
  );
};
const terms = { F: 'Fall', W: 'Winter', S: 'Spring'};

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
);



const Course = ({ course }) => (
  <div className="card m-1 p-2">
    <div className="card-body">
      <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
      <div className="card-text">{ course.title }</div>
    </div>
  </div>
);


const App = () => {
  const [schedule, setSchedule] = useState();
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    }
    fetchSchedule();
  }, []);

  if (!schedule) return <h1>Loading schedule...</h1>;

  return (
    <div className="container">
      <Banner title={ schedule.title } />
      <CourseList courses={ schedule.courses } />
    </div>
  );
};

export default App;
