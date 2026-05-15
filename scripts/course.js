const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

function displayCourses(filterList) {
    const container = document.querySelector("#course-display");
    container.innerHTML = "";

    filterList.forEach(course => {
        const card = document.createElement("div");
        card.className = `course-card ${course.completed ? 'completed' : ''}`;
        card.innerHTML = `<strong>${course.subject} ${course.number}</strong>`;
        container.appendChild(card);
    });

    const total = filterList.reduce((acc, course) => acc + course.credits, 0);
    document.querySelector("#totalCredits").textContent = total;
}

document.querySelector("#all").addEventListener("click", () => displayCourses(courses));
document.querySelector("#cse").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === 'CSE')));
document.querySelector("#wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.subject === 'WDD')));

displayCourses(courses);