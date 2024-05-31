import { useEffect, useRef, useState } from 'react'

const SearchableDropdown = ({ options, label, id, selectedVal, handleChange, placeholder }) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    typeof window !== 'undefined' && document.addEventListener('click', toggle)
    return () => document.removeEventListener('click', toggle)
  }, [])

  const selectOption = (option) => {
    setQuery(() => '')
    handleChange(option)
    setIsOpen((isOpen) => !isOpen)
  }

  const toggle = (e) => {
    setIsOpen(e && e.target === inputRef?.current)
  }

  const getDisplayValue = () => {
    if (query) return query
    if (selectedVal) return selectedVal

    return ''
  }

  const filter = (options) => {
    return options?.filter((option) => option[label]?.toLowerCase()?.indexOf(query?.toLowerCase()) > -1)
  }

  return (
    <div className='dropdown'>
      <div className='control'>
        <div className='selected-value text-neutral-800 text-[12px] font-semibold font-["Poppins"] flex items-center justify-center'>
          <input
            ref={inputRef}
            type='text'
            value={getDisplayValue()}
            name='searchTerm'
            onChange={(e) => {
              setQuery(e?.target?.value)
              handleChange(null)
            }}
            onClick={toggle}
            placeholder={placeholder}
            className='w-[100%] max-[576px]:w-[90%]'
          />
        </div>
      </div>
      <div
        className={`options ${
          isOpen
            ? 'open shadow border border-[#C2CACF]  focus:outline-none focus:shadow-outline w-[100%] max-[576px]:w-[92%] max-sm:left-[4%]'
            : ''
        }`}>
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={`option text-neutral-800 text-[12px] font-medium font-['Poppins'] ${
                option[label] === selectedVal ? 'selected' : ''
              }`}
              key={`${id}-${index}`}>
              {option[label]}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SearchableDropdown
