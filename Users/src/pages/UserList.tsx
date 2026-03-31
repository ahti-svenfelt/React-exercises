import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import type { User } from '../types';

export function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => setUsers(data))
    }, []);
}

