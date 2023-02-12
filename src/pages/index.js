import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import '../styles/custom.scss'
import { Form, Button, Card, Container } from "react-bootstrap";

const inter = Inter({ subsets: ['latin'] })

function LoadingButton(type, name, route) {
  const [isLoading, setLoading] = useState({ name: false });

  useEffect(() => {
    if (isLoading.name) {
      simulateNetworkRequest().then(() => {
        setLoading({ name: false });
      });
    }
  }, [isLoading.name]);

  const handleClick = () => setLoading({ name: true });

  return (
    <a
      class={"btn btn-" + type}
      variant={type}
      href={"/" + route}
      disabled={isLoading.name}
      onClick={!isLoading.name ? handleClick : null}
    >
      {isLoading.name ? "Loading…" : name}
    </a>
  );
}


export default function Home() {
  
  return (
    <>
      <Head>
        <title>vHealth</title>
        <meta
          name="description"
          content="Your one stop shop for getting better"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link width={100} height={100} rel="icon" href="/vHealth-1-logo.png" />
      </Head>

      
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="align-items-center justify-content-center">
            <Card.Body>
              {/* <h2 className="text-center mb-4">Main Menu</h2> */}
              <Image
                src="/vHealth-1.png"
                alt="vHealth Logo"
                className={styles.vercelLogo}
                width={200}
                height={200}
                priority
              />

              <div class="d-grid gap-3">
                {LoadingButton("primary", "I'm a patient", "/auth/login")}

                {LoadingButton("secondary", "Doctor login", "logs")}

              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
