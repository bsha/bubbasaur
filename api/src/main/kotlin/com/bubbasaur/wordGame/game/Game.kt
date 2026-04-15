package com.bubbasaur.wordGame.game

import java.util.UUID

data class Game(
    val id: String = UUID.randomUUID().toString(),
    val answer: String,
    val difficulty: Int,
    val guesses: MutableSet<Char> = mutableSetOf(),
    var attemptsLeft: Int = 6,
    var status: GameStatus = GameStatus.PLAYING
)

enum class GameStatus {
    PLAYING,
    WON,
    LOST
}