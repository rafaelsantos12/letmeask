import { Link } from 'react-router-dom';

import { Button } from '../components/Button';
import IllutrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';


import '../styles/auth.scss';

export function NewRoom(){

    return(
        <div id="page-auth">
        <aside>
            <img src={IllutrationImg} alt="Ilustração simbolizando perguntas e resposnta"/>
            <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire dúvidas da sua audiência em tempo real</p>
        </aside>

        <main>
            <div className="main-content">
                <img src={logoImg} alt="letmeask" />
                    <h2>Criar uma nova sala</h2>
                <form >
                    <input 
                    type="text" 
                    placeholder="Digite o código da sala"
                    />
                    <Button type="submit">
                        Criar sala
                    </Button>
                </form>
                <p>
                    Quer entrar em uma sala existente?
                    <Link to="/">Clique aqui</Link>
                </p>
                
            </div>
        </main>
    </div>
    )
}