import styles from './ExerciseCard.module.css'
import { useState, useEffect } from 'react';
import { usePersistedState } from '../../hooks/usePersistedState'

const ExerciseCard = ({title, id, addOrRemoveExercise}) => {
  const [active, setActive] = useState(false)
  const [selectedExercises] = usePersistedState("selectedExercises", [])

  useEffect(() => {
    console.log('effect called');
    setActive(selectedExercises.includes(id))
  }, [])

  const handleClick = () => {
    setActive(!active)
    addOrRemoveExercise(id)
  }

  return (
    <li className={styles.item} key={id}>
      <button onClick={handleClick} className={`${styles.button} ${active ? 'bg-pink': 'bg-purple'}`}>{title}</button>
    </li>
  )
}

const ExtendedExerciseCard = ({title, id }) => {
  const handleClick = () => {
    console.log('expand card!')
  }
  return (
    <li className={styles.item} key={id}>
      <button onClick={handleClick} className={`${styles.button} bg-pink`}>{title}</button>
    </li>
  )
}

export default ExerciseCard
export { ExtendedExerciseCard }
