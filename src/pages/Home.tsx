import { useHistory } from 'react-router';
import IllutrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImag from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';

export function Home(){

    const history = useHistory()
    const { user, signInWithGoogle} = useAuth();

    async function handleCreateRoom() {
        if(!user){
            await signInWithGoogle()
        }
        
        history.push('/rooms/new');      
    }

/*     function navigateNewRoom() {
        
    } */
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImag} alt="logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>

                    <form >
                        <input 
                        type="text" 
                        placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>

                    
                </div>
            </main>
        </div>
    )
}