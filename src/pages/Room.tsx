import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';

export  function Room() {
    return(
        <div id="page-room">
            <head>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        código
                    </div>
                </div>
            </head>

            <main className="content">
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form >
                    <textarea 
                        placeholder="Deixe aqui a sua pergunta"
                    />

                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>

                </form>
            </main>
        </div>
    );
}

