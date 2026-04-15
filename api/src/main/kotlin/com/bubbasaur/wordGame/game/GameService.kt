package com.bubbasaur.wordGame.game

import com.bubbasaur.wordGame.word.WordService
import org.springframework.stereotype.Service

@Service
class GameService(
    private val gameRepository: GameRepository,
    private val wordService: WordService
) {
    fun createGame(wordLength: Int = 5, difficulty: Int = 3, numberOfTries: Int = 6): Game {
        val word = wordService.getRandomWord(wordLength, difficulty)
        val game = Game(answer = word, difficulty = difficulty, attemptsLeft = numberOfTries)
        return gameRepository.save(game)
    }
}