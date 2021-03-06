import Head from 'next/head'
import styles from '../styles/Selection.module.css'
import { exercises } from '../excercises.json'
import {ExtendedExerciseCard} from '../components/ExerciseCard'
import { usePersistedState } from '../hooks/usePersistedState'
import Link from 'next/link'

export default function Home() {
  const [selectedExercises] = usePersistedState("selectedExercises", [])
  // const [store, setStore] = usePersistedState("selectedExercises", [])

  const selection = exercises.filter(x => selectedExercises.includes(x.id));

  console.log(selection)

  const handleAddOrRemoveExercise = (id) => {
    const updatedSelection = selectedExercises.includes(id) ? selectedExercises.filter(x => x !== id) : [...selectedExercises, id];
    console.log(id, updatedSelection);
    setSelectedExercises(updatedSelection);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Okidoki träningsapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Min workout
        </h1>

        <ul className={styles.list}>
          {selection.map(item => <ExtendedExerciseCard key={item.id} {...item} />)}
        </ul>
      </main>
    </div>
  )
}

