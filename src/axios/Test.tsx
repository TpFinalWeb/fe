
import React from 'react';
import { User } from './models/user.model';
import { UserService } from './service/user.service.ts';
import UserProxy from './proxy/userProxy.ts';
import AggregationProxy from './proxy/aggregationProxy.ts';
import { AggregationService } from './service/aggregation.service.ts';
import LineChart from '../components/Testing(free place to test)/TestChart.tsx';

export default function AxiosTest() {

    const handleClick = async () => {
        try {
            const user: {email:string, password: string} = 
            {
                email: 'betatester@gmail.com',
                password: '#Test123'
            }

            const userToRegister: User = {
                role: "user",
                email: "betatester2@gmail.com",
                username: "betatester2",
                password: "#Test123"
            }  

            //await UserService.loginUser(user.email, user.password);
            //await UserProxy.testies();
            //const createUser = await UserService.registerUser(userToRegister);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        
        <div>
            <LineChart/>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
                <button onClick={handleClick}>Fetch Data</button>
            </div>
        </div>
    );
}