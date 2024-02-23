//import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg' 'nodemailer/lib/mailer';}
import './App.css'
import { Footer, Header, Image, Main, Paragraph, SubTittle, Title } from './components';

const App = ()=> {
  const nombre = "Haciendo el teste con props";
  const subTitle1 = "Haciendo el segundo teste con props";
  const subTitle2 = "Soy mas uno Teste Mona";
  const paragraphH2 = "Soy un parafo h2";
  const paragraphH3 = "Soy un footer"

  return (
    <>
    <Header>
    <Title nombre={nombre}/>
    </Header>
    <Main>
    <SubTittle subtittle= {subTitle1}/>
    <SubTittle subtittle= {subTitle2}/>{/* el nombre subtittle es que hemos definido en props en componentes y subTitle2 es la variable creada en app*/}
    <Image/>
    <Paragraph h2Texto= {paragraphH2}/>
    </Main>
    <Footer>
    <Paragraph h2Texto={paragraphH3}/>
    </Footer>
    </>
  )
}

export default App