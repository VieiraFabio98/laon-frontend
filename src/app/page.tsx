'use client'

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      if(response.status === 200) {
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
      }

    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.login}>
        <form onSubmit={login}>
          <div className={styles.title}>
            <h2>Entrar</h2>
            <p>Bem vindo(a) de volta!</p>
          </div>
          <div className={styles.inputs}>
            <input 
              className={styles.input} 
              type="email" 
              placeholder="Email" 
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              className={styles.input} 
              type="password" 
              placeholder="Senha" 
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.button}>Entrar</button>
        </form>
      </main>
    </div>
  )
}
