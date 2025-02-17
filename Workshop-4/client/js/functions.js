function assignEditEvents() {
  for (let el of document.getElementsByClassName('edit_button')) {
    el.addEventListener('click', (e) => {
      console.log(e.target.id);
      alert(`element with id ${e.target.id} clicked`);
      e.preventDefault();
    });
  }

}

// --- FUNCIONES PARA PROFESORES ---
async function getTeachers() {
  const response = await fetch("http://localhost:3001/teachers");
  const teachers = await response.json();

  if (teachers) {
    const container = document.getElementById('result');
    container.innerHTML = '';

    teachers.forEach(element => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${element.first_name}</td>
        <td>${element.last_name}</td>
        <td>${element.cedula}</td>
        <td>${element.age}</td>
        <td>
          <button class="btn btn-warning btn-sm me-2" onclick="updateTeacher('${element._id}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTeacher('${element._id}')">Borrar</button>
        </td>
      `;
      container.appendChild(row);
    });
  }
}

async function createTeacher() {
  let teacher = {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    cedula: document.getElementById('cedula').value,
    age: document.getElementById('age').value
  }

  const response = await fetch("http://localhost:3001/teachers", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teacher)
  });

  debugger;
  if (response && response.status == 201) {
    teacher = await response.json();
    console.log('Teacher saved', teacher);
    alert('Usuario guardado');
  } else {
    alert("Shit's on fire! ");
  }
}

async function updateTeacher(id) {
  let teacher = {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    cedula: document.getElementById('cedula').value,
    age: document.getElementById('age').value
  };

  const response = await fetch(`http://localhost:3001/teachers/${id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(teacher)
  });

  if (response.ok) {
    alert("Teacher updated successfully");
    getTeachers();  // Refresh list
  } else {
    alert("Error updating teacher");
  }
}

async function deleteTeacher(id) {
  const response = await fetch(`http://localhost:3001/teachers/${id}`, {
    method: "DELETE"
  });

  if (response.ok) {
    alert("Teacher deleted successfully");
    getTeachers();  // Refresh list
  } else {
    alert("Error deleting teacher");
  }
}

// --- FUNCIONES PARA CURSOS ---

async function createCourse() {
  let course = {
    course_id: document.getElementById('course_id').value,
    course_name: document.getElementById('course_name').value,
    schedule: document.getElementById('schedule').value,
    credits: document.getElementById('credits').value,
    teacher: document.getElementById('teacher').value
  }

  const response = await fetch("http://localhost:3001/courses", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(course)
  });

  debugger;
  if (response && response.status == 201) {
    course = await response.json();
    console.log('Course saved correctly', course);
    alert('Curso guardado');
  } else {
    alert("Shit's on fire! ");
  }
}

async function getTeachersforCourses() {
  try {
    const response = await fetch("http://localhost:3001/teachers");
    const teachers = await response.json();

    if (Array.isArray(teachers) && teachers.length > 0) {
      const select = document.getElementById("teacher");

      select.innerHTML = '<option value="">Seleccione un profesor</option>';

      teachers.forEach(teacher => {
        let option = document.createElement("option");
        option.value = teacher._id; // agrega al valor de la opción, el ID del profesor.
        option.textContent = teacher.first_name + " " + teacher.last_name; // muestra el nombre completo del profesor. 
        select.appendChild(option); // agrega al DOM la opción creada
      });
    }
  } catch (error) {
    console.error("Error al cargar los profesores:", error);
  }
}

async function getCourses() {
  try {
    const response = await fetch("http://localhost:3001/courses");
    const courses = await response.json();

    if (courses) {
      const container = document.getElementById("course-list");
      container.innerHTML = "";

      courses.forEach(course => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${course.course_id}</td>
          <td>${course.course_name}</td>
          <td>${course.teacher ? course.teacher.first_name + " " + course.teacher.last_name : "No asignado"}</td>
          <td>
            <a href="info_curso.html?id=${course._id}" class="btn btn-success btn-sm">Editar</a>
            <button class="btn btn-danger btn-sm" onclick="deleteCourse('${course._id}')">Borrar</button>
          </td>
        `;
        container.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
  }
}

async function deleteCourse(id) {
  const response = await fetch(`http://localhost:3001/courses/${id}`, {
    method: "DELETE"
  });

  if (response.ok) {
    alert("Curso eliminado");
    getCourses();  // recarga la lista
  } else {
    alert("Error al eliminar el curso");
  }
}

async function updateCourse(id) {
  let course = {
    course_id: document.getElementById('course_id').value,
    course_name: document.getElementById('course_name').value,
    schedule: document.getElementById('schedule').value,
    credits: document.getElementById('credits').value,
    teacher: document.getElementById('teacher').value
  };

  const response = await fetch(`http://localhost:3001/courses/${id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(course)
  });

  if (response.ok) {
    alert("Curso actualizado correctamente");
    window.location.href = "cursos.html";
  } else {
    alert("Error al actualizar el curso");
  }
}


function loadCourseData() {
  const params = new URLSearchParams(window.location.search); // obtiene los parámetros de la URL
  const courseId = params.get("id"); // obtiene específicamente el parámetro ID de la URL

  // referencias al título y botón de confirmación 
  const titulo = document.getElementById("titulo");
  const boton = document.querySelector("button[type='submit']");

  if (courseId) {
    // cambia el texto del título y del botón
    titulo.textContent = "Editar Curso";
    boton.textContent = "Actualizar Curso";
    // cambia la función a usar por el botón.
    boton.setAttribute("onclick", `updateCourse('${courseId}'); return false;`);

    // datos del curso
    fetch(`http://localhost:3001/courses/${courseId}`)
      .then(response => response.json())
      .then(course => {
        document.getElementById("course_id").value = course.course_id;
        document.getElementById("course_name").value = course.course_name;
        document.getElementById("schedule").value = course.schedule;
        document.getElementById("credits").value = course.credits;
        const teacherSelect = document.getElementById("teacher");

        // valida si el curso tiene un profesor asignado.
        if (course.teacher) {
          const teacherId = course.teacher._id; // ID del profesor asignado al curso.

          // recorre todas las opciones del select
          for (let option of teacherSelect.options) {
            if (option.value === teacherId) {
              option.selected = true; // setea el profesor del curso al select.
              break;
            }
          }
        }
      })
      .catch(error => console.error("Error cargando el curso:", error));
  } else {
    titulo.textContent = "Agregar Nuevo Curso";
    boton.textContent = "Guardar Curso";
    boton.setAttribute("onclick", "createCourse(); return false;");
  }

}

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  getCourses();
  loadCourseData();
});

