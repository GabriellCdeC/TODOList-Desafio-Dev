import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import api from '../../services/api'
import '../usersPage/style.scss'
import { Switch } from '@material-ui/core'

interface todoData {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export function UserPage (){
    const [todos, setTodos] = useState<todoData[]>([])
    const { id } = useParams<{ id: string }>()
    const userID = parseInt(id)     

    useEffect(() =>{
        api.get('/todos')
        .then(response => {setTodos(response.data)})
    },[])

    

    return (
        <main>
        <h1>Lista de TODOS</h1>
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