export const loginRules = {
  email: [
    {
      required: true,
      message: "Este campo es requerido",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Ingresa un correo valido",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Este campo es requerido",
      trigger: "blur",
    },
    {
      min: 2,
      message: "La contraseña debe tener minimo 2 caracteres",
      trigger: "blur",
    },
  ],
};

export const registerRules = {
  name: [
    {
      required: true,
      message: "Este campo es requerido",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: "Este campo es requerido",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Ingresa un correo valido",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "Este campo es requerido",
      trigger: "blur",
    },
    {
      min: 5,
      message: "La contraseña debe tener minimo 5 caracteres",
      trigger: "blur",
    },
  ],
};

export const requestRecoverRules = {
  email: [
    {
      required: true,
      message: "Este campo es requerido",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Ingresa un correo valido",
      trigger: "blur",
    },
  ],
};
