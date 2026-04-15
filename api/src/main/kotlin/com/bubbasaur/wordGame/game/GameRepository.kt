package com.bubbasaur.wordGame.game

import org.springframework.stereotype.Repository

@Repository
class GameRepository {
    private val games = mutableMapOf<String, Game>()

    fun save(game: Game): Game {
        games[game.id] = game
        return game
    }
}