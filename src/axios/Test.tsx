

import React, { useState } from 'react';
import { User } from './models/user.model';
import { UserService } from './service/user.service.ts';

export default function AxiosTest() {
    const [data, setData] = useState("");

    const handleClick = async () => {
        try {
            const user: {email:string, password: string} = 
            {
                email: 'john.doe@example.com',
                password: '#Test123'
            }

            const response = await UserService.loginUser(user.email, user.password)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <button onClick={handleClick}>Fetch Data</button>
            {data}
        </div>
    );
}