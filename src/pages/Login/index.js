import React, {useState} from 'react'
import { Container, Form, SubContainerSign } from './styles'
import Input from '../../Componentes/input/index'
import Botao from '../../Componentes/botao/index'
import { validarEmail, validarSenha } from '../../utilis/validadores'
import UserService from '../../Services/UserService'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from './img/logo.png'
const userService = new UserService()

const Login = () => {
  const [loading, setLoading] = useState()
  const [form, setForm] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      const response = await userService.login(form)
      console.log('response do Login', response)
      if (response === true) {
        alert('usuário Logado com Sucesso')
        navigate('/home')
      }
      setLoading(false)
    }
    catch (err) {
      alert('Algo deu errado com o Login' + err)
    }
  }

  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const validadorInput = () => {
    return validarEmail(form.email) && validarSenha(form.password)
  }


  return (
    <Container>
      <Form>
      <img  style={{ width: 100, height: 100 }} src={Logo} className="logo react" alt="React logo" />
        <h1>Painel de Acesso 👋</h1>
        <Input
          name='email'
          placeholder='Digite o seu e-mail'
          onChange={handleChange}
          type='email'
        />
        <Input
          name='password'
          placeholder='Digite a sua senha'
          onChange={handleChange}
          type='password'
        />
        <Botao
          type='submit'
          text='Acessar!'
          onClick={handleSubmit}
          disabled={loading === true || !validadorInput()}
        />
        <SubContainerSign>
          <p>Não possui conta?</p>
          <NavLink to="cadastrar">Cadastrar</NavLink>
        </SubContainerSign>
      </Form>
    </Container>
    
  )
}

export default Login;