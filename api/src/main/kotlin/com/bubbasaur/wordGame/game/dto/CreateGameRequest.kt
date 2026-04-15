package com.bubbasaur.wordGame.game.dto

data class CreateGameRequest(
    val wordLength: Int?,
    val difficulty: Int?,
    val numberOfTries: Int?
)