import React from 'react';
import leadStyle from '../css/leadStyle.module.css';
import Autocomplete from './Autocomplete';

export default function Input(props) {
    const {
        id,
        label,
        error,
        endAdornment,
        AutoComplete,
        ...rest
    } = props;
    if(AutoComplete){
        return (
            <div>
                <label htmlFor={id} className={[leadStyle.inputLabel]}>{label}</label>
                <div className='relative'>
                    <Autocomplete
                        id={id}
                        AutoComplete={AutoComplete}
                        endAdornment={endAdornment}
                        {...rest}
                    />
                </div>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>
        );
    }else{
        return (
            <div>
                <label htmlFor={id} className={[leadStyle.inputLabel]}>{label}</label>
                <div className='relative'>
                    <input 
                        {...rest}
                    />
                    {endAdornment && 
                        <div className='absolute right-0 top-[50%] translate-y-[-50%] text-[#212529] max-w-full max-h-full p-2'>
                            {endAdornment}
                        </div>
                    }
                </div>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>
        );
    }
    
}
