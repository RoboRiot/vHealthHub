import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Card, Container, Alert } from 'react-bootstrap'

import { useAuth } from '../context/AuthUserContext';

export default class login extends Component {
  render() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter();
  const { signInWithEmailAndPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      .then(authUser => {
        router.push("/dashboard");
      })
      .catch(error => {
        setError(error.message)
      });
      
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }
  
    return (
        <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
               
                <Button className="w-100 mt-3" type="submit">Login</Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Don't have an account? <Button variant="link" href="/SignUpTest">Sign Up</Button>
          </div>
        </div>
      </Container>
    )
  }
}
