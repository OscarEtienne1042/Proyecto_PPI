const agregarTarea = async () => {
    const descripcion = document.querySelector('#nuevaTarea').value;

    if (descripcion.trim() === '') {
        alert('Por favor, ingresa una descripción para la tarea');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/tareas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descripcion }),
        });

        const tarea = await response.json();
        agregarTareaALista(tarea);
    } catch (error) {
        console.error('Error al agregar la tarea:', error);
    }
};

const obtenerTareas = async () => {
    try {
        const response = await fetch('http://localhost:3000/tareas');
        const data = await response.json();
        data.tareas.forEach((tarea) => agregarTareaALista(tarea));
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
    }
};

const eliminarTarea = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/tareas/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        alert(data.message);
        document.getElementById(`tarea-${id}`).remove();
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
    }
};

const agregarTareaALista = (tarea) => {
    const lista = document.querySelector('#listaTareas');

    const elementoTarea = document.createElement('li');
    elementoTarea.id = `tarea-${tarea.id}`;
    elementoTarea.innerHTML = `
        ${tarea.descripcion}
        <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
    `;

    lista.appendChild(elementoTarea);
};

document.addEventListener('DOMContentLoaded', obtenerTareas);