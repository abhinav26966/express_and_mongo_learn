const express = require('express');
const app = express();
const PORT = 3000;

let courses = [
  {
    "id": 1,
    "name": "Course 1",
    "description": "Description for course 1",
    "videos": [
      {
        "id": 1,
        "title": "Video 1",
        "url": "https://www.example.com/video1.mp4"
      },
      {
        "id": 2,
        "title": "Video 2",
        "url": "https://www.example.com/video2.mp4"
      }
    ]
  },
  {
    "id": 2,
    "name": "Course 2",
    "description": "Description for course 2",
    "videos": [
      {
        "id": 3,
        "title": "Video 3",
        "url": "https://www.example.com/video3.mp4"
      }
    ]
  }
];


function mw(req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const hostname = req.hostname;
    const date = new Date();

    console.log(`IP: ${ip}, Hostname: ${hostname}, Date: ${date}`);
    next();
}

// Middleware to parse JSON bodies
app.use(express.json());
app.use(mw);

app.get('/courses', (req, res) => {
  res.json(courses);
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/courses', (req, res) => {
  const { name, description, videos } = req.body;
  const id = courses.length + 1;
  const newCourse = { id, name, description, videos };
  courses.push(newCourse);
  console.log("Appended course:", newCourse);
  res.status(201).json(newCourse);  // Send back the added course as a response
});

// Update course name by ID
app.put('/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id, 10);
  const { name } = req.body;

  const course = courses.find(course => course.id === courseId);
  
  if (course) 
  {
    course.name = name;
    console.log(`Updated course with ID ${courseId}:`, course);
    res.status(200).json(course);  
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.delete('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id, 10);
    const courseIndex = courses.findIndex(course => course.id === courseId);
  
    if (courseIndex !== -1) {
      const deletedCourse = courses.splice(courseIndex, 1);
      console.log(`Deleted course with ID ${courseId}:`, deletedCourse);
      res.status(200).json({ message: 'Course deleted', course: deletedCourse });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});