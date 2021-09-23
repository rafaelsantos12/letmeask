import { FormEvent, useState } from 'react';
import { useParams } from 'react-router';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

type RoomParams ={
    id: string;
}

export  function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const [newQuestion, setNewQuestion] = useState('');

    async function handleSendQuestion( event: FormEvent){

        event.preventDefault();

        if(newQuestion.trim() === ''){
            return;
        }

        if(!user){
            throw new Error('You must be logeed in')
        }

        const questions = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighLigted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(questions);
        setNewQuestion('');
    }
    
    return(
        <div id="page-room">
            <header>
                <div className="content">
                  <img src={logoImg} alt="letmeask" />
            
                        <RoomCode code={roomId}/>
           
                </div>
            </header>

            <main >
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="Deixe aqui a sua pergunta"
                        onChange={ event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        
                        { user ? (
                            
                            <div className="user-info">
                                <img src={user.avatar}/>
                                <span>{user.name}</span>
                            </div>
                            
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>

                </form>
            </main>
        </div>
    );
}

