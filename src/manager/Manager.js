import React, {useEffect, useState} from "react";
import { GetAllUsers } from '../api/api'
import { UserCard } from "./UserCard";
import '../App.css'

export const Manager = () => {

    const [allUsers, setAllUsers] = useState([]);
   
    

    useEffect(()=> {
        GetAllUsers().then((response)=>{
            let allUsers = response.data;
            console.log(allUsers);
            setAllUsers(allUsers);

        });
    }, []);

    const onDeleteUser= (deleteId) => {
        console.log('manager onDeleteUser ', deleteId);
        let updated = allUsers.filter((user) => {
            return user.id !== deleteId;
        })
        setAllUsers(updated);
    }
   
    return (
        <div className="manager-grid">
            {allUsers.map((user) => {
                return <UserCard key={user.id} user={user} onDeleteUser={onDeleteUser} />
            })}
        </div>
    );
}