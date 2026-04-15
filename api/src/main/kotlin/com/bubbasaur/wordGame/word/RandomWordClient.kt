package com.bubbasaur.wordGame.word

import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.client.WebClient

@Component
class RandomWordClient {

    private val webClient = WebClient.create("https://random-word-api.herokuapp.com")

    fun fetchRandomWord(wordLength: Int = 5, difficulty: Int = 3): String {
        val response = webClient
            .get()
            .uri("/word?length=${wordLength}&diff=${difficulty}")
            .retrieve()
            .bodyToMono(Array<String>::class.java)
            .block()

        return response?.firstOrNull()
            ?: throw RuntimeException("No word returned from API")
    }
}