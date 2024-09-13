// auth-service.js
export const login = async (user) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();
    return data;
};


export const register = async (user) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    return data;
};

export const logout = async (id) => {
    const response = await fetch(`http://localhost:5000/api/auth/logout/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json charset=UTF-8'
        }
    });
    const data = await response.json();
    return data;
};