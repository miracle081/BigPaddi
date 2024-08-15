export function generateToken(length) {
    let token = '';
    for (let i = 0; i < length; i++) {
        token += Math.floor(Math.random() * 10);
    }
    return token;
}