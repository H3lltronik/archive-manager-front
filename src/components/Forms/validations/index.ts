export const loginRules = {
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
