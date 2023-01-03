import React from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    //tracking changes in dice
    React.useEffect(
        () => {
            const allHeld = dice.every(die => die.isHeld)
            const firstValue = dice[0].value
            const allSameValue = dice.every((die) => die.value === firstValue)
            if (allHeld && allSameValue) {
                setTenzies(true)
                console.log('You won!')
            }
        }, [dice])

    //generate new dice (10 numbers between 1 and 6)
    function allNewDice() {
        const newDice = []
        for (let i=0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }


    //iterate over dice held in state
    const diceElements = dice.map(die => 
        <Die 
            holdDie={() => holdDie(die.id)} 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld}
        />)

    //handle clicking the roll button
    function rollDice() {
        if (!tenzies) {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? die : generateNewDie()
        }))}
        else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    //map through the dice and flip the isHeld property of clicked die (matching id)
    function holdDie(id) {
        setDice(oldDice => oldDice.map(
            die => die.id === id ? {...die, isHeld: !die.isHeld} : 
            die
        ))
    }

    return (
     <main>
        {tenzies && <Confetti/>}
        <div className='dice-container'>
            {diceElements}
        </div>
        <button className='roll-dice' onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
     </main>
    )
}