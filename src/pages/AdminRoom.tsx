
import { useParams } from 'react-router';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import { Question} from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg';
import { database } from '../services/firebase';


type RoomParams ={
    id: string;
}

export  function AdminRoom() {
    /* const { user } = useAuth(); */
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {title, questions} = useRoom(roomId)


    async function handleDeleteQuestion(questionId:string) {
        if(window.confirm('Você deseja excluir essa pergunta')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                  <img src={logoImg} alt="letmeask" />
            
                  <div>
                    <RoomCode code={roomId}/>
                    <Button isOutlined>Encerrar Sala</Button>
                  </div>
                </div>
            </header>

            <main >
                <div className="room-title">
                    <h1>Sala {title} Admin</h1>
                    {questions.length > 0 && <span> {questions.length } pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map( question => {
                        return(
                            <Question
                            key={question.id} 
                            content={question.content}
                            author={question.author}
                            >
                                <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                                >
                                 <img src={deleteImg} alt="Remover pergunta"/>   
                                </button>
                            </Question>
                        );
                    })}   
                </div>

            </main>
        </div>
    );
}

