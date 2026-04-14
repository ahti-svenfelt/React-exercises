export async function loginAdmin(username: string, password: string) {
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ username, password})
    });

    if(!response.ok) throw new Error('Login failed');

    return response.json();
}

export async function addProduct(title: string, price: number, token: string) {
    const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json', 'Authorization' : `Bearer ${token}` },
        body: JSON.stringify({ title, price })
    });

    if(!response.ok) throw new Error('Failed to add product');

    return response.json();
}