import { QueryFunction } from 'react-query';

export const getTodos = async (): Promise<any> => {
    const res = await fetch('http://localhost:3000/todos');
    return res.json();
};

export const AddToDo = (title: string) => {
    const data = { title, completed: false };

    fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(async (res) => {
            //const data = await res.json();
            alert('Tarea Creada Correctamente');
        })
        .catch((err) => {
            console.error(err);
        });
};

export const completeToDo = (id: number) => {
    fetch('http://localhost:3000/todos/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: '{"completed":true}',
    })
        .then(async (res) => {
            //const data = await res.json();
            alert('Tarea Completada');
        })
        .catch((err) => {
            console.error(err);
        });
};

export const deleteToDo = (id: number) => {
    fetch('http://localhost:3000/todos/' + id, {
        method: 'DELETE',
    })
        .then(async (res) => {
            //const data = await res.json();
            alert('Tarea Eliminada');
        })
        .catch((err) => {
            console.error(err);
        });
};
