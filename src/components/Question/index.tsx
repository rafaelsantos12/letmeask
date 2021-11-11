import React from 'react';
import './styles.scss';
import {ReactNode}  from 'react';
import cx from 'classnames';

type QuestionProps ={
    content: string;
    author:{
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?:boolean;
    isHighLigted?: boolean;
}


export function Question( { 
        content,
        author,
        children ,
        isAnswered = false,
        isHighLigted= false,

    } : QuestionProps){
    return(
        //className={`question ${isAnswered ? 'answered' : ''} ${isHighlighted ? 'highlighted' : ''}`}
        <div
            className={cx(
                'question',
                {aswered: isAnswered},
                {highlighted: isHighLigted && !isAnswered}
            )}
        >
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    );
}