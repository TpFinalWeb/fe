

import React, { useState } from 'react';
import { User } from './models/user.model';
import { UserService } from './service/user.service.ts';

export default function AxiosTest() {
    const [data, setData] = useState(null);

    const handleClick = async () => {
        try {
            const user: User = 
            {
                role: 'beta tester',
                email: 'john.doe@example.com',
                username: 'john.doe',
                password: '#Test123'
            }

            const response = await UserService.registerUser(user);
            // const response = await getTestings();
            // setData(response);
            // console.log(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <button onClick={handleClick}>Fetch Data</button>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}