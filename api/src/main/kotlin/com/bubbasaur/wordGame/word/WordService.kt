package com.bubbasaur.wordGame.word

import org.springframework.stereotype.Service

@Service
class WordService(
    private val randomWordClient: RandomWordClient
) {
    fun getRandomWord(wordLength: Int = 5, difficulty: Int = 3): String {
        val word = randomWordClient.fetchRandomWord(wordLength, difficulty)

        return word.lowercase()
    }
}