
import { useHistory, useParams } from 'react-router';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss';
import { Question} from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import { database } from '../services/firebase';


type RoomParams ={
    id: string;
}

export  function AdminRoom() {
    /* const { user } = useAuth(); */
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {title, questions} = useRoom(roomId)
    const history= useHistory()

    async function handleCloseRoom(roomId: string) {
        if(window.confirm('Você deseja encerrar essa sala')){
            await database.ref(`rooms/${roomId}`).update({
                closeAt: new Date()
            })

            history.push('/');
        }
    }

    async function handleDeleteQuestion(questionId:string) {
        if(window.confirm('Você deseja excluir essa pergunta')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleCheckQuestionAsAnswered(questionId:string) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                isAnswered: true
            })
    }

    async function handleHighLightQuestion(questionId:string) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                isHighLigted: true
            })
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                  <img src={logoImg} alt="letmeask" />
            
                  <div>
                    <RoomCode code={roomId}/>
                    <Button isOutlined onClick={()=> handleCloseRoom(roomId)}>Encerrar Sala</Button>
                  </div>
                </div>
            </header>

            <main >
            <h5>Admin</h5><br/>
                <div className="room-title">
                    <h1>Sala {title} </h1>
                    {questions.length > 0 && <span> {questions.length } pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map( question => {
                        return(
                            <Question
                            key={question.id} 
                            content={question.content}
                            author={question.author}
                            isAnswered={question.isAnswered}
                            isHighLigted={question.isHighLigted}
                            >
                           {!question.isAnswered && (
                            <>
                            <button
                                type="button"
                                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                            >
                                <img src={checkImg} alt="Marcar pergunta respondida"/>   
                            </button>

                            <button
                                type="button"
                                onClick={() => handleHighLightQuestion(question.id)}
                            >
                                 <img src={answerImg} alt="Destacar pergunta"/>   
                            </button>
                            </>
                           )}
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

