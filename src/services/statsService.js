import {getToken} from './authService'


export const getStatistics = async ({userId}) => {
    const token = getToken();
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
    return await rawResponse.json();
};

export const addEmptyStatistics = ({userId}) => {
    const token = getToken();
    return fetch (`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
        {
            method: 'PUT',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                optional: {}
            })
        },
    );
}
export const putStatistics = ({userId, optional}) => {
    const token = getToken();
    return fetch (`https://afternoon-falls-25894.herokuapp.com/users/${userId}/statistics`,
        {
            method: 'PUT',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                optional,
            })
        },
    );
}
