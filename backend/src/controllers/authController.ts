interface AuthControllerProps {
  name: string
}

export class authController {
  constructor(name, email, password, role, token){
    this.name = name,
    this.email = email,
    this.password = password, 
    this.role = role, 
    this.token = token
  }
}