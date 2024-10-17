export function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    console.log(hasDigit,"  ",password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return {
            success: false,
            message: `Password must be at least ${minLength} characters long.`
        };
    }
    if (!hasUpperCase) {
        return {
            success: false,
            message: "Password must contain at least one uppercase letter."
        };
    }
    if (!hasLowerCase) {
        return {
            success: false,
            message: "Password must contain at least one lowercase letter."
        };
    }
    if (!hasDigit) {
        return {
            success: false,
            message: "Password must contain at least one digit."
        };
    }
    if (!hasSpecialChar) {
        return {
            success: false,
            message: "Password must contain at least one special character."
        };
    }

    return {
        success: true,
        message: "Password is valid."
    };
}

