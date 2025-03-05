import Course from "../models/courseModel.js";

/**
 * Crea un nuevo curso
 *
 * @param {*} req
 * @param {*} res
 */
const courseCreate = (req, res) => {
  const { course_id, course_name, schedule, credits, teacher } = req.body;

  let course = new Course({
    course_id,
    course_name,
    schedule,
    credits,
    teacher
  });

  if (course_id && course_name) {
    course.save()
      .then(() => {
        res.status(201);
        res.header({
          'location': `/courses/?id=${course.id}`
        });
        res.json(course);
      })
      .catch((err) => {
        res.status(422);
        console.log('No se guardó el curso', err);
        res.json({ error: 'Hubo problemas al crear el curso' });
      });
  } else {
    res.status(422);
    console.log('Problemas al guardar el nuevo curso');
    res.json({ error: 'Error: falta de informacion sobre el curso' });
  }
};


/**
 * Obtiene todos los cursos o uno específico por su ID.
 *
 * @param {*} req
 * @param {*} res
 */
const courseGet = (req, res) => {
  const courseId = req.params.id; // Obtener el ID desde los parámetros de la ruta

  if (courseId) {
    // Obtener un curso en específico
    Course.findById(courseId)
      .populate("teacher")
      .then(course => {
        if (course) {
          res.json(course);
        } else {
          res.status(404).json({ error: "Course doesn't exist" });
        }
      })
      .catch(err => {
        res.status(500);
        console.error('Error while querying the course', err);
        res.json({ error: "There was an error" });
      });
  } else {
    // Obtener todos los cursos
    Course.find()
      .populate("teacher")
      .then(courses => {
        res.json(courses);
      })
      .catch(err => {
        res.status(422).json({ "error": err });
      });
  }
};


/**
 * Actualizar un curso por ID
 *
 * @param {*} req
 * @param {*} res
 */
const courseUpdate = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "ID del curso no provisionado" });
  }

  Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedCourse => {
      if (!updatedCourse) {
        return res.status(404).json({ error: "No se logró encontrar el curso a actualizar" });
      }
      res.json(updatedCourse);
    })
    .catch(err => {
      res.status(500).json({ error: "Error al actualizar el curso", details: err });
    });
};

/**
 * Borrar un curso por ID
 *
 * @param {*} req
 * @param {*} res
 */
const courseDelete = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "ID del curso no provisionado" });
  }

  Course.findByIdAndDelete(req.params.id)
    .then(deletedCourse => {
      if (!deletedCourse) {
        return res.status(404).json({ error: "No se logró encontrar el curso a borrar" });
      }
      res.json({ message: "Curso borrado" });
    })
    .catch(err => {
      res.status(500).json({ error: "Error al borrar el curso", details: err });
    });
};

export { courseCreate, courseGet, courseUpdate, courseDelete };
