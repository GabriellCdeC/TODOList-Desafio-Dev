import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import api from '../../services/api'
import './style.scss'


interface userData {
    id: number
    name: string
    username: string
    email: string
}

export function UsersPage(){

    const [users, setUsers] =  useState<userData[]>([])
    
    useEffect(() => {
        api.get("/users")
        .then(response => {setUsers(response.data)})

        
    },[])
    
    
    return (
        <main>
            <h1>Lista de Usuários</h1>
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Usuário</th>
                            <th>E-Mail</th>
                            <th>ToDo's</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => {
                            return (
                                <tr key={user.id} >
                                    <td> {user.name} </td>
                                    <td> {user.username} </td>
                                    <td>{user.email}</td>
                                    <td><Link to={`/UserPage/${user.id}`}> <button>Acessar</button> </Link></td>
                                </tr>
                            )
                        })}
                                        
                    </tbody>
                </table>
            </div>
        </main>
    )
    
}