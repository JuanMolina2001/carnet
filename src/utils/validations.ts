import { validateRut } from 'rutlib';
export function validateCredentials({
    email,
    password,
    rut,
    name,
    lastName,
    confirmPassword
}: UserData, step: number): void {

    if (step === 2) {
        if (!email || !password || !confirmPassword) {
            throw new Error("Todos los campos son obligatorios");
        }
        if (password !== confirmPassword) {
            throw new Error("Las contraseñas no coinciden");
        }
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


        const emailTrim = email.trim();
        const atCount = (emailTrim.match(/@/g) || []).length;
        const [localPart, domainPart] = emailTrim.split('@');
        if (/\s/.test(emailTrim) || atCount !== 1 || !localPart || !domainPart || localPart.startsWith('.') || localPart.endsWith('.') || /\.\./.test(localPart)) {
            throw new Error("Correo electrónico inválido");
        }
    } else {
        if ((name !== undefined && (!name || name.trim().length === 0))) {

            throw new Error("El nombre es obligatorio");
        }
        if ((lastName !== undefined && (!lastName || lastName.trim().length === 0))) {
            throw new Error("El apellido es obligatorio");
        }
        if (!rut || !validateRut(rut)) {
            throw new Error("RUT inválido");
        }

    }

}                  
