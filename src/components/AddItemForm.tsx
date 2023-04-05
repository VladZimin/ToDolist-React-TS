import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react'

type AddItemFormType = {
    addItem: (title: string) => void
}
export const AddItemForm: FC<AddItemFormType> = ({addItem}) => {
    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setInputValue(e.currentTarget.value)
    }
    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.ctrlKey && e.key === 'Enter' && addItemHandler()
    }
    const addItemHandler = () => {
        const trimmedValue = inputValue.trim()
        if (trimmedValue) addItem(trimmedValue)
    else
        setError('Title is required!')
        setInputValue('')

    }

    return (
        <div>
            <input onChange={changeInputHandler}
                   onKeyDown={keyDownHandler}
                   value={inputValue}
                   className={error ? 'error' : ''}
            />
            <button onClick={addItemHandler}>+</button>
            <div className={'error-message'}>{error}</div>
        </div>
    )
}