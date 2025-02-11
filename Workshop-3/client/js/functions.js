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
      const item = document.createElement('li');
      item.innerHTML = `
        ${element.first_name} ${element.last_name} 
        <button onclick="updateTeacher('${element._id}')">Edit</button>
        <button onclick="deleteTeacher('${element._id}')">Delete</button>
      `;
      item.setAttribute('data-id', element._id);
      container.appendChild(item);
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

