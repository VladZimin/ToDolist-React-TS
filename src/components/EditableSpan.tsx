import {ChangeEvent, FC, useState} from 'react'
import {TextField} from '@mui/material'

type EditableSpanType = {
    title: string
    onChange: (newTitle: string) => void
    style?: string

}
export const EditableSpan: FC<EditableSpanType> = ({title, onChange, style}) => {

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
        editMode ?
            <TextField value={inputValue} onChange={onChangeHandler} onBlur={onBlurHandler} size={'small'} autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler} className={style}>{title}</span>
    )
}