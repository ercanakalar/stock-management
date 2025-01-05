import React from 'react';
import './CardBase.scss';

export const CardBase = (props: {
    id?: string;
    position?: string;
    className?: string;
    width?: string;
    justify?: string;
    title?: string;
    children: React.ReactNode;
}) => {
    return (
        <div id={props.id} className={`card-base ${props.position ?? ''}`}>
            <p className={`card-title ${props.title ? '' : 'hidden'}`}>{props.title}</p>
            <div
                className={`card-content ${props.justify ?? 'justify-between'} ${props.width ?? ''} ${props.className ?? ''}`}
            >
                {props.children}
            </div>
        </div>
    );
};
