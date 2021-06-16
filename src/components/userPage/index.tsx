import { useState, useEffect, FormEvent } from 'react'
import { useParams } from "react-router-dom";
import api from '../../services/api'
import '../usersPage/style.scss'
import { Switch, InputLabel, Input, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

interface todoData {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export function UserPage (){
    const [todos, setTodos] = useState<todoData[]>([])
    const [title, setTitle] = useState("")
    const { id } = useParams<{ id: string }>()
    const userID = parseInt(id)     

    useEffect(() =>{
        api.get('/todos')
        .then(response => {setTodos(response.data)})
    },[])


    function handleAddNewTodo(event: FormEvent){
        event.preventDefault()
        const newTodo = {
            userId: userID,
            id: todos.length+1,
            title: title,
            completed: false
        }

        if(title === ''){
            return
        }

        setTodos([...todos, newTodo])
        setTitle('')
    }
    

    return (
        <main>
        <h1>Lista de TODOS</h1>
        <form onSubmit={handleAddNewTodo} >  
            <InputLabel htmlFor="my-input">TODO</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" value={title} onChange={event => setTitle(event.target.value)} />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                className="buttonSave"
                startIcon={<SaveIcon />}
            >
                Salvar
            </Button>
        </form>
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Número</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {todos.filter(todos => {
                        return todos.userId === userID
                    }).map((todo, index) => {   
                        
                        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                            const updatedList = [...todos]
                            const itemExists = updatedList.find(item => item.id === todo.id)

                            if(itemExists){
                                itemExists.completed = event.target.checked
                            }
                            
                            setTodos(updatedList)
                        }
                        return (
                            <tr key={todo.id} >
                                <td> {todo.title} </td>
                                <td> {index + 1} </td>
                                <td>
                                    {                                    
                                    <Switch color="primary"checked={todo.completed} onChange={handleChange} />
                                    }
                                    
                                </td>                                
                            </tr>
                        )
                    })}
                                    
                </tbody>
            </table>
        </div>
    </main>
    )
}