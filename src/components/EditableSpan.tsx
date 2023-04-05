import {ChangeEvent, FC, useState} from 'react'

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
}
export const EditableSpan: FC<EditableSpanType> = ({title, onChange}) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        setEditMode(false)
        onChange(inputValue)
    }
    const onDoubleClickHandler = () => {
        setEditMode(true)
        setInputValue(title)
    }


    return (
        editMode ? <input value={inputValue} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
    )
}