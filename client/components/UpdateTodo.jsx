import { React, useState } from "react";
import "../css/style.css";

function UpdateTodo(props) {
    const todo = props.todo
    const [title, setTitle] = useState(todo.title);
    async function updateTodo() {
        try {
            const response = await fetch(`http://localhost:8080/todos/${todo.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            props.updateArr(todo.id, title);
        } catch (error) {
            console.error('Error updating TODO:', error);
        }
    }

    return (<>
        <input type='text' placeholder='update todo' value={title} onChange={(e) => setTitle(e.target.value)} required />
        <button type="submit" onClick={updateTodo}>Update</button>
    </>
    )
}

export default UpdateTodo