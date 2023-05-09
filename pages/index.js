import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { exercises } from '../excercises.json'
import ExerciseCard from '../components/ExerciseCard'
import { usePersistedState } from '../hooks/usePersistedState'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Home() {
  const [selectedExercises, setSelectedExercises] = usePersistedState("selectedExercises", [])
  // const [store, setStore] = usePersistedState("selectedExercises", [])

  useEffect(() => {
    console.log('updating')
  })
  const handleAddOrRemoveExercise = (id) => {
    const updatedSelection = selectedExercises.includes(id) ? selectedExercises.filter(x => x !== id) : [...selectedExercises, id];
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
          Välj övningar
        </h1>

        {/* <button onClick={() => setSelectedExercises([])}>Rensa</button> */}

        <Link className={`${styles.button} bg-green`} href="/selection">
          Klart!
        </Link>

        <ul className={styles.list}>
          {exercises.map(item => <ExerciseCard key={item.id} {...item} addOrRemoveExercise={handleAddOrRemoveExercise} />)}
        </ul>

      </main>
    </div>
  )
}

