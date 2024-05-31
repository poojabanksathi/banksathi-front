import React from 'react';
import leadStyle from './css/leadStyle.module.css';

export default function LeadStepperButton(props) {
    return (
        <> 
        {props.type == "next" &&
            <button 
            type="submit"
            onClick={props.onClick}
            disabled={props.disabled}
            className={props.disabled ? leadStyle.stepperDisabledNextBtn : leadStyle.stepperNextBtn}>
                {props.label} 
                <svg fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-5 h-5 ml-4"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3">
                    </path>
                </svg> 
            </button>
        }
        {props.type == "prev" &&
            <button
            onClick={props.onClick}
            className={leadStyle.stepperPrevBtn}
            >
                <svg fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                className="w-5 h-5" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg" 
                aria-hidden="true" 
                style={{transform: 'rotate(180deg)'}}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                </svg> 
            </button>
        }
        </>
    );
}
