import { validateRut } from 'rutlib';
export function validateCredentials({
    email,
    password,
    rut,
    name,
    lastName,
    confirmPassword
}:
    {
        email?: string,
        password?: string,
        rut?: string,
        name?: string,
        lastName?: string,
        confirmPassword?: string
    }): void {
    if (password !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
    }
    if (!name || !rut || !email || !password) {
        throw new Error("Por favor completa todos los campos");
    }
    // RUT validation
    if (!validateRut(rut)) {
        throw new Error("RUT inválido");
    }

    // Validaciones típicas de contraseña
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const noSpaces = !/\s/.test(password);

    if (password.length < minLength) {
        throw new Error(`La contraseña debe tener al menos ${minLength} caracteres`);
    }
    if (!hasUpper || !hasLower || !hasNumber) {
        throw new Error("La contraseña debe incluir mayúsculas, minúsculas y números");
    }
    if (!noSpaces) {
        throw new Error("La contraseña no puede contener espacios");
    }
    // Email validations
    const emailTrim = email.trim();
    const atCount = (emailTrim.match(/@/g) || []).length;
    const [localPart, domainPart] = emailTrim.split('@');
    if (/\s/.test(emailTrim) || atCount !== 1 || !localPart || !domainPart || localPart.startsWith('.') || localPart.endsWith('.') || /\.\./.test(localPart)) {
        throw new Error("Correo electrónico inválido");
    }
}                                                                                                                  