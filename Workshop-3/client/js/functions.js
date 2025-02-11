function assignEditEvents() {
  for (let el of document.getElementsByClassName('edit_button')) {
    el.addEventListener('click', (e) => {
      console.log(e.target.id);
      alert(`element with id ${e.target.id} clicked`);
      e.preventDefault();
    });
  }

}

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

