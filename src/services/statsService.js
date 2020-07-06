import {getToken} from './authService'

const token = getToken();

export const getStatistics = async ({userId}) => {
    const rawResponse = await fetch(
        `https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
        {
            method: 'GET',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        },
    );
    const content = await rawResponse.json();
    console.log(content);
    return content;
};