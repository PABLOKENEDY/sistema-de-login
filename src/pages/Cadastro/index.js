import React, {useState} from 'react'
import { Container, Form, SubContainerSign } from './styles'
import Input from '../../Componentes/input/index'
import Botao from '../../Componentes/botao/index'
import { validarEmail, validarSenha, validarTelefone, validarNome, validarConfirmarSenha } from '../../utilis/validadores'
import UserService from '../../Services/UserService'
import { NavLink, useNavigate } from 'react-router-dom'
import Logo from '../Login/img/logo.png'
const userService = new UserService()

const Cadastro = () => {
  const [loading, setLoading] = useState()
  const [form, setForm] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true)
      const { data } = await userService.cadastrar({
        nome: form.nome,
        telefone: form.telefone,
        email: form.email,
        password: form.password,
      })
      if (data) {
        const responseLogin = await userService.login({
          email: form.email,
          password: form.password
        })
        if (responseLogin === true) {
          alert('usuário Cadastrado com Sucesso')
          navigate('/home')
        }
    }
      setLoading(false)
    }
    catch (err) {
      alert('Algo deu errado com o Cadastro' + err)
    }
  }

  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const validadorInput = () => {
    return validarEmail(form.email) 
    && validarSenha(form.password)
    && validarTelefone(form.telefone)
    && validarConfirmarSenha(form.password, form.confirmarPassword)
    && validarNome(form.nome)
  }

  return (
    <Container>
      <Form>
      <img  style={{ width: 50, height: 50 }} src={Logo} className="logo react" alt="React logo" />
        <h1>Faça o seu Cadastro 👋</h1>
        <Input
          name='nome'
          placeholder='Digite o seu nome'
          onChange={handleChange}
          type='text'
        />
        <Input
          name='telefone'
          placeholder='Digite o seu telefone'
          onChange={handleChange}
          type='number'
        />
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
        <Input
          name='confirmarPassword'
          placeholder='Confirme a sua senha'
          onChange={handleChange}
          type='password'
        />
        <Botao
          type='submit'
          text='Cadastrar 👍!'
          onClick={handleSubmit}
          disabled={loading === true || !validadorInput()}
        />
        <SubContainerSign>
          <p>Já possui conta?</p>
          <NavLink to="*">Login</NavLink>
        </SubContainerSign>
      </Form>
    </Container>
    
  )
}

export default Cadastro;