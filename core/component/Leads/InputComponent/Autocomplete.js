import React, { useEffect, useRef, useState } from 'react'
import leadStyle from '../css/leadStyle.module.css'

export default function Autocomplete(props) {
  const {
    options,
    onInputChange,
    onSelectChange,
    getOptionLabel,
    AutoComplete,
    dropdownIcon,
    endAdornment,
    value,
    ...rest
  } = props

  const [filteredOptions, setFilteredOptions] = useState([])
  const [activeOption, setActiveOption] = useState(0)
  const [showOptions, setShowOptions] = useState(false)
  const [input, setInput] = useState(value)
  const [selectedInput, setSelectedInput] = useState('')

  useEffect(() => {
    // if(props.value)
    //     setInput(props.value);
    setFilteredOptions(props.options)
  }, [props])


  function useOutsideAlerter(ref) {
    useEffect(() => {

      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowOptions(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);


  

  const OptionListComponent = (props) => {
    return (
      <>
        {showOptions ? (
          <>
            {filteredOptions?.length ? (
              <ul className='suggestions pin-suggestion top-[100%]' ref={wrapperRef}>
                {filteredOptions.map((suggestion, index) => {
                  let className
                  // Flag the active suggestion with a class
                  if (index === activeOption) {
                    className = 'suggestion-active'
                  }
                  return (
                    <li
                      className={className}
                      key={index}
                      value={suggestion.value ? suggestion.value : suggestion}
                      onClick={(event) => {
                        setSelectedInput(getOptionLabel ? getOptionLabel(suggestion) : suggestion.label)
                        setInput(getOptionLabel ? getOptionLabel(suggestion) : suggestion.label)
                        setShowOptions(false)
                        setActiveOption(0)
                        setFilteredOptions([])
                        if (onSelectChange) {
                          onSelectChange(suggestion)
                        }
                      }}>
                      {getOptionLabel ? getOptionLabel(suggestion) : suggestion.label}
                    </li>
                  )
                })}
              </ul>
            ) : (
              <>
                {AutoComplete != 'freeSolo' && (
                  <div className='suggestions pin-suggestion top-[100%] no-suggestions' ref={wrapperRef}>
                    <em>No suggestions available.</em>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          ''
        )}
      </>
    )
  }

  return (
    <div className='flex relative'>
      <input
        {...rest}
        value={input}
        autoComplete='off'
        onChange={async (event) => {
          setInput(event.target.value)
          if (AutoComplete == 'freeSolo') {
            setFilteredOptions(options)
          } else {
            var filteredOptions = await options?.filter(
              (option) => option?.value?.toString().toLowerCase().indexOf(input.toString().toLowerCase()) > -1
            )
            setFilteredOptions(filteredOptions)
          }
          setShowOptions(true)
          if (onInputChange) {
            onInputChange(event)
          }
        }}
        onFocus={(event) => {
          if (AutoComplete == 'freeSolo') {
            setFilteredOptions(options)
            setShowOptions(true)
          }
        }}
        // onBlur={(event) => {
        //     // setShowOptions(false);
        //     if(AutoComplete != 'freeSolo'){
        //         setInput(value ? value : '');
        //     }
        // }}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            setShowOptions(false)
            setActiveOption(0)
            setInput(
              getOptionLabel ? getOptionLabel(filteredOptions[activeOption]) : filteredOptions[activeOption].label
            )
          } else if (event.keyCode === 38) {
            if (activeOption === 0) {
              return
            }
            setActiveOption(activeOption - 1)
          }
          // User pressed the down arrow, increment the index
          else if (event.keyCode === 40) {
            if (activeOption - 1 === filteredOptions.length) {
              return
            }
            setActiveOption(activeOption + 1)
          }
        }}
        className={[leadStyle.input]}
      />
      {(endAdornment || dropdownIcon) && (
        <div className='absolute right-0 top-[50%] translate-y-[-50%] max-w-full max-h-full p-1 bg-white mr-[2px] flex'>
          {endAdornment && <>{endAdornment}</>}
          {dropdownIcon && (
            <button
              className={[
                'cursor-default cursor-pointer text-gray-400 focus:active:visited:border-none focus-visible:border-none',
                showOptions ? 'rotate-180' : ''
              ].join(' ')}
              onClick={() => {
                setShowOptions(!showOptions)
              }}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-4 h-4'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            </button>
          )}
        </div>
      )}

      <OptionListComponent />
    </div>
  )
}



